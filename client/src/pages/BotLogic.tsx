/* ALTER AI — BotLogic.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Visual logic flow builder for bot conversation rules
 */

import { useState } from "react";
import { Plus, Trash2, ArrowRight, GitBranch, MessageSquare, Zap, Save, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LogicNode {
  id: string;
  type: "trigger" | "condition" | "action" | "response";
  label: string;
  value: string;
  children: string[];
}

const nodeTypes = [
  { type: "trigger", label: "Trigger", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30" },
  { type: "condition", label: "Condition", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { type: "action", label: "Action", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  { type: "response", label: "Response", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
] as const;

const initialNodes: LogicNode[] = [
  { id: "1", type: "trigger", label: "User says", value: "hello, hi, hey", children: ["2"] },
  { id: "2", type: "condition", label: "Is first visit?", value: "session.visits === 1", children: ["3", "4"] },
  { id: "3", type: "response", label: "Welcome message", value: "Welcome! I'm your AI assistant. How can I help you today?", children: [] },
  { id: "4", type: "response", label: "Return greeting", value: "Welcome back! Great to see you again. What can I do for you?", children: [] },
  { id: "5", type: "trigger", label: "User asks about", value: "pricing, cost, price", children: ["6"] },
  { id: "6", type: "action", label: "Fetch pricing data", value: "api.getPricing()", children: ["7"] },
  { id: "7", type: "response", label: "Send pricing info", value: "Here are our current plans: {{pricing_data}}", children: [] },
];

const typeConfig = {
  trigger: { color: "text-accent", bg: "bg-accent/10", border: "border-accent/30", icon: Zap },
  condition: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", icon: GitBranch },
  action: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", icon: ArrowRight },
  response: { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", icon: MessageSquare },
};

export default function BotLogic() {
  const [nodes, setNodes] = useState<LogicNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<LogicNode | null>(null);
  const [addType, setAddType] = useState<"trigger" | "condition" | "action" | "response">("trigger");
  const [addLabel, setAddLabel] = useState("");
  const [addValue, setAddValue] = useState("");

  const addNode = () => {
    if (!addLabel.trim()) { toast.error("Node label is required"); return; }
    const node: LogicNode = {
      id: Date.now().toString(),
      type: addType,
      label: addLabel,
      value: addValue,
      children: [],
    };
    setNodes(prev => [...prev, node]);
    setAddLabel("");
    setAddValue("");
    toast.success("Logic node added");
  };

  const deleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id).map(n => ({
      ...n,
      children: n.children.filter(c => c !== id),
    })));
    if (selectedNode?.id === id) setSelectedNode(null);
    toast.success("Node removed");
  };

  const saveLogic = () => {
    toast.success("Logic flow saved successfully!");
  };

  const triggers = nodes.filter(n => n.type === "trigger");
  const conditions = nodes.filter(n => n.type === "condition");
  const actions = nodes.filter(n => n.type === "action");
  const responses = nodes.filter(n => n.type === "response");

  const columns = [
    { label: "Triggers", nodes: triggers, type: "trigger" },
    { label: "Conditions", nodes: conditions, type: "condition" },
    { label: "Actions", nodes: actions, type: "action" },
    { label: "Responses", nodes: responses, type: "response" },
  ] as const;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Bot Logic Engine</h1>
          <p className="text-muted-foreground text-sm mt-1">Define conversation flows and decision trees</p>
        </div>
        <Button onClick={saveLogic} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" /> Save Logic
        </Button>
      </div>

      {/* Add Node */}
      <div className="alter-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Add Logic Node</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Node Type</label>
            <select
              value={addType}
              onChange={e => setAddType(e.target.value as any)}
              className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground border border-border focus:outline-none focus:border-primary transition-colors"
            >
              {nodeTypes.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Label</label>
            <input
              type="text"
              value={addLabel}
              onChange={e => setAddLabel(e.target.value)}
              placeholder="e.g. User asks about pricing"
              className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Value / Expression</label>
            <input
              type="text"
              value={addValue}
              onChange={e => setAddValue(e.target.value)}
              placeholder="e.g. pricing, cost, plan"
              className="w-full bg-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addNode} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Node
            </Button>
          </div>
        </div>
      </div>

      {/* Logic Flow Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {columns.map(col => {
          const cfg = typeConfig[col.type];
          const Icon = cfg.icon;
          return (
            <div key={col.type} className="space-y-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${cfg.bg} border ${cfg.border}`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
                <span className={`text-xs font-semibold uppercase tracking-wide ${cfg.color}`}>{col.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{col.nodes.length}</span>
              </div>
              <div className="space-y-2">
                {col.nodes.map(node => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`alter-card p-4 cursor-pointer transition-all hover:border-primary/30 ${selectedNode?.id === node.id ? "border-primary/50" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{node.label}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-mono">{node.value}</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); deleteNode(node.id); }}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    {node.children.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <ArrowRight className="w-3 h-3" />
                        <span>{node.children.length} connection{node.children.length > 1 ? "s" : ""}</span>
                      </div>
                    )}
                  </div>
                ))}
                {col.nodes.length === 0 && (
                  <div className="alter-card p-4 text-center">
                    <p className="text-xs text-muted-foreground">No {col.label.toLowerCase()} yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Detail */}
      {selectedNode && (
        <div className="alter-card p-6 border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              Node Details — {selectedNode.label}
            </h2>
            <button onClick={() => setSelectedNode(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</p>
              <p className={`font-medium ${typeConfig[selectedNode.type].color}`}>{selectedNode.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Label</p>
              <p className="text-foreground">{selectedNode.label}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Value</p>
              <p className="text-foreground font-mono text-xs">{selectedNode.value}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
