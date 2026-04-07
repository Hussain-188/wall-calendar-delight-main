import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { isWeekend, isToday } from "@/lib/calendarUtils";

interface DayCellProps {
  day: number;
  month: number;
  year: number;
  isStart: boolean;
  isEnd: boolean;
  inRange: boolean;
  isHoverRange: boolean;
  hasNote: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const DayCell = ({
  day, month, year, isStart, isEnd, inRange, isHoverRange, hasNote, onClick, onMouseEnter,
}: DayCellProps) => {
  const weekend = isWeekend(year, month, day);
  const today = isToday(year, month, day);
  const selected = isStart || isEnd;

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative w-full aspect-square flex items-center justify-center text-xs md:text-sm font-body transition-colors duration-150",
        // weekend days in blue like reference
        weekend && !selected && "text-primary font-semibold",
        // weekday
        !weekend && !selected && "text-foreground",
        // in range
        (inRange || isHoverRange) && !selected && "bg-calendar-range",
        // selected
        selected && "bg-primary text-primary-foreground font-bold rounded",
        // today
        today && !selected && "font-bold underline underline-offset-2 decoration-primary decoration-2",
      )}
    >
      {day}
      {hasNote && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </motion.button>
  );
};

export default DayCell;
