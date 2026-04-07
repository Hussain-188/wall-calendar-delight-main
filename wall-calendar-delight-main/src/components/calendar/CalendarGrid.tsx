import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import DayCell from "./DayCell";
import { DAY_NAMES, getDaysInMonth, getFirstDayOfMonth, isSameDay, isInRange, CalendarNote } from "@/lib/calendarUtils";

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: CalendarNote[];
  onDayClick: (date: Date) => void;
}

const CalendarGrid = ({ year, month, rangeStart, rangeEnd, notes, onDayClick }: CalendarGridProps) => {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const noteDays = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => {
      if (n.type === "range" && n.startDate && n.endDate) {
        const s = new Date(n.startDate);
        const e = new Date(n.endDate);
        for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
          if (d.getMonth() === month && d.getFullYear() === year) {
            set.add(`${d.getDate()}`);
          }
        }
      } else if (n.type === "month" && n.month === month && n.year === year) {
        for (let i = 1; i <= daysInMonth; i++) set.add(`${i}`);
      }
    });
    return set;
  }, [notes, month, year, daysInMonth]);

  // Build weeks (rows)
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return (
    <motion.div
      key={`${year}-${month}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onMouseLeave={() => setHoverDate(null)}
    >
      {/* Table-style grid */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {DAY_NAMES.map((d, i) => (
              <th
                key={d}
                className={`text-[10px] md:text-xs font-heading font-bold py-1.5 text-center border-b border-border tracking-wider ${
                  i >= 5 ? "text-primary" : "text-foreground"
                }`}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => (
                <td
                  key={`${wi}-${di}`}
                  className="border-b border-border p-0"
                >
                  {day ? (
                    <DayCell
                      day={day}
                      month={month}
                      year={year}
                      isStart={rangeStart ? isSameDay(new Date(year, month, day), rangeStart) : false}
                      isEnd={rangeEnd ? isSameDay(new Date(year, month, day), rangeEnd) : false}
                      inRange={isInRange(new Date(year, month, day), rangeStart, rangeEnd)}
                      isHoverRange={
                        rangeStart && !rangeEnd && hoverDate
                          ? isInRange(new Date(year, month, day), rangeStart, hoverDate) &&
                            !isSameDay(new Date(year, month, day), rangeStart)
                          : false
                      }
                      hasNote={noteDays.has(`${day}`)}
                      onClick={() => onDayClick(new Date(year, month, day))}
                      onMouseEnter={() => setHoverDate(new Date(year, month, day))}
                    />
                  ) : (
                    <div className="w-full aspect-square" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default CalendarGrid;
