import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { PageHeader } from "../components/PageHeader";
import { accuracyTrend, zoneDemand } from "../lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics | Jan Aushadhi" },
      {
        name: "description",
        content:
          "Forecast accuracy trends, zone-wise demand and downloadable inventory performance reports.",
      },
      { property: "og:title", content: "Reports & Analytics | Jan Aushadhi" },
      {
        property: "og:description",
        content: "Track forecast accuracy and zone-wise demand over time.",
      },
    ],
  }),
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Forecast performance and demand analytics."
        action={
          <button
            onClick={() => toast.success("Report export queued — you'll get an email shortly")}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Export report
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Forecast Accuracy Trend</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrend}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={[80, 95]} tickLine={false} axisLine={false} fontSize={12} width={36} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--success)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Zone-wise Demand (units)</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneDemand}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="zone" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={48} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
                />
                <Bar dataKey="units" fill="var(--info)" radius={[6, 6, 0, 0]} name="Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
