/* ALTER AI — Revenue.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Revenue analytics with MRR, churn, and subscription breakdown
 */

import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, BarChart3 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const DASH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-dashboard-preview-4YdNA65jtoppWKcKNHShmU.webp";

const mrrData = [
  { month: "Sep", mrr: 1200 },
  { month: "Oct", mrr: 1800 },
  { month: "Nov", mrr: 2100 },
  { month: "Dec", mrr: 2600 },
  { month: "Jan", mrr: 2900 },
  { month: "Feb", mrr: 3240 },
];

const churnData = [
  { month: "Sep", churn: 4.2 },
  { month: "Oct", churn: 3.8 },
  { month: "Nov", churn: 3.1 },
  { month: "Dec", churn: 2.9 },
  { month: "Jan", churn: 2.4 },
  { month: "Feb", churn: 2.1 },
];

const revenueByPlan = [
  { name: "Pro", value: 2450, color: "oklch(0.58 0.22 265)" },
  { name: "Enterprise", value: 600, color: "oklch(0.72 0.18 65)" },
  { name: "Templates", value: 190, color: "oklch(0.65 0.18 200)" },
];

const topBots = [
  { name: "Sales Assistant", revenue: 840, users: 124, growth: "+18%" },
  { name: "Support Bot", revenue: 620, users: 98, growth: "+12%" },
  { name: "Onboarding Guide", revenue: 480, users: 76, growth: "+24%" },
  { name: "Lead Qualifier", revenue: 340, users: 54, growth: "+8%" },
  { name: "Voice Sales Closer", revenue: 280, users: 42, growth: "+31%" },
];

const stats = [
  { label: "MRR", value: "$3,240", change: "+12%", up: true, icon: DollarSign },
  { label: "ARR", value: "$38,880", change: "+12%", up: true, icon: TrendingUp },
  { label: "Paying Users", value: "847", change: "+24%", up: true, icon: Users },
  { label: "Churn Rate", value: "2.1%", change: "-0.3%", up: false, icon: TrendingDown },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
        <p className="text-muted-foreground text-xs mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="font-semibold" style={{ color: p.color }}>{p.name}: {typeof p.value === "number" && p.name?.toLowerCase().includes("mrr") ? `$${p.value.toLocaleString()}` : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Revenue() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Pro Feature</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Revenue Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your SaaS metrics and growth</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Period</p>
          <p className="text-sm font-semibold text-foreground">Last 6 months</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="alter-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="stat-number text-3xl">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.up
                  ? <ArrowUpRight className="w-3 h-3 text-accent" />
                  : <TrendingDown className="w-3 h-3 text-green-400" />
                }
                <span className={`text-xs font-medium ${stat.up ? "text-accent" : "text-green-400"}`}>{stat.change}</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR Chart */}
        <div className="alter-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Monthly Recurring Revenue</h2>
            <span className="text-xs text-accent font-medium">+170% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mrrData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.58 0.22 265)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.58 0.22 265)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mrr" name="MRR" stroke="oklch(0.58 0.22 265)" strokeWidth={2} fill="url(#mrrGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Plan */}
        <div className="alter-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Revenue by Plan</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={revenueByPlan} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {revenueByPlan.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`$${value}`, ""]} contentStyle={{ background: "oklch(0.11 0.012 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {revenueByPlan.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Churn Chart */}
      <div className="alter-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Churn Rate Trend</h2>
          <span className="text-xs text-green-400 font-medium">Improving ↓</span>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={churnData}>
            <XAxis dataKey="month" tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip contentStyle={{ background: "oklch(0.11 0.012 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: "8px", color: "oklch(0.92 0.008 80)" }} />
            <Line type="monotone" dataKey="churn" name="Churn %" stroke="oklch(0.72 0.18 65)" strokeWidth={2} dot={{ fill: "oklch(0.72 0.18 65)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Bots by Revenue */}
      <div className="alter-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Top Bots by Revenue</h2>
        </div>
        <div className="divide-y divide-border">
          {topBots.map((bot, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors">
              <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{bot.name}</p>
                <p className="text-xs text-muted-foreground">{bot.users} paying users</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">${bot.revenue}</p>
                <p className="text-xs text-accent">{bot.growth}</p>
              </div>
              <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(bot.revenue / topBots[0].revenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
