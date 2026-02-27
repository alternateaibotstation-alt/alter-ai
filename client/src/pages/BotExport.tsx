/* ALTER AI — BotExport.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Export bots as embed widgets, API endpoints, or standalone apps
 */

import { useState } from "react";
import { Download, Code, Globe, Package, Copy, Check, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const bots = [
  { id: "1", name: "Sales Assistant", model: "GPT-4o", status: "active" },
  { id: "2", name: "Support Bot", model: "GPT-4o-mini", status: "active" },
  { id: "3", name: "Lead Qualifier", model: "GPT-4o", status: "paused" },
  { id: "4", name: "Onboarding Guide", model: "Claude 3", status: "active" },
];

const exportTypes = [
  {
    id: "embed",
    label: "Embed Widget",
    icon: Code,
    description: "Drop a chat widget into any website with a single script tag.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "api",
    label: "REST API",
    icon: Zap,
    description: "Access your bot via a REST API endpoint with JWT authentication.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    id: "standalone",
    label: "Standalone App",
    icon: Globe,
    description: "Generate a hosted URL with a full-page chat interface.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    id: "package",
    label: "NPM Package",
    icon: Package,
    description: "Install as a React component in your existing application.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
];

function getCode(exportType: string, botId: string, botName: string) {
  switch (exportType) {
    case "embed":
      return `<!-- ALTER AI Embed Widget -->
<script
  src="https://cdn.alterai.io/widget.js"
  data-bot-id="${botId}"
  data-theme="dark"
  data-position="bottom-right"
  defer
></script>`;
    case "api":
      return `// ALTER AI REST API
const response = await fetch('https://api.alterai.io/v1/bots/${botId}/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hello!',
    session_id: 'user-session-123',
  }),
});

const { reply } = await response.json();
console.log(reply); // Bot response`;
    case "standalone":
      return `# Standalone Bot URL
https://bots.alterai.io/${botId}

# Custom domain (Pro)
https://your-domain.com/chat

# Embed as iframe
<iframe
  src="https://bots.alterai.io/${botId}"
  width="400"
  height="600"
  frameborder="0"
></iframe>`;
    case "package":
      return `# Install
npm install @alterai/react-bot

# Usage
import { AlterBot } from '@alterai/react-bot';

export default function App() {
  return (
    <AlterBot
      botId="${botId}"
      apiKey="YOUR_API_KEY"
      theme="dark"
      position="inline"
    />
  );
}`;
    default:
      return "";
  }
}

export default function BotExport() {
  const [selectedBot, setSelectedBot] = useState(bots[0]);
  const [exportType, setExportType] = useState("embed");
  const [copied, setCopied] = useState(false);

  const code = getCode(exportType, selectedBot.id, selectedBot.name);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadExport = () => {
    const ext = exportType === "embed" ? "html" : exportType === "api" ? "js" : "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedBot.name.replace(/\s+/g, "-").toLowerCase()}-${exportType}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export downloaded!");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Export Bots</h1>
        <p className="text-muted-foreground text-sm mt-1">Deploy your bots anywhere — embed, API, or standalone</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bot + Export Type Selection */}
        <div className="space-y-5">
          {/* Bot Selector */}
          <div className="alter-card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Select Bot</h2>
            <div className="space-y-2">
              {bots.map(bot => (
                <button
                  key={bot.id}
                  onClick={() => setSelectedBot(bot)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedBot.id === bot.id
                      ? "bg-primary/10 border border-primary/30 text-foreground"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-medium truncate">{bot.name}</p>
                    <p className="text-xs text-muted-foreground">{bot.model}</p>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    bot.status === "active" ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"
                  }`}>
                    {bot.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Type */}
          <div className="alter-card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Export Format</h2>
            <div className="space-y-2">
              {exportTypes.map(et => {
                const Icon = et.icon;
                return (
                  <button
                    key={et.id}
                    onClick={() => setExportType(et.id)}
                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                      exportType === et.id
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg ${et.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-3.5 h-3.5 ${et.color}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${exportType === et.id ? "text-foreground" : "text-muted-foreground"}`}>{et.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{et.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Code Preview */}
        <div className="lg:col-span-2 alter-card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
                {exportTypes.find(e => e.id === exportType)?.label} — {selectedBot.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Ready to deploy</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <Button onClick={downloadExport} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <pre className="text-sm text-green-300 font-mono leading-relaxed whitespace-pre-wrap bg-transparent">
              <code>{code}</code>
            </pre>
          </div>

          {/* Stats */}
          <div className="border-t border-border px-5 py-4 grid grid-cols-3 gap-4">
            {[
              { label: "Bot ID", value: selectedBot.id },
              { label: "Model", value: selectedBot.model },
              { label: "Status", value: selectedBot.status },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
