"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
