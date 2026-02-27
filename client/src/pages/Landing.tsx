/* ALTER AI — Landing.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Hero with neural network background, feature grid, pricing CTA
 */

import { Link } from "wouter";
import { Zap, Bot, Mic, BarChart3, ShoppingBag, Shield, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-hero-bg-6eYZ4oYhraCWB8V8NyzQxo.webp";
const BOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-bot-card-gqPYG2oSAJUqk3fTw5neVp.webp";

const features = [
  { icon: Bot, title: "AI Bot Builder", desc: "Create intelligent bots with custom logic, personality, and knowledge bases in minutes." },
  { icon: Mic, title: "Voice-Enabled Bots", desc: "Give your bots a voice. Configure TTS, STT, and real-time voice interaction flows." },
  { icon: ShoppingBag, title: "Template Marketplace", desc: "Browse, buy, and deploy pre-built bot templates. Sell your own to earn revenue." },
  { icon: BarChart3, title: "Revenue Analytics", desc: "Track MRR, churn, affiliate commissions, and subscription metrics in real time." },
  { icon: Shield, title: "Role-Based Access", desc: "Free and Pro tiers with granular feature gating. Upgrade flows built in." },
  { icon: Zap, title: "One-Click Export", desc: "Export bots as embeddable widgets, API endpoints, or standalone apps." },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["3 bots", "Basic logic engine", "Community templates", "Email support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: ["Unlimited bots", "Voice + media upload", "Revenue dashboard", "Affiliate manager", "Priority support", "Custom exports"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Everything in Pro", "SSO & SAML", "Dedicated infra", "SLA guarantee", "White-label option"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>ALTER AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now with GPT-4o voice integration
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              Build AI Bots.<br />
              <span style={{ color: "oklch(0.58 0.22 265)" }}>Deploy Anywhere.</span><br />
              <span style={{ color: "oklch(0.72 0.18 65)" }}>Earn Revenue.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              ALTER AI is the complete SaaS platform for building, deploying, and monetizing intelligent AI bots — with voice, media, analytics, and a thriving template marketplace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  Launch Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary px-8">
                  Browse Templates
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent" /> Free tier available</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent" /> No credit card needed</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent" /> Cancel anytime</span>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "0 0 80px oklch(0.58 0.22 265 / 30%)" }} />
              <img
                src={BOT_IMG}
                alt="ALTER AI Bot"
                className="w-full h-full object-cover rounded-2xl border border-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Platform Features</p>
          <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
            Everything you need to build<br />and monetize AI bots
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="alter-card p-6 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Pricing</p>
            <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              Simple, transparent pricing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`alter-card p-8 flex flex-col relative ${plan.highlight ? "border-primary/50 indigo-glow" : ""}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/subscription">
                  <Button
                    className={`w-full ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>ALTER AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 ALTER AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
