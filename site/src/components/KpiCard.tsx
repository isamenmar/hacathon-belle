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
      ? "bg-gradient-to-br from-indigo-950 to-gray-900 border border-indigo-800 rounded-xl p-5"
      : "bg-gray-900 border border-gray-800 rounded-xl p-5"
    }>
      <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</p>
      <p className="text-2xl lg:text-3xl font-bold text-white">{value}</p>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {trendValue && (
            <span className={
              trend === "up"
                ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-400"
                : trend === "down"
                ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/50 text-red-400"
                : "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-900/50 text-yellow-400"
            }>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          )}
          {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
