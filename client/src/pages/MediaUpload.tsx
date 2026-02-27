/* ALTER AI — MediaUpload.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * S3-backed media upload with drag-and-drop, file management, bot linking
 */

import { useState, useRef } from "react";
import { Upload, File, Image, FileText, Music, Trash2, Link2, Eye, Download, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "document" | "audio" | "video";
  size: string;
  uploaded: string;
  linkedBot: string | null;
  url: string;
}

const initialFiles: MediaFile[] = [
  { id: "1", name: "product-catalog.pdf", type: "document", size: "2.4 MB", uploaded: "Feb 20, 2026", linkedBot: "Sales Assistant", url: "#" },
  { id: "2", name: "company-logo.png", type: "image", size: "156 KB", uploaded: "Feb 18, 2026", linkedBot: "Support Bot", url: "#" },
  { id: "3", name: "onboarding-guide.pdf", type: "document", size: "4.1 MB", uploaded: "Feb 15, 2026", linkedBot: "Onboarding Guide", url: "#" },
  { id: "4", name: "welcome-audio.mp3", type: "audio", size: "3.2 MB", uploaded: "Feb 10, 2026", linkedBot: "Sales Assistant", url: "#" },
  { id: "5", name: "faq-database.txt", type: "document", size: "89 KB", uploaded: "Feb 5, 2026", linkedBot: null, url: "#" },
  { id: "6", name: "team-photo.jpg", type: "image", size: "1.8 MB", uploaded: "Jan 28, 2026", linkedBot: null, url: "#" },
];

const bots = ["Sales Assistant", "Support Bot", "Lead Qualifier", "Onboarding Guide"];

const typeIcon = {
  image: Image,
  document: FileText,
  audio: Music,
  video: File,
};

const typeColor = {
  image: "text-primary bg-primary/10",
  document: "text-accent bg-accent/10",
  audio: "text-green-400 bg-green-400/10",
  video: "text-yellow-400 bg-yellow-400/10",
};

export default function MediaUpload() {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState<"all" | "image" | "document" | "audio">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = files.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || f.type === filter;
    return matchSearch && matchFilter;
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const processed: MediaFile[] = newFiles.map(f => ({
      id: Date.now().toString() + Math.random(),
      name: f.name,
      type: f.type.startsWith("image") ? "image"
        : f.type.startsWith("audio") ? "audio"
        : "document",
      size: f.size > 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`,
      uploaded: "Just now",
      linkedBot: null,
      url: "#",
    }));
    setFiles(prev => [...processed, ...prev]);
    toast.success(`${newFiles.length} file${newFiles.length > 1 ? "s" : ""} uploaded!`);
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast.success("File deleted");
  };

  const linkBot = (fileId: string, botName: string) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, linkedBot: botName } : f));
    toast.success(`Linked to ${botName}`);
  };

  const totalSize = files.reduce((acc, f) => {
    const num = parseFloat(f.size);
    const unit = f.size.includes("MB") ? 1 : 0.001;
    return acc + num * unit;
  }, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Media Upload</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload files and link them to your bots</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Storage Used</p>
          <p className="text-sm font-semibold text-foreground">{totalSize.toFixed(1)} MB / 10 GB</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        }`}
      >
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput} />
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Upload className={`w-6 h-6 ${dragging ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          {dragging ? "Drop files here" : "Drag & drop files, or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground">PDF, images, audio, video — up to 50MB each</p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-input rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "image", "document", "audio"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(file => {
          const Icon = typeIcon[file.type];
          const colorClass = typeColor[file.type];
          return (
            <div key={file.id} className="alter-card p-4 flex flex-col gap-3 hover:border-primary/20 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size} · {file.uploaded}</p>
                </div>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bot Link */}
              <div className="flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                {file.linkedBot ? (
                  <span className="text-xs text-primary font-medium">{file.linkedBot}</span>
                ) : (
                  <select
                    onChange={e => e.target.value && linkBot(file.id, e.target.value)}
                    className="flex-1 bg-input rounded px-2 py-1 text-xs text-muted-foreground border border-border focus:outline-none focus:border-primary transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>Link to a bot...</option>
                    {bots.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-border">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="w-3 h-3" /> Preview
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Upload className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-sm">No files found. Upload your first file!</p>
          </div>
        )}
      </div>
    </div>
  );
}
