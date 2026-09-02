import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import { alerts, type AlertKind } from "../lib/mock-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Action Center | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Stockout risk, expiring batch and demand spike alerts with recommended actions for clinic staff.",
      },
      { property: "og:title", content: "Alerts & Action Center | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Act on stockout, expiry and demand spike alerts in one place.",
      },
    ],
  }),
  component: Alerts,
});

const icons = { stockout: AlertTriangle, expiring: Clock, demand: TrendingUp } as const;
const tones = {
  stockout: "border-danger/30 bg-danger/5 text-danger",
  expiring: "border-warning/30 bg-warning/5 text-warning",
  demand: "border-info/30 bg-info/5 text-info",
} as const;

const filters: { label: string; kind: AlertKind | "all" }[] = [
  { label: "All", kind: "all" },
  { label: "Stockout Risk", kind: "stockout" },
  { label: "Expiring", kind: "expiring" },
  { label: "Demand", kind: "demand" },
];

function Alerts() {
  const [kind, setKind] = useState<AlertKind | "all">("all");
  const [resolved, setResolved] = useState<string[]>([]);

  const rows = alerts.filter((a) => (kind === "all" ? true : a.kind === kind));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts & Action Center"
        subtitle={`${alerts.length - resolved.length} open alerts across your network.`}
      />

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-surface p-1">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setKind(f.kind)}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              kind === f.kind
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {f.label} (
            {f.kind === "all" ? alerts.length : alerts.filter((a) => a.kind === f.kind).length})
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {rows.map((a) => {
          const Icon = icons[a.kind];
          const done = resolved.includes(a.id);
          return (
            <li
              key={a.id}
              className={`rounded-2xl border p-4 ${done ? "border-border bg-surface opacity-60" : tones[a.kind]}`}
            >
              <div className="flex flex-wrap items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0" />
                <div className="min-w-48 flex-1">
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.info(`${a.action}: ${a.title}`)}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {a.action}
                  </button>
                  <button
                    onClick={() =>
                      setResolved((prev) =>
                        prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id],
                      )
                    }
                    className="rounded-lg border border-border px-3 py-2 text-xs text-foreground transition-colors hover:bg-accent"
                  >
                    {done ? "Reopen" : "Resolve"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
