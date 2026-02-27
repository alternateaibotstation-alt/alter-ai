/* ALTER AI — AppLayout.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Fixed 240px sidebar with indigo accent borders, DM Sans nav items
 * Role-based nav: 'pro' users see Revenue + Affiliate
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  ShoppingBag,
  Download,
  CreditCard,
  BarChart3,
  Users,
  Upload,
  Mic,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Zap,
  MessageSquare,
} from "lucide-react";
import SupportChat from "./SupportChat";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  pro?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bot Builder", href: "/bots", icon: Bot },
  { label: "Bot Logic", href: "/bots/logic", icon: Cpu },
  { label: "Bot Voice", href: "/bots/voice", icon: Mic },
  { label: "Media Upload", href: "/media", icon: Upload },
  { label: "Templates", href: "/templates", icon: ShoppingBag },
  { label: "Export Bots", href: "/export", icon: Download },
  { label: "Subscription", href: "/subscription", icon: CreditCard },
  { label: "Revenue", href: "/revenue", icon: BarChart3, pro: true },
  { label: "Affiliate", href: "/affiliate", icon: Users, pro: true },
];

// Simulated role — in production this comes from auth context
const userRole = "pro";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = navItems.filter(item => !item.pro || userRole === "pro");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-250 ease-out shrink-0",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Brand */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
          collapsed && "justify-center px-2"
        )}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              ALTER AI
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            // Exact match for /bots to avoid it highlighting for /bots/logic, /bots/voice etc.
            const isActive = item.href === "/bots"
              ? location === "/bots"
              : location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 group",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "text-foreground bg-sidebar-accent border-l-2 border-primary pl-[10px]"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.pro && (
                    <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent/20 text-accent uppercase tracking-wide">
                      Pro
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User area */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>

      {/* Support Chat */}
      <SupportChat />
    </div>
  );
}
