/* ALTER AI Landing Page
 * Premium 2025 SaaS Redesign
 * Focus: Bot building (not revenue)
 * Design: Warm beige, purple primary, clean minimal
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Palette, Rocket, BarChart3, Users, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-hero-bg-gqPYG2oSAJUqk3fTw5neVp.webp";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4EFE6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">ALTER AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-gray-600 hover:text-gray-900 font-medium">Sign In</button>
            <Link href="/dashboard">
              <Button className="btn-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-purple-100 rounded-full">
                <span className="text-sm font-semibold text-purple-600">✨ No Code Required</span>
              </div>
              <h1 className="hero-text">
                Build Powerful <span className="text-highlight">AI Bots</span> — No Code Required
              </h1>
              <p className="section-subtitle">
                Design, customize, and deploy intelligent AI bots for your audience with a simple visual builder. No coding skills needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
                  Build Your First Bot <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <button className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                See How It Works <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-sm text-gray-600">Free tier available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-sm text-gray-600">No credit card needed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-sm text-gray-600">Deploy in minutes</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="card-premium overflow-hidden">
              <img 
                src={HERO_IMAGE} 
                alt="ALTER AI Bot Builder" 
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-3xl opacity-40" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Get your AI bot up and running in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Design Your Bot",
                desc: "Choose a template or start from scratch. Define your bot's personality, knowledge base, and conversation flows.",
                icon: Palette,
              },
              {
                step: "2",
                title: "Customize Logic",
                desc: "Use our visual logic engine to build decision trees, set triggers, and create intelligent responses.",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Deploy Anywhere",
                desc: "Export your bot as an embed widget, API, standalone app, or React component. One click deployment.",
                icon: Rocket,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card-premium p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Everything You Need</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Powerful features built for creators, developers, and businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Visual Bot Builder",
              desc: "Drag-and-drop interface to create sophisticated bots without writing code.",
              icon: Zap,
            },
            {
              title: "Voice Integration",
              desc: "Add text-to-speech and speech-to-text capabilities. Choose from 6+ professional voices.",
              icon: Users,
            },
            {
              title: "Smart Logic Engine",
              desc: "Build complex conversation flows with triggers, conditions, actions, and dynamic responses.",
              icon: Sparkles,
            },
            {
              title: "Multi-Model Support",
              desc: "Use GPT-4o, Claude, Gemini, or any LLM. Switch models per bot.",
              icon: BarChart3,
            },
            {
              title: "Template Marketplace",
              desc: "Browse pre-built templates for sales, support, leads, onboarding, and more.",
              icon: Rocket,
            },
            {
              title: "One-Click Export",
              desc: "Deploy as embed widget, REST API, standalone app, or npm package.",
              icon: Palette,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="card-premium p-8 space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Optional Monetization (Secondary) */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="card-premium p-12 md:p-16 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="section-title">Monetize Your Bots (Optional)</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                If you want to earn revenue, ALTER AI makes it easy. Sell access to your bots, earn affiliate commissions, or build a bot marketplace.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Subscription Plans",
                  desc: "Set your own pricing. Manage tiers, billing, and customer access.",
                },
                {
                  title: "Revenue Analytics",
                  desc: "Track MRR, churn, customer lifetime value, and bot performance in real time.",
                },
                {
                  title: "Affiliate Program",
                  desc: "Earn 30% recurring commission on every referral. Build passive income.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center space-y-3">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Simple, Transparent Pricing</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Start free. Upgrade only when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              price: "$0",
              desc: "Perfect for trying ALTER AI",
              features: ["3 active bots", "Basic logic engine", "Community templates", "Email support"],
              cta: "Get Started",
              primary: false,
            },
            {
              name: "Pro",
              price: "$49",
              period: "/month",
              desc: "For serious bot builders",
              features: ["Unlimited bots", "Voice + media upload", "Template marketplace", "Revenue dashboard", "Priority support"],
              cta: "Start Free Trial",
              primary: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              desc: "For teams and organizations",
              features: ["Everything in Pro", "SSO & SAML auth", "Dedicated support", "Custom integrations", "SLA guarantee"],
              cta: "Contact Sales",
              primary: false,
            },
          ].map((plan, idx) => (
            <div key={idx} className={`card-premium p-8 space-y-6 ${plan.primary ? "ring-2 ring-purple-600 relative" : ""}`}>
              {plan.primary && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{plan.desc}</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard">
                <Button className={plan.primary ? "btn-primary w-full" : "btn-secondary w-full"}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16 md:py-24">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to build your first AI bot?
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Join thousands of creators building intelligent bots with ALTER AI.
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 font-semibold">
              Build Your Bot Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-white">ALTER AI</span>
              </div>
              <p className="text-sm">Build, customize, and deploy AI bots.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; 2025 ALTER AI. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">GitHub</a>
              <a href="#" className="hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
