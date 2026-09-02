import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { clinics } from "../lib/mock-data";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "Clinic Network | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Search 1,248 Jan Aushadhi clinics by zone and review stock health index, stockouts and last sync time.",
      },
      { property: "og:title", content: "Clinic Network | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Monitor stock health across every Jan Aushadhi Kendra.",
      },
    ],
  }),
  component: Clinics,
});

function healthTone(score: number) {
  if (score >= 75) return "bg-success/10 text-success";
  if (score >= 50) return "bg-warning/15 text-warning";
  return "bg-danger/10 text-danger";
}

function Clinics() {
  const [q, setQ] = useState("");
  const rows = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.zone.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Clinics" subtitle="1,248 active clinics across 5 zones." />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search clinic or zone…"
        className="w-full max-w-sm rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => (
          <div key={c.name} className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-semibold text-foreground">{c.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">Zone: {c.zone}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${healthTone(c.health)}`}>
                Health {c.health}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {c.stockouts} stockouts
              </span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Last sync {c.lastSync}</p>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No clinics match that search.</p>
        )}
      </div>
    </div>
  );
}
