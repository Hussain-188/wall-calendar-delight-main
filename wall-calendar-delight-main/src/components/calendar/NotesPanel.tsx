import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { CalendarNote, MONTH_NAMES } from "@/lib/calendarUtils";

interface NotesPanelProps {
  notes: CalendarNote[];
  year: number;
  month: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onAddNote: (text: string, type: "month" | "range") => void;
  onDeleteNote: (id: string) => void;
}

const NotesPanel = ({ notes, year, month, rangeStart, rangeEnd, onAddNote, onDeleteNote }: NotesPanelProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");
  const hasRange = rangeStart && rangeEnd;

  const relevantNotes = notes.filter((n) => {
    if (n.type === "month") return n.year === year && n.month === month;
    return true;
  });

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddNote(text.trim(), hasRange ? "range" : "month");
    setText("");
    setIsAdding(false);
  };

  return (
    <div>
      {/* Notes header - matching reference style */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] md:text-xs font-heading font-semibold text-muted-foreground tracking-wide">
          Notes
        </span>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {isAdding ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </button>
      </div>

      {/* Add note input */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={hasRange ? "Range note…" : "Month note…"}
              className="w-full text-[10px] px-1.5 py-1 border-b border-input bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              autoFocus
            />
            {hasRange && (
              <span className="text-[8px] text-primary mt-0.5 block">Range selected</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ruled lines with notes */}
      <div className="space-y-0">
        {/* Show notes on lines */}
        {relevantNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 border-b border-border py-1 group"
          >
            <span className="text-[9px] md:text-[10px] text-foreground truncate flex-1 leading-tight">
              {note.text}
            </span>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity shrink-0"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </button>
          </motion.div>
        ))}
        {/* Empty ruled lines */}
        {Array.from({ length: Math.max(0, 6 - relevantNotes.length) }, (_, i) => (
          <div key={`line-${i}`} className="border-b border-border py-2" />
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;
