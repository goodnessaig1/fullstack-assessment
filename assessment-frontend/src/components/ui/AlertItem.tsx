export interface AlertItemProps {
  type: "danger" | "warning" | "success";
  title: string;
  text: string;
  meta: string;
  hasBorder?: boolean;
}

export function AlertItem({
  type,
  title,
  text,
  meta,
  hasBorder = true,
}: AlertItemProps) {
  const getDotColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]";
      case "warning":
        return "bg-yellow-400 shadow-[0_0_0_4px_rgba(250,204,21,0.1)]";
      case "success":
        return "bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.1)]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      className={`relative flex gap-4 p-4 rounded-lg bg-white ${hasBorder ? "border-b border-gray-100/80 pb-6" : ""}`}
    >
      <div className="relative z-10 flex-shrink-0 mt-1">
        <div className={`w-3.5 h-3.5 rounded-full ${getDotColor()}`} />
      </div>
      <div>
        <h4 className="text-[14px] leading-snug">
          <span className="font-bold text-gray-900">{title}</span>{" "}
          <span className="font-medium text-gray-700">{text}</span>
        </h4>
        <p className="text-[12px] text-gray-400 font-medium mt-1.5">{meta}</p>
      </div>
    </div>
  );
}
