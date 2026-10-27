# Settings screen: status and follow-ups

Route: `apps/web/src/routes/_app/settings/index.tsx`
Feature code: `apps/web/src/feature/settings/` (`api`, `queries`, `mutation`, `types`, `schema`, `mapper`)
Shared UI: `Toggle`, `FormField` (has an `error` prop), `ReceiptPreview` (takes tax, currency, payment method and footer) in `packages/ui`.

## What exists

- `GET /api/settings?storeId=` loads `{ store, settings }` in the route loader.
- `PUT /api/settings?storeId=` saves both tables. The response is written straight into the query cache.
- The form uses react-hook-form with a zod resolver (`settings.schema.ts`). Numeric inputs stay as strings and are converted in `settings.mapper.ts` (`toPayload`).
- The side cards and the receipt preview update live from the form values.
- The logo box starts empty and only shows a locally picked file. The stored `logoUrl` is not displayed, but it is sent back unchanged on save.

## Missing

1. **Nothing consumes the settings.** POS, products and receipts ignore currency, tax, `priceIncludesTax`, `lowStockWarning`, `allowNegativeStock`, `skuRequired` and `barcodeEnabled`.
2. **Never run end to end.** Only lint, types and a dev-server render check were done. Load the page logged in and save against the real API.
3. **Enum values are guesses.** Only `Cash` is confirmed. Check `CURRENCY_OPTIONS` and `PAYMENT_METHOD_OPTIONS` in the route against `currencyEnum` and `paymentMethodEnum`.
4. **Logo upload.** No endpoint. When it exists, show the saved logo again and send the new `logoUrl`.
5. **Tests.** None, and vitest is not configured. Start with `settings.schema.ts` and `settings.mapper.ts` (pure functions).
6. **No role check.** A Cashier can open Settings and save. `user.role` is available.
7. **No JWT on requests.** `storeId` comes from the client, so the backend should take it from the token (README roadmap item).
8. **Backend 400s are not mapped to fields.** `details[].field` only shows as a toast. Use `setError` per field.
9. **No unsaved-changes handling.** Save is always enabled and leaving the page loses edits silently.
10. **Add User is half done.** It uses raw `fetch` instead of `apiClient`, has no success toast, and reads `json.message` instead of `details`.

## Sub-optimal

1. `watch()` re-renders the whole route on every keystroke. Use `useWatch` in small preview components.
2. The route is about 450 lines. Split the business, sales and inventory cards into section components and move the option lists to a constants file.
3. The tax input uses `readOnly` instead of `disabled`, because react-hook-form drops disabled inputs from the values. Works, but the field stays tabbable.
4. `URL.createObjectURL` for the logo preview is never revoked.
5. `ReceiptPreview` ignores `priceIncludesTax` and uses fixed sample items.
6. Dependency pins: `react-start` is `1.168.48` and `react-router` is `1.170.31` (a matching set). The other `@tanstack/*` packages float on `latest`. Pin them all.

## Dependency note: do not run `pnpm update "@tanstack/*" --latest`

It moves `react-router` past what `react-start@1.168.48` supports and fails with `router.serverSsr?.takeInitialHydrationScriptTags is not a function`.
Bumping `react-start` to `1.169.4` fixes that error but then fails with `useSession is not a function`.
Newer `start-server-core` no longer has `useSession`, so `util/session.ts`, `util/authentication.ts` and `routes/_app.tsx` need migrating before upgrading.

## Suggested order

1. Run the page against the backend and confirm the enum values (items 2 and 3).
2. Make one other screen read the settings (item 1), for example the POS tax and currency.
3. Commit the work (the settings feature, the form refactor and the dependency pins are all uncommitted).
4. Split the route and switch to `useWatch`.
