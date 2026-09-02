import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import { inventory } from "../lib/mock-data";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Clinic Inventory | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Live medicine stock levels, batch numbers and expiry dates with reorder recommendations per clinic.",
      },
      { property: "og:title", content: "Clinic Inventory | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Track stock levels, batches and expiring medicines across clinics.",
      },
    ],
  }),
  component: Inventory;
});

const tabs = ["All", "Low Stock", "Expiring Soon"] as const;

const statusTone = {
  Good: "bg-success/10 text-success",
  "Low (Reorder)": "bg-danger/10 text-danger",
  "Expiring Soon": "bg-warning/15 text-warning",
} as const;

function Inventory() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");

  const rows = inventory.filter((i) =>
    tab === "All"
      ? true
      : tab === "Low Stock"
        ? i.status === "Low (Reorder)"
        : i.status === "Expiring Soon",
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Inventory"
        subtitle="Jan Aushadhi Kendra – Patel Nagar, New Delhi"
      />

      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Medicine</th>
              <th className="px-5 py-3 font-medium">Units</th>
              <th className="px-5 py-3 font-medium">Batch</th>
              <th className="px-5 py-3 font-medium">Expiry</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.medicine} className="border-b border-border/60 last:border-0">
                <td className="px-5 py-4 text-foreground">{i.medicine}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.units.toLocaleString()}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.batch}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.expiry}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusTone[i.status]}`}
                  >
                    {i.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => toast.success(`Reorder request raised for ${i.medicine}`)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
                  >
                    Reorder
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  No medicines in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
