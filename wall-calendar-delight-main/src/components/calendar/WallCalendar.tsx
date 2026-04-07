import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { MONTH_NAMES, CalendarNote, loadNotes, saveNotes } from "@/lib/calendarUtils";
import heroImage from "@/assets/calendar-january.jpg";

const WallCalendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [notes, setNotes] = useState<CalendarNote[]>(loadNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const goPrev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const goNext = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const note: CalendarNote = {
      id: crypto.randomUUID(),
      text: noteText.trim(),
      type: "month",
      month,
      year,
      createdAt: new Date().toISOString(),
    };
    const updated = [...notes, note];
    setNotes(updated);
    saveNotes(updated);
    setNoteText("");
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  const monthNotes = notes.filter(n => n.type === "month" && n.month === month && n.year === year);

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const mondayFirstOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const result: { day: number; currentMonth: boolean }[] = [];

    for (let i = mondayFirstOffset - 1; i >= 0; i--) {
      result.push({ day: daysInPrevMonth - i, currentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ day: d, currentMonth: true });
    }

    let nextMonthDay = 1;
    while (result.length < 42) {
      result.push({ day: nextMonthDay++, currentMonth: false });
    }

    return result;
  }, [year, month]);

  return (
    <div className="min-h-screen bg-[#ececec] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-[420px] sm:w-[500px]"
      >
        {/* Top hanger */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30">
          <svg width="96" height="68" viewBox="0 0 96 68" className="opacity-80">
            <line x1="28" y1="67" x2="48" y2="22" stroke="#666" strokeWidth="1.1" />
            <line x1="68" y1="67" x2="48" y2="22" stroke="#666" strokeWidth="1.1" />
            <path d="M48 8 C45 8,43 10,43 13 C43 16,45 18,48 18 C51 18,53 16,53 13" fill="none" stroke="#666" strokeWidth="1.3" />
            <circle cx="48" cy="20" r="2.2" fill="#777" />
          </svg>
        </div>

        {/* Spiral binding */}
        <div className="absolute -top-[11px] left-0 right-0 z-20 flex justify-center">
          <svg
            viewBox="0 0 840 24"
            className="w-[96%] h-[24px]"
            style={{ filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,0.3))" }}
          >
            {Array.from({ length: 55 }, (_, i) => {
              const cx = i * 15.2 + 7.6;
              return (
                <g key={i}>
                  <ellipse
                    cx={cx}
                    cy={12}
                    rx={3.8}
                    ry={10.5}
                    fill="none"
                    stroke="#3a3a3a"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx={cx}
                    cy={12}
                    rx={2.2}
                    ry={9}
                    fill="none"
                    stroke="#787878"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Calendar content */}
        <div
          className="bg-white overflow-hidden relative z-10"
          style={{
            boxShadow: "0 28px 50px -18px rgba(0,0,0,0.35), 0 10px 18px -10px rgba(0,0,0,0.25)",
          }}
        >
          {/* Hero Image Section */}
          <div className="relative">
            <motion.img
              key={month}
              initial={{ opacity: 0.92 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={heroImage}
              alt="Calendar hero"
              className="w-full h-[320px] sm:h-[360px] object-cover"
              width={1200}
              height={800}
            />
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 500 120"
              preserveAspectRatio="none"
              style={{ height: "110px" }}
            >
              <path
                d="M0 70 L200 120 L500 18 L500 120 L0 120 Z"
                fill="#36a3ef"
              />
              <path d="M0 120 L135 120 L0 78 Z" fill="#ffffff" />
            </svg>

            <div className="absolute right-7 bottom-7 text-right z-10 leading-none">
              <p className="text-white font-heading font-medium text-[30px] tracking-tight">{year}</p>
              <p className="text-white font-heading font-extrabold text-[34px] uppercase tracking-tight">
                {MONTH_NAMES[month]}
              </p>
            </div>

            {/* Month navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-md"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-md"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Notes and Calendar Grid */}
          <div className="px-5 pb-5 pt-4">
            <div className="grid grid-cols-[1.1fr_1.2fr] gap-5 items-start">
              {/* Notes Section */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-[#4a4a4a]">Notes</p>
                  <button
                    onClick={() => setIsAddingNote(!isAddingNote)}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {isAddingNote ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {isAddingNote && (
                  <div className="mb-2">
                    <input
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                      placeholder="Add note..."
                      className="w-full text-[11px] px-2 py-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-400"
                      autoFocus
                    />
                  </div>
                )}

                {monthNotes.slice(0, 10).map((note) => (
                  <div
                    key={note.id}
                    className="h-[17px] border-b border-[#d5d5d5] flex items-center justify-between group"
                  >
                    <span className="text-[10px] text-gray-700 truncate">{note.text}</span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 text-[11px] ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {Array.from({ length: Math.max(0, 10 - monthNotes.length) }, (_, i) => (
                  <div key={`empty-${i}`} className="h-[17px] border-b border-[#d5d5d5]" />
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="min-w-0">
                <div className="grid grid-cols-7 text-[10px] mb-2">
                  {dayNames.map((name, idx) => (
                    <div
                      key={name}
                      className={`text-center font-semibold ${idx >= 5 ? "text-[#48a8ee]" : "text-[#525252]"}`}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-[2px]">
                  {cells.map((cell, index) => (
                    <button
                      key={`${index}-${cell.day}`}
                      onClick={index < 7 ? goPrev : index > 34 ? goNext : undefined}
                      className={`h-[18px] text-center text-[12px] leading-[18px] font-semibold ${
                        cell.currentMonth ? "text-[#252525]" : "text-[#c6c6c6]"
                      } ${index % 7 >= 5 && cell.currentMonth ? "text-[#4faeed]" : ""}`}
                    >
                      {cell.day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WallCalendar;
