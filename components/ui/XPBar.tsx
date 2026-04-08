'use client';

interface XPBarProps {
  current: number;  // 0 – total
  total: number;
  label?: string;
}

export default function XPBar({ current, total, label }: XPBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-xs font-semibold text-txt3 shrink-0">{label}</span>}
      <div className="flex-1 bg-brd rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full progress-shimmer transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-txt3 shrink-0">{current}/{total}</span>
    </div>
  );
}
