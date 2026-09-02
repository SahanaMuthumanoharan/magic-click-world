import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import { redistribution } from "../lib/mock-data";

export const Route = createFileRoute("/redistribution")({
  head: () => ({
    meta: [
      { title: "Stock Redistribution | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Move surplus medicine stock between clinics and the central warehouse before it expires or runs out.",
      },
      { property: "og:title", content: "Stock Redistribution | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Plan and confirm stock transfers between clinics in a few clicks.",
      },
    ],
  }),
  component: Redistribution,
});

function Redistribution() {
  const [qty, setQty] = useState(800);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Redistribution"
        subtitle="Balance stock across clinics before shortages happen."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {redistribution.map((r) => (
            <div
              key={r.medicine + r.to}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="min-w-48 flex-1">
                <p className="font-semibold text-foreground">{r.medicine}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  {r.from} <ArrowRight className="size-3.5" /> {r.to}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{r.units.toLocaleString()} units</p>
                <p>ETA {r.eta}</p>
              </div>
              <button
                onClick={() => toast.success(`Transfer approved: ${r.medicine} → ${r.to}`)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Approve
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Place Order</h2>
          <p className="mt-1 text-sm text-muted-foreground">Amoxicillin 500mg</p>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Current Stock</dt>
              <dd className="text-lg font-semibold text-danger">450 units</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Predicted Need (Next 4 Weeks)</dt>
              <dd className="text-lg font-semibold text-foreground">1,200 units</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Available at Warehouse</dt>
              <dd className="text-lg font-semibold text-foreground">5,600 units</dd>
            </div>
          </dl>

          <p className="mt-5 text-sm text-muted-foreground">Recommended Order</p>
          <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
            <button
              onClick={() => setQty((q) => Math.max(0, q - 100))}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-accent"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-center">
              <span className="block text-xl font-bold text-foreground">{qty.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">units</span>
            </span>
            <button
              onClick={() => setQty((q) => q + 100)}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-accent"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            onClick={() => toast.success(`Order confirmed: ${qty.toLocaleString()} units`)}
            className="mt-5 w-full rounded-xl bg-success px-4 py-3 text-sm font-medium text-success-foreground transition-opacity hover:opacity-90"
          >
            Confirm Order
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Expected delivery: 2 – 3 days
          </p>
        </div>
      </div>
    </div>
  );
}
