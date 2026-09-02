import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import { forecastSeries, inventory } from "../lib/mock-data";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Demand Forecast | Jan Aushadhi Inventory" },
      {
        name: "description",
        content:
          "Medicine-level demand forecasts with confidence bounds and recommended order quantities for each clinic.",
      },
      { property: "og:title", content: "Demand Forecast | Jan Aushadhi Inventory" },
      {
        property: "og:description",
        content: "Forecast demand per medicine with 90% confidence intervals.",
      },
    ],
  }),
  component: Forecast,
});

const horizons = ["2 Weeks", "4 Weeks", "8 Weeks"];

function Forecast() {
  const [medicine, setMedicine] = useState(inventory[0].medicine);
  const [horizon, setHorizon] = useState("4 Weeks");

  return (
    <div className="space-y-6">
      <PageHeader title="Demand Forecast" subtitle="Predicted demand with 90% confidence bounds." />

      <div className="flex flex-wrap gap-3">
        <select
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
        >
          {inventory.map((i) => (
            <option key={i.medicine} value={i.medicine}>
              {i.medicine}
            </option>
          ))}
        </select>
        <div className="flex rounded-xl border border-border bg-surface p-1">
          {horizons.map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                horizon === h
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold text-foreground">
          {medicine} · {horizon}
        </h2>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastSeries}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={44} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
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

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Predicted Demand ({horizon})</p>
          <p className="mt-2 text-2xl font-bold text-success">5,620 units</p>
          <p className="mt-1 text-xs text-muted-foreground">90% Confidence: 3,800 – 7,450</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Recommended Order Quantity</p>
          <p className="mt-2 text-2xl font-bold text-foreground">6,000 units</p>
          <p className="mt-1 text-xs text-muted-foreground">Includes 7-day safety buffer</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted-foreground">Model Accuracy</p>
          <p className="mt-2 text-2xl font-bold text-foreground">92.6%</p>
          <button
            onClick={() => toast.success(`Order placed for ${medicine} · 6,000 units`)}
            className="mt-3 w-full rounded-lg bg-success px-3 py-2 text-sm font-medium text-success-foreground transition-opacity hover:opacity-90"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
