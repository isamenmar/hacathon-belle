interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  highlight?: boolean;
}

export default function KpiCard({ label, value, subtitle, trend, trendValue, highlight }: KpiCardProps) {
  return (
    <div className={highlight
      ? "bg-gradient-to-br from-[#0F1B2D] to-[#1a2d47] rounded-xl p-5 text-white"
      : "bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
    }>
      <p className={`text-xs uppercase tracking-wider mt-1 ${highlight ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
      <p className={`text-2xl lg:text-3xl font-bold ${highlight ? "text-white" : "text-[#0F1B2D]"}`}>{value}</p>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {trendValue && (
            <span className={
              trend === "up"
                ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700"
                : trend === "down"
                ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700"
                : "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700"
            }>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          )}
          {subtitle && <span className={`text-xs ${highlight ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
