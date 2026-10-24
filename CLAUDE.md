# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

pnpm workspace managed by Turborepo. Use pnpm (version pinned via `devEngines`).

- `pnpm dev` — runs `turbo dev` (web app dev server on port 3000)
- `pnpm build` / `pnpm lint` — run across all packages via turbo
- `pnpm --filter web test` — run vitest once
- `pnpm --filter web exec vitest run src/test/basic.test.ts` — single test file
- `pnpm --filter web exec vitest run -t "test name"` — single test by name
- `pnpm --filter web lint` — eslint (tanstack config)
- `pnpm --filter web format` — prettier --write + eslint --fix
- `pnpm --filter web check` — prettier check only
- `pnpm --filter web generate-routes` — regenerate `src/routeTree.gen.ts` (`tsr generate`)

## Architecture

**Monorepo layout**
- `apps/web` — TanStack Start app (Vite + Nitro, Tailwind v4). Package name `web`.
- `packages/ui` — `@retail/ui`, shared React components. Consumed as TypeScript source (`exports` points at `src/index.ts`); there is no build step for it.

**The API is not in this repo.** The web app calls a separate backend at `http://127.0.0.1:3000` (hardcoded in `apps/web/src/api/client.ts` and `apps/web/src/util/authentication.ts`). That collides with the web dev server, which also uses port 3000. Run the backend on another port and update those constants, or move the dev server, before developing against a live API.

**Routing and auth**
- File-based routes live in `apps/web/src/routes`. `routeTree.gen.ts` is generated; don't hand-edit it.
- `routes/_app.tsx` is a pathless layout that guards every page under `/_app/*`. Its `beforeLoad` calls `getCurrentUserFn` and redirects to `/login` when there is no session. Child routes read the user via `Route.useRouteContext()`.
- Auth is cookie-based through TanStack Start's `useSession` (`util/session.ts`). `loginFn` proxies credentials to the backend and stores `{ user, token }` in the session. `SESSION_SECRET` has a dev fallback.
- The stored token is **not** attached to API requests: `apiClient` sends no `Authorization` header. The roadmap in the root `README.md` lists "Include JWT on authenticated routes" as unchecked.
- Multi-tenancy is by `storeId`. Pages take it from the route context (`user.storeId`) and pass it to every query and metric call.

**Data layer (per feature)**
Each feature in `apps/web/src/feature/<name>/` follows the same split:
- `<name>.api.ts` — axios calls through `apiClient`, with paths from `api/routes.ts`
- `<name>.queries.ts` — `queryOptions` factories plus a key factory (`productsKeys`, `categoriesKeys`)
- `<name>.mutation.ts` — `useMutation` hooks that invalidate the list keys on success
- `<name>.types.ts`

Loaders call `context.queryClient.ensureQueryData(...)`, using the QueryClient from the router context (`router.tsx`). Default `staleTime` is 5 minutes.

Return conventions are inconsistent. Product list functions return `response.data`, but the product metric functions return the full axios response, so components read `data.data.total`. Order functions return `response.data`. Check the existing function before adding a query, and match its shape.

**Errors** — `apiClient`'s response interceptor converts every failure into an `Error`. The message is the joined `details[].message` list if present, otherwise `error`, otherwise the axios message. Pages surface these with `react-toastify`.

**Shared UI** — `packages/ui/src/index.ts` is the only public surface. Components there (`ProductModel`, `Table`, `SideBar`, `ErrorFallback`, etc.) take data and callbacks as props and don't fetch. Note that `index.ts` re-exports `ListView` from `apps/web/src/components/`, so `packages/ui` depends on the app. Don't copy that pattern.

**POS cart** — `feature/pos/cart.store.ts` is a zustand store kept in memory only (not persisted). It imports the `CartLine` type from `components/Cart.tsx`.

**Theme** — `THEME_INIT_SCRIPT` in `routes/__root.tsx` sets the `light`/`dark` class and `data-theme` on `<html>` before hydration, from `localStorage.theme` (`light` | `dark` | `auto`). Keep it inline, or the page will flash the wrong theme.

## Known gaps

- `routes/_app/products/index.tsx` hardcodes `totalItems={100}` for pagination (TODO in the code).
- The only test is a placeholder (`src/test/basic.test.ts`). `vitest.config.ts` is empty, so jsdom and Testing Library are installed but not configured. `packages/ui` has a failing placeholder `test` script.
- `apps/web/README.md` is the unmodified TanStack Start starter. Its demo-route and Getting Started notes don't describe this project.
