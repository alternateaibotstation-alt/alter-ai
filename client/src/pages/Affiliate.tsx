/* ALTER AI — Affiliate.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Affiliate program management with referral links, commissions, payouts
 */

import { useState } from "react";
import { Users, DollarSign, Copy, Check, ArrowUpRight, Link2, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const commissionData = [
  { month: "Sep", earned: 120 },
  { month: "Oct", earned: 180 },
  { month: "Nov", earned: 240 },
  { month: "Dec", earned: 310 },
  { month: "Jan", earned: 280 },
  { month: "Feb", earned: 420 },
];

const referrals = [
  { name: "John Smith", email: "john@example.com", plan: "Pro", joined: "Feb 10, 2026", commission: "$14.70", status: "active" },
  { name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", joined: "Jan 28, 2026", commission: "$14.70", status: "active" },
  { name: "Mike Torres", email: "mike@example.com", plan: "Free", joined: "Jan 15, 2026", commission: "$0", status: "free" },
  { name: "Emma Wilson", email: "emma@example.com", plan: "Pro", joined: "Dec 20, 2025", commission: "$14.70", status: "active" },
  { name: "David Park", email: "david@example.com", plan: "Enterprise", joined: "Dec 5, 2025", commission: "$60.00", status: "active" },
];

const payouts = [
  { date: "Feb 1, 2026", amount: "$280.00", method: "Bank Transfer", status: "paid" },
  { date: "Jan 1, 2026", amount: "$240.00", method: "Bank Transfer", status: "paid" },
  { date: "Dec 1, 2025", amount: "$180.00", method: "PayPal", status: "paid" },
];

export default function Affiliate() {
  const [copied, setCopied] = useState(false);
  const refLink = "https://alterai.io/ref/alex-j-2026";

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Pro Feature</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Affiliate Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">Earn 30% recurring commission on every referral</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earned", value: "$1,550", icon: DollarSign, change: "+$420 this month" },
          { label: "Active Referrals", value: "14", icon: Users, change: "+3 this month" },
          { label: "Pending Payout", value: "$420", icon: Gift, change: "Pays out Mar 1" },
          { label: "Conversion Rate", value: "18.4%", icon: TrendingUp, change: "+2.1% vs last month" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="alter-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="stat-number text-3xl">{stat.value}</p>
              <p className="text-xs text-accent mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Referral Link */}
      <div className="alter-card p-6 border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Your Referral Link</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-input rounded-lg px-4 py-3 text-sm text-muted-foreground font-mono border border-border truncate">
            {refLink}
          </div>
          <Button onClick={copyLink} className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border text-sm">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Commission Rate</p>
            <p className="font-semibold text-foreground mt-1">30% recurring</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Cookie Duration</p>
            <p className="font-semibold text-foreground mt-1">90 days</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Payout Schedule</p>
            <p className="font-semibold text-foreground mt-1">Monthly</p>
          </div>
        </div>
      </div>

      {/* Charts + Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Commission Chart */}
        <div className="alter-card p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Monthly Commissions</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={commissionData}>
              <XAxis dataKey="month" tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip
                contentStyle={{ background: "oklch(0.11 0.012 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: "8px", color: "oklch(0.92 0.008 80)" }}
                formatter={(v: any) => [`$${v}`, "Earned"]}
              />
              <Bar dataKey="earned" fill="oklch(0.72 0.18 65)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Referrals Table */}
        <div className="alter-card overflow-hidden lg:col-span-3">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Referrals</h2>
          </div>
          <div className="divide-y divide-border">
            {referrals.map((ref, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {ref.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{ref.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{ref.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground">{ref.commission}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    ref.status === "active" ? "bg-green-500/10 text-green-400"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {ref.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="alter-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Payout History</h2>
          <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
            Request payout <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {payouts.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{p.date}</p>
                <p className="text-xs text-muted-foreground">{p.method}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{p.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
