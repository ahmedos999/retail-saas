import { AlertTriangle } from "lucide-react";
import { Button } from "../button";

export interface ErrorFallbackProps {
  error: unknown;
  reset?: () => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-light">
        <AlertTriangle size={28} className="text-secondary" />
      </div>
      <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
      <p className="max-w-md text-gray-500">
        We hit a snag loading this page. You can try again, or head back to the
        dashboard if the problem continues.
      </p>
      <p className="max-w-md text-xs text-gray-400">{getErrorMessage(error)}</p>
      <div className="flex gap-3">
        {reset && (
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => (window.location.href = "/")}
        >
          Go home
        </Button>
      </div>
    </div>
  );
}
