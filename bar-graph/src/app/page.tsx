import type { CSSProperties } from "react";

const chartData = [
  {
    label: "Marketing",
    value: 86,
    change: "+14%",
    colorFrom: "#0f3a84",
    colorTo: "#5ad5ff",
  },
  {
    label: "Product",
    value: 112,
    change: "+6%",
    colorFrom: "#0c5f5f",
    colorTo: "#31e0c1",
  },
  {
    label: "Operations",
    value: 74,
    change: "+2%",
    colorFrom: "#5b1087",
    colorTo: "#d87bff",
  },
  {
    label: "Finance",
    value: 98,
    change: "+18%",
    colorFrom: "#7f102a",
    colorTo: "#ff7d9f",
  },
  {
    label: "Support",
    value: 56,
    change: "-4%",
    colorFrom: "#7a2e0b",
    colorTo: "#ffcd6f",
  },
  {
    label: "Growth",
    value: 128,
    change: "+22%",
    colorFrom: "#103a8a",
    colorTo: "#6aa8ff",
  },
] as const;

const axisSteps = [0.25, 0.5, 0.75, 1];

const maxValue = Math.max(...chartData.map((entry) => entry.value));
const totalVolume = chartData.reduce((sum, entry) => sum + entry.value, 0);
const averageChange =
  chartData.reduce(
    (sum, entry) => sum + Number(entry.change.replace("%", "")),
    0,
  ) / chartData.length;
const topPerformer = chartData.reduce((prev, current) =>
  current.value > prev.value ? current : prev,
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:px-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200 backdrop-blur-lg">
              insight report
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                Quarter-over-Quarter Momentum
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300">
                Visualize how each strategic team contributes to overall growth. Hover
                in to soak in the color, stay for the performance trends.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-3 rounded-3xl border border-white/15 bg-white/5 p-6 text-sm shadow-[0_20px_45px_-24px_rgba(56,189,248,0.6)] backdrop-blur-xl sm:w-auto">
            <div className="flex items-center justify-between text-slate-300">
              <span>Total Output</span>
              <span className="text-lg font-semibold text-white">
                {totalVolume.toLocaleString()} pts
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Average Lift</span>
              <span
                className={`text-lg font-semibold ${
                  averageChange >= 0 ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {averageChange.toFixed(1)}%
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
              refreshed 3 mins ago
            </div>
          </div>
        </header>

        <main className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section className="relative overflow-hidden rounded-[32px] p-10 shadow-[0_45px_80px_-40px_rgba(8,47,73,0.85)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%)]" />
            <div className="frosted-card pointer-events-none absolute inset-0 opacity-[0.66]" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Team Performance
                  </h2>
                  <p className="text-sm text-slate-300">
                    Normalized index comparison — peak output at {maxValue} pts.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-300">
                  <span className="inline-flex h-2 w-2 rounded-full bg-sky-300" />
                  Active Sprint
                  <span className="inline-flex h-2 w-2 rounded-full bg-cyan-200" />
                  Forecast
                </div>
              </div>

              <div className="relative mt-2 flex h-[320px] items-end gap-6 rounded-[26px] border border-white/10 bg-white/[0.04] px-10 pb-10 pt-12">
                <div className="pointer-events-none absolute inset-y-12 left-10 right-10 flex flex-col justify-between">
                  {axisSteps.map((step) => (
                    <div
                      key={step}
                      className="relative h-px w-full border-t border-dashed border-white/15"
                    >
                      <span className="absolute -top-2 left-0 inline-flex -translate-y-full rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                        {(step * maxValue).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>

                {chartData.map((entry, index) => {
                  const barStyle: CSSProperties & { "--delay": string } = {
                    height: `${(entry.value / maxValue) * 100}%`,
                    background: `linear-gradient(180deg, ${entry.colorTo}, ${entry.colorFrom})`,
                    boxShadow: `0 40px 60px -30px ${entry.colorFrom}b0`,
                    "--delay": `${index * 0.08}s`,
                  };

                  const isPositive = !entry.change.startsWith("-");

                  return (
                    <div
                      key={entry.label}
                      className="group flex flex-1 flex-col items-center gap-4"
                    >
                      <div className="relative flex h-[220px] w-full max-w-[86px] items-end justify-center">
                        <div
                          className="chart-bar relative w-full overflow-hidden rounded-t-3xl"
                          style={barStyle}
                        >
                          <div className="absolute inset-x-0 top-3 h-[2px] bg-white/60 mix-blend-screen opacity-80" />
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/50" />
                          <div className="absolute inset-3 rounded-[22px] border border-white/15" />
                        </div>
                        <div className="pointer-events-none absolute -top-16 flex flex-col items-center gap-1">
                          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(8,47,73,0.65)] backdrop-blur">
                            {entry.value} pts
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              isPositive ? "text-emerald-300" : "text-rose-300"
                            }`}
                          >
                            {entry.change}
                          </span>
                        </div>
                        <div className="pointer-events-none absolute inset-x-4 bottom-[-18px] h-12 rounded-full bg-cyan-200/20 blur-2xl" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-sm font-semibold text-white">
                          {entry.label}
                        </span>
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          sprint {index + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.05] p-9 shadow-[0_44px_80px_-48px_rgba(148,163,184,0.65)] backdrop-blur-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-white">Story at a glance</h3>
              <p className="text-sm text-slate-300">
                {topPerformer.label} leads the pack with {topPerformer.value} pts, setting
                the tone for an energetic finish to the quarter.
              </p>
            </div>

            <dl className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="uppercase tracking-[0.28em] text-xs text-slate-400">
                  Momentum
                </dt>
                <dd className="text-lg font-semibold text-sky-200">
                  {(totalVolume / (chartData.length * maxValue) * 100).toFixed(0)}%
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="uppercase tracking-[0.28em] text-xs text-slate-400">
                  Participation
                </dt>
                <dd className="text-lg font-semibold text-cyan-200">
                  {chartData.length} teams
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="uppercase tracking-[0.28em] text-xs text-slate-400">
                  Forecast
                </dt>
                <dd className="text-lg font-semibold text-emerald-200">
                  +{Math.max(averageChange + 4, 0).toFixed(0)}%
                </dd>
              </div>
            </dl>

            <div className="mt-auto space-y-4">
              <h4 className="text-xs uppercase tracking-[0.32em] text-slate-400">
                palette legend
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                {chartData.map((entry) => (
                  <li key={`legend-${entry.label}`} className="flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{
                        background: `linear-gradient(180deg, ${entry.colorTo}, ${entry.colorFrom})`,
                        boxShadow: `0 10px 22px -12px ${entry.colorFrom}aa`,
                      }}
                    >
                      {entry.label.substring(0, 2)}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{entry.label}</span>
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {entry.change} quarter delta
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
