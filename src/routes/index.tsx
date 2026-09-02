import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Bell,
  Building2,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Repeat,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import {
  alerts,
  clinicHealth,
  forecastSeries,
  kpis,
  riskMedicines,
  sparkData,
} from "../lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Predictive Inventory Dashboard | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Real-time stockout risk, expiring stock value, forecast accuracy and clinic stock health in one dashboard.",
      },
      { property: "og:title", content: "Predictive Inventory Dashboard | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Real-time insights. Smarter decisions. Zero stockouts.",
      },
    ],
  }),
  component: Dashboard,
});

const toneMap = {
  danger: { text: "text-danger", bg: "bg-danger/10", stroke: "var(--danger)", Icon: AlertTriangle },
  warning: { text: "text-warning", bg: "bg-warning/10", stroke: "var(--warning)", Icon: Clock },
  success: { text: "text-success", bg: "bg-success/10", stroke: "var(--success)", Icon: Target },
  info: { text: "text-info", bg: "bg-info/10", stroke: "var(--info)", Icon: Building2 },
} as const;

const alertIcon = {
  stockout: AlertTriangle,
  expiring: Clock,
  demand: TrendingUp,
} as const;

const alertTone = {
  stockout: "border-danger/30 bg-danger/5 text-danger",
  expiring: "border-warning/30 bg-warning/5 text-warning",
  demand: "border-info/30 bg-info/5 text-info",
} as const;

const riskBadge = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-success/10 text-success",
} as const;

function healthColor(score: number) {
  if (score >= 75) return "bg-success";
  if (score >= 50) return "bg-warning";
  if (score >= 30) return "bg-[oklch(0.68_0.19_45)]";
  return "bg-danger";
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Inventory Dashboard"
        subtitle="Real-time insights. Smarter decisions. Zero stockouts."
        action={
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground">
            <span>May 12 – May 18, 2025</span>
            <Calendar className="size-4 text-muted-foreground" />
          </div>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const tone = toneMap[kpi.tone];
          return (
            <div key={kpi.key} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2">
                <span className={`flex size-7 items-center justify-center rounded-full ${tone.bg} ${tone.text}`}>
                  <tone.Icon className="size-4" />
                </span>
                <span className={`text-sm font-semibold ${tone.text}`}>{kpi.label}</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{kpi.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{kpi.sub}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className={`text-xs font-medium ${tone.text}`}>▲ {kpi.delta}</span>
                <div className="h-10 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparkData}>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={tone.stroke}
                        fill={tone.stroke}
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Demand Forecast – Paracetamol 500mg
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Clinic: Jan Aushadhi Kendra – Patel Nagar
              </p>
            </div>
            <Link
              to="/forecast"
              className="rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              4 Weeks Forecast
            </Link>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastSeries}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="historical"
                  stroke="var(--info)"
                  fill="var(--info)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  name="Historical"
                />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="var(--chart-3)"
                  strokeDasharray="5 4"
                  fill="var(--success)"
                  fillOpacity={0.08}
                  name="Upper Bound"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="var(--chart-3)"
                  strokeDasharray="5 4"
                  fill="transparent"
                  name="Lower Bound"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="var(--success)"
                  fill="transparent"
                  strokeWidth={2}
                  name="Forecast"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Stock Health by Clinic</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stock Health Index (0 – 100)</p>
          <ul className="mt-6 space-y-4">
            {clinicHealth.map((c) => (
              <li key={c.name} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 text-muted-foreground">{c.name}</span>
                <span className="h-2.5 flex-1 rounded-full bg-muted">
                  <span
                    className={`block h-full rounded-full ${healthColor(c.score)}`}
                    style={{ width: `${c.score}%` }}
                  />
                </span>
                <span className="w-8 text-right font-medium text-foreground">{c.score}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between px-1 text-xs text-muted-foreground">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <Link
            to="/clinics"
            className="mt-6 block rounded-lg border border-border px-3 py-2 text-center text-sm text-foreground transition-colors hover:bg-accent"
          >
            View all clinics
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground">Top Stockout Risk Medicines</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 font-medium">Medicine</th>
                  <th className="py-3 font-medium">At Risk Clinics</th>
                  <th className="py-3 font-medium">Current Stock</th>
                  <th className="py-3 font-medium">Predicted Demand</th>
                  <th className="py-3 text-right font-medium">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {riskMedicines.map((m) => (
                  <tr key={m.medicine} className="border-b border-border/60 last:border-0">
                    <td className="py-3.5 text-foreground">{m.medicine}</td>
                    <td className="py-3.5 text-muted-foreground">{m.atRisk}</td>
                    <td className="py-3.5 text-muted-foreground">{m.stock.toLocaleString()}</td>
                    <td className="py-3.5 text-muted-foreground">{m.demand.toLocaleString()}</td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${riskBadge[m.risk]}`}
                      >
                        {m.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-danger" />
            <h2 className="text-lg font-semibold text-foreground">Alerts &amp; Action Center</h2>
            <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-danger/10 text-xs font-semibold text-danger">
              {alerts.length}
            </span>
          </div>

          <ul className="mt-4 space-y-3">
            {alerts.slice(0, 3).map((a) => {
              const Icon = alertIcon[a.kind];
              return (
                <li key={a.id} className={`rounded-xl border p-3 ${alertTone[a.kind]}`}>
                  <div className="flex gap-2.5">
                    <Icon className="mt-0.5 size-4 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.body}</p>
                      <Link to="/alerts" className="mt-1.5 inline-block text-xs font-medium text-primary">
                        {a.action}
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => {
              toast.success("Opening stock redistribution planner");
              navigate({ to: "/redistribution" });
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Repeat className="size-4" />
            Redistribute Stock
          </button>
        </div>
      </section>
    </div>
  );
}
