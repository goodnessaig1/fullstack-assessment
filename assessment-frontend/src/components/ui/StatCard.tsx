import type { ReactNode } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  highlightText: ReactNode;
  highlightColorClass: string;
  barColorClass: string;
  iconSvg: ReactNode;
}

export function StatCard({
  title,
  value,
  highlightText,
  highlightColorClass,
  barColorClass,
  iconSvg,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] p-5 border border-gray-100 relative overflow-hidden">
      <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-1">
        {title}
      </h3>
      <div className="absolute top-4 right-4">{iconSvg}</div>
      <p className="text-4xl font-bold text-gray-900 mb-2 mt-2">{value}</p>
      <p
        className={`text-xs font-semibold flex items-center ${highlightColorClass}`}
      >
        {highlightText}
      </p>
      <div
        className={`absolute top-0 left-0 w-full h-1 ${barColorClass}`}
      ></div>
    </div>
  );
}
