/* ALTER AI — BotVoice.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * Voice configuration: TTS, STT, voice selection, audio preview
 */

import { useState } from "react";
import { Mic, Volume2, Play, Pause, Settings, Zap, Bot, Sliders, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const voices = [
  { id: "alloy", name: "Alloy", gender: "Neutral", style: "Balanced", preview: "A clear, balanced voice suitable for most use cases." },
  { id: "echo", name: "Echo", gender: "Male", style: "Calm", preview: "A calm, measured voice with a professional tone." },
  { id: "fable", name: "Fable", gender: "Male", style: "Warm", preview: "A warm, engaging voice perfect for storytelling." },
  { id: "onyx", name: "Onyx", gender: "Male", style: "Deep", preview: "A deep, authoritative voice for executive presence." },
  { id: "nova", name: "Nova", gender: "Female", style: "Energetic", preview: "An energetic, upbeat voice for sales and marketing." },
  { id: "shimmer", name: "Shimmer", gender: "Female", style: "Soft", preview: "A soft, empathetic voice ideal for support bots." },
];

const bots = [
  { id: "1", name: "Sales Assistant", voiceEnabled: true, voice: "nova", sttEnabled: true },
  { id: "2", name: "Support Bot", voiceEnabled: true, voice: "shimmer", sttEnabled: false },
  { id: "3", name: "Lead Qualifier", voiceEnabled: false, voice: "alloy", sttEnabled: false },
  { id: "4", name: "Onboarding Guide", voiceEnabled: true, voice: "fable", sttEnabled: true },
];

export default function BotVoice() {
  const [selectedBot, setSelectedBot] = useState(bots[0]);
  const [selectedVoice, setSelectedVoice] = useState(selectedBot.voice);
  const [playing, setPlaying] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [sttEnabled, setSttEnabled] = useState(selectedBot.sttEnabled);
  const [voiceEnabled, setVoiceEnabled] = useState(selectedBot.voiceEnabled);

  const playPreview = (voiceId: string) => {
    if (playing === voiceId) {
      setPlaying(null);
      return;
    }
    setPlaying(voiceId);
    toast.info(`Playing preview for ${voices.find(v => v.id === voiceId)?.name}...`);
    setTimeout(() => setPlaying(null), 3000);
  };

  const saveConfig = () => {
    toast.success(`Voice config saved for ${selectedBot.name}!`);
  };

  const currentVoice = voices.find(v => v.id === selectedVoice);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Bot Voice Manager</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure text-to-speech and speech-to-text for your bots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bot Selection + Settings */}
        <div className="space-y-5">
          {/* Bot Selector */}
          <div className="alter-card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Select Bot</h2>
            <div className="space-y-2">
              {bots.map(bot => (
                <button
                  key={bot.id}
                  onClick={() => {
                    setSelectedBot(bot);
                    setSelectedVoice(bot.voice);
                    setSttEnabled(bot.sttEnabled);
                    setVoiceEnabled(bot.voiceEnabled);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedBot.id === bot.id
                      ? "bg-primary/10 border border-primary/30 text-foreground"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-medium">{bot.name}</span>
                  {bot.voiceEnabled && <Mic className="w-3.5 h-3.5 text-accent shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Settings */}
          <div className="alter-card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Sliders className="w-4 h-4 text-primary" />
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Voice Settings</h2>
            </div>

            <div className="space-y-5">
              {/* TTS Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Text-to-Speech</p>
                  <p className="text-xs text-muted-foreground">Bot speaks responses aloud</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={voiceEnabled} onChange={e => setVoiceEnabled(e.target.checked)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                </label>
              </div>

              {/* STT Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Speech-to-Text</p>
                  <p className="text-xs text-muted-foreground">Users can speak to the bot</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={sttEnabled} onChange={e => setSttEnabled(e.target.checked)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                </label>
              </div>

              {/* Speed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Speed</p>
                  <span className="text-xs text-muted-foreground">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range" min="0.5" max="2.0" step="0.1"
                  value={speed}
                  onChange={e => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.5x</span><span>2.0x</span>
                </div>
              </div>

              {/* Pitch */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Pitch</p>
                  <span className="text-xs text-muted-foreground">{pitch.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="0.5" max="1.5" step="0.1"
                  value={pitch}
                  onChange={e => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span><span>High</span>
                </div>
              </div>
            </div>

            <Button onClick={saveConfig} className="w-full mt-5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Check className="w-4 h-4 mr-2" /> Save Configuration
            </Button>
          </div>
        </div>

        {/* Right: Voice Selection */}
        <div className="lg:col-span-2 space-y-5">
          {/* Current Voice Preview */}
          {currentVoice && (
            <div className="alter-card p-6 border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Volume2 className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>{currentVoice.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{currentVoice.style}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{currentVoice.gender}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{currentVoice.preview}</p>
                </div>
                <Button
                  onClick={() => playPreview(currentVoice.id)}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {playing === currentVoice.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

          {/* Voice Grid */}
          <div className="alter-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Available Voices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {voices.map(voice => (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer transition-all border ${
                    selectedVoice === voice.id
                      ? "border-primary/50 bg-primary/10"
                      : "border-transparent hover:border-border hover:bg-secondary"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedVoice === voice.id ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <Mic className={`w-4 h-4 ${selectedVoice === voice.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${selectedVoice === voice.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {voice.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{voice.gender} · {voice.style}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); playPreview(voice.id); }}
                    className="p-1.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {playing === voice.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STT Languages */}
          <div className="alter-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Speech Recognition Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["English", "Spanish", "French", "German", "Japanese", "Portuguese", "Chinese", "Arabic"].map(lang => (
                <div key={lang} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-sm text-muted-foreground">
                  <Check className="w-3 h-3 text-accent shrink-0" />
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
