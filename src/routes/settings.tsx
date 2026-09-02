import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Jan Aushadhi Inventory" },
      {
        name: "description",
        content:
          "Configure reorder thresholds, alert channels and forecast horizons for your Jan Aushadhi network.",
      },
      { property: "og:title", content: "Settings | Jan Aushadhi Inventory" },
      {
        property: "og:description",
        content: "Tune thresholds and alert preferences for predictive inventory.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [threshold, setThreshold] = useState(500);
  const [horizon, setHorizon] = useState("4 Weeks");
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Warehouse Admin · Central Warehouse" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Settings saved");
        }}
        className="max-w-xl space-y-5 rounded-2xl border border-border bg-surface p-6"
      >
        <label className="block">
          <span className="text-sm font-medium text-foreground">Reorder threshold (units)</span>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Default forecast horizon</span>
          <select
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          >
            {["2 Weeks", "4 Weeks", "8 Weeks"].map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </label>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Alert channels</legend>
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <input type="checkbox" checked={email} onChange={(e) => setEmail(e.target.checked)} />
            Email alerts
          </label>
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} />
            SMS alerts to clinic staff
          </label>
        </fieldset>

        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
