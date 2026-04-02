"use client";
import { ReactNode } from "react";

export default function ChartWrapper({ title, children, subtitle }: { title: string; children: ReactNode; subtitle?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#0F1B2D]">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full h-[300px]">{children}</div>
    </div>
  );
}
