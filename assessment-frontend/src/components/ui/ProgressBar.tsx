export interface ProgressBarProps {
  label: string;
  percentage: number;
  colorClass: string;
}

export function ProgressBar({
  label,
  percentage,
  colorClass,
}: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 flex-shrink-0">
        <span className="text-[13px] font-semibold text-gray-700">{label}</span>
      </div>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="w-8 text-right flex-shrink-0">
        <span className="text-[13px] font-bold text-gray-500">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
