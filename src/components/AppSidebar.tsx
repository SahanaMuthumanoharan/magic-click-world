import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Bell,
  Repeat,
  Building2,
  FileBarChart,
  Settings,
  Cross,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Forecast", url: "/forecast", icon: TrendingUp },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Redistribution", url: "/redistribution", icon: Repeat },
  { title: "Clinics", url: "/clinics", icon: Building2 },
  { title: "Reports", url: "/reports", icon: FileBarChart },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col rounded-none bg-sidebar text-sidebar-foreground md:m-3 md:rounded-2xl">
      <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-success/20 text-success">
          <Cross className="size-4" />
        </span>
        <span className="text-base font-semibold">Jan Aushadhi</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            activeOptions={{ exact: item.url === "/" }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:font-medium data-[status=active]:text-sidebar-primary-foreground"
          >
            <item.icon className="size-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-sidebar-border px-5 py-5">
        <span className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium">
          WA
        </span>
        <div className="leading-tight">
          <p className="text-sm">Warehouse Admin</p>
          <p className="text-xs text-sidebar-foreground/60">Central Warehouse</p>
        </div>
      </div>
    </aside>
  );
}
