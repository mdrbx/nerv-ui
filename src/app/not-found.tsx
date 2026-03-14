import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nerv-page-shell flex min-h-screen items-center justify-center bg-eva-black px-4 py-10">
      <div className="w-full max-w-3xl border border-eva-orange/35 bg-[linear-gradient(180deg,rgba(255,153,0,0.08),rgba(0,0,0,0.92)_16%)] p-3 shadow-[0_0_32px_rgba(255,153,0,0.08)] sm:p-5">
        <div className="border border-eva-mid-gray/70 bg-black">
          <div className="flex items-center justify-between gap-3 border-b border-eva-mid-gray/70 px-3 py-2">
            <span
              className="text-[10px] uppercase tracking-[0.24em] text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              route integrity failure
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.18em] text-eva-white/38"
              style={{ fontFamily: "var(--font-eva-mono)" }}
            >
              signal lost
            </span>
          </div>

          <div className="space-y-5 px-4 py-6 sm:px-6 sm:py-8">
            <div className="space-y-2">
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-eva-cyan"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                navigation exception
              </div>
              <h1
                className="text-4xl uppercase leading-none text-eva-orange sm:text-6xl"
                style={{ fontFamily: "var(--font-eva-display)", letterSpacing: "0.06em" }}
              >
                404
              </h1>
              <p
                className="max-w-xl text-sm uppercase tracking-[0.12em] text-eva-white/62 sm:text-base"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                Requested route is outside the monitored command lattice.
              </p>
            </div>

            <div className="grid gap-2 border border-eva-mid-gray/60 bg-eva-black/70 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div
                className="text-[10px] uppercase tracking-[0.18em] text-eva-white/44"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                Recovery path available. Return to documentation index or the command center.
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/docs/"
                  className="border border-eva-orange/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-eva-orange transition-colors hover:bg-eva-orange hover:text-eva-black"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  docs index
                </Link>
                <Link
                  href="/"
                  className="border border-eva-cyan/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-eva-cyan transition-colors hover:bg-eva-cyan hover:text-eva-black"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  command center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
