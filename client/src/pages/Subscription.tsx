/* ALTER AI — Subscription.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Stripe-powered subscription management with plan comparison
 */

import { useState } from "react";
import { Check, Zap, CreditCard, Calendar, AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    features: [
      "3 active bots",
      "100 messages/day",
      "Basic logic engine",
      "Community templates",
      "Email support",
    ],
    limits: ["No voice bots", "No media upload", "No revenue dashboard"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "month",
    features: [
      "Unlimited bots",
      "Unlimited messages",
      "Voice + media upload",
      "Revenue dashboard",
      "Affiliate manager",
      "Priority support",
      "Custom exports",
      "Template marketplace",
    ],
    limits: [],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "month",
    features: [
      "Everything in Pro",
      "SSO & SAML auth",
      "Dedicated infrastructure",
      "99.9% SLA guarantee",
      "White-label option",
      "Custom integrations",
      "Dedicated account manager",
    ],
    limits: [],
  },
];

const invoices = [
  { id: "INV-001", date: "Feb 1, 2026", amount: "$49.00", status: "paid" },
  { id: "INV-002", date: "Jan 1, 2026", amount: "$49.00", status: "paid" },
  { id: "INV-003", date: "Dec 1, 2025", amount: "$49.00", status: "paid" },
  { id: "INV-004", date: "Nov 1, 2025", amount: "$49.00", status: "paid" },
];

export default function Subscription() {
  const [currentPlan] = useState("pro");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const upgrade = (planId: string) => {
    if (planId === "enterprise") {
      toast.info("Contact our sales team at sales@alterai.io");
      return;
    }
    if (planId === currentPlan) {
      toast.info("You're already on this plan!");
      return;
    }
    toast.success(`Upgrading to ${planId} plan... (Stripe checkout would open here)`);
  };

  const cancelSubscription = () => {
    toast.error("Cancellation flow would open here");
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Subscription</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your plan and billing</p>
      </div>

      {/* Current Plan Banner */}
      <div className="alter-card p-6 border-primary/30 indigo-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Pro Plan</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold">Active</span>
              </div>
              <p className="text-muted-foreground text-sm">$49/month · Renews March 1, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={cancelSubscription} className="border-border text-muted-foreground hover:text-foreground">
              Cancel Plan
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Update Payment
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4 pt-5 border-t border-border">
          {[
            { label: "Bots Used", value: "12 / ∞" },
            { label: "Messages This Month", value: "48,210" },
            { label: "Next Billing", value: "Mar 1, 2026" },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>All Plans</h2>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${billing === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${billing === "annual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Annual <span className="text-accent ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => {
            const isCurrent = plan.id === currentPlan;
            const price = plan.price === null ? null : billing === "annual" ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <div
                key={plan.id}
                className={`alter-card p-6 flex flex-col relative ${plan.popular ? "border-primary/40" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    Current
                  </div>
                )}

                <div className="mb-5">
                  <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    {price === null ? (
                      <span className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Custom</span>
                    ) : (
                      <>
                        <span className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>${price}</span>
                        <span className="text-muted-foreground text-sm">/{plan.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.limits.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {l}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => upgrade(plan.id)}
                  className={`w-full ${
                    isCurrent
                      ? "bg-secondary text-muted-foreground cursor-default"
                      : plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {isCurrent ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoices */}
      <div className="alter-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Billing History</h2>
          <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
            Download all <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{inv.status}</span>
                <button className="text-xs text-primary hover:text-primary/80 transition-colors">PDF</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
