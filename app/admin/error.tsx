"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h1 className="text-2xl">We couldn’t load the media dashboard</h1>
      <p className="mt-3 text-muted-foreground">Check your connection and try again. Your saved pictures are still there.</p>
      <button onClick={reset} className="mt-6 min-h-11 rounded-full bg-primary px-6 py-2 text-white">Try again</button>
    </div>
  );
}
