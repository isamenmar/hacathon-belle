"use client";
import { ReactNode } from "react";

export default function ChartWrapper({ title, children, subtitle }: { title: string; children: ReactNode; subtitle?: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full h-[300px]">{children}</div>
    </div>
  );
}
