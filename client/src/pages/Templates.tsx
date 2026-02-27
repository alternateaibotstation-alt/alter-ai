/* ALTER AI — Templates.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Template marketplace with categories, ratings, and install flow
 */

import { useState } from "react";
import { ShoppingBag, Star, Download, Search, Filter, Zap, Bot, Mic, BarChart3, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MARKET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-marketplace-dKQvajSXadKZu7MsqA4yZB.webp";
const BOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388082870/X5Z8LQMxBVq8wFSRdgiL23/alter-bot-card-gqPYG2oSAJUqk3fTw5neVp.webp";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  installs: number;
  author: string;
  featured: boolean;
  tags: string[];
}

const templates: Template[] = [
  { id: "1", name: "E-Commerce Support Bot", description: "Handle order tracking, returns, and product FAQs automatically. Integrates with Shopify and WooCommerce.", category: "Support", price: 0, rating: 4.8, reviews: 234, installs: 1820, author: "ALTER Team", featured: true, tags: ["shopify", "support", "e-commerce"] },
  { id: "2", name: "Lead Qualification Pro", description: "Qualify leads with BANT framework. Scores leads and routes them to your CRM automatically.", category: "Sales", price: 29, rating: 4.9, reviews: 189, installs: 940, author: "SalesAI", featured: true, tags: ["crm", "sales", "leads"] },
  { id: "3", name: "SaaS Onboarding Guide", description: "Walk new users through your product with interactive tours, tooltips, and milestone tracking.", category: "Onboarding", price: 19, rating: 4.7, reviews: 156, installs: 1240, author: "OnboardPro", featured: false, tags: ["saas", "onboarding", "ux"] },
  { id: "4", name: "HR FAQ Assistant", description: "Answer employee questions about policies, benefits, PTO, and company info 24/7.", category: "HR", price: 0, rating: 4.6, reviews: 98, installs: 760, author: "HRBot Labs", featured: false, tags: ["hr", "employees", "faq"] },
  { id: "5", name: "Voice Sales Closer", description: "Voice-enabled bot that handles objections, presents pricing, and closes deals with natural conversation.", category: "Sales", price: 49, rating: 4.9, reviews: 67, installs: 320, author: "VoiceAI", featured: true, tags: ["voice", "sales", "closing"] },
  { id: "6", name: "Technical Support Tier 1", description: "Resolve common technical issues, gather diagnostics, and escalate complex tickets automatically.", category: "Support", price: 39, rating: 4.5, reviews: 142, installs: 880, author: "TechBot", featured: false, tags: ["technical", "support", "tickets"] },
  { id: "7", name: "Appointment Scheduler", description: "Book, reschedule, and cancel appointments. Syncs with Google Calendar and Calendly.", category: "Productivity", price: 24, rating: 4.7, reviews: 201, installs: 1560, author: "ScheduleAI", featured: false, tags: ["calendar", "booking", "scheduling"] },
  { id: "8", name: "Content Marketing Bot", description: "Generate blog ideas, social posts, and email campaigns based on your brand voice.", category: "Marketing", price: 34, rating: 4.6, reviews: 88, installs: 540, author: "ContentAI", featured: false, tags: ["content", "marketing", "social"] },
];

const categories = ["All", "Support", "Sales", "Onboarding", "HR", "Productivity", "Marketing"];

export default function Templates() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [installed, setInstalled] = useState<Set<string>>(new Set(["1"]));
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.includes(search.toLowerCase()));
    const matchCat = category === "All" || t.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter(t => t.featured);
  const regular = filtered.filter(t => !t.featured);

  const install = (t: Template) => {
    setInstalled(prev => { const next = new Set(prev); next.add(t.id); return next; });
    toast.success(`"${t.name}" installed to your workspace!`);
  };

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(Array.from(prev));
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden">
        <img src={MARKET_IMG} alt="Marketplace" className="w-full h-40 object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center px-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Marketplace</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              Template Marketplace
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {templates.length} templates · Deploy in seconds
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-input rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map(t => (
              <TemplateCard key={t.id} template={t} installed={installed.has(t.id)} liked={liked.has(t.id)} onInstall={install} onLike={toggleLike} />
            ))}
          </div>
        </div>
      )}

      {/* All Templates */}
      {regular.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            All Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {regular.map(t => (
              <TemplateCard key={t.id} template={t} installed={installed.has(t.id)} liked={liked.has(t.id)} onInstall={install} onLike={toggleLike} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No templates match your search.</p>
        </div>
      )}
    </div>
  );
}

function TemplateCard({ template: t, installed, liked, onInstall, onLike }: {
  template: Template;
  installed: boolean;
  liked: boolean;
  onInstall: (t: Template) => void;
  onLike: (id: string) => void;
}) {
  return (
    <div className="alter-card p-5 flex flex-col gap-4 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden">
            <img src={BOT_IMG} alt={t.name} className="w-full h-full object-cover opacity-70" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>{t.name}</p>
            <p className="text-xs text-muted-foreground">by {t.author}</p>
          </div>
        </div>
        <button onClick={() => onLike(t.id)} className="p-1.5 rounded hover:bg-secondary transition-colors">
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-400 text-red-400" : "text-muted-foreground"}`} />
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{t.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {t.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            {t.rating}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {t.installs.toLocaleString()}
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
          t.category === "Sales" ? "bg-accent/10 text-accent"
          : t.category === "Support" ? "bg-primary/10 text-primary"
          : "bg-secondary text-muted-foreground"
        }`}>
          {t.category}
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
          {t.price === 0 ? "Free" : `$${t.price}`}
        </span>
        <Button
          size="sm"
          onClick={() => !installed && onInstall(t)}
          className={installed
            ? "bg-green-500/10 text-green-400 hover:bg-green-500/10 cursor-default"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
          }
        >
          {installed ? "Installed" : t.price === 0 ? "Install Free" : `Buy $${t.price}`}
        </Button>
      </div>
    </div>
  );
}
