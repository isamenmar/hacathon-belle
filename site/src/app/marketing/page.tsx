"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import {
  facebookCampaigns2026, rdConversionsByMonth, rdTop2026,
  metricasComerciais, funnelByChannel, formatCurrency, formatNumber, CHART_COLORS
} from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, Legend
} from "recharts";

const totalSpend = facebookCampaigns2026.reduce((s, c) => s + c.gasto, 0);
const totalClicks = facebookCampaigns2026.reduce((s, c) => s + c.cliques, 0);
const totalImpressions = facebookCampaigns2026.reduce((s, c) => s + c.impressoes, 0);
const mkt = funnelByChannel.find(c => c.canal === "MKT")!;

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Marketing & Campanhas</h1>
        <p className="text-sm text-gray-500 mt-1">Performance de campanhas Facebook Ads + RD Station | 2024-2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Investimento Total (FB)" value={formatCurrency(totalSpend)} subtitle="2026 (Jan-Mar)" highlight />
        <KpiCard label="Impressões" value={`${(totalImpressions / 1e6).toFixed(1)}M`} subtitle="2026 (Jan-Mar)" />
        <KpiCard label="Cliques" value={formatNumber(totalClicks)} subtitle="2026 (Jan-Mar)" />
        <KpiCard label="CPL (MKT)" value={`R$ ${metricasComerciais.cpl}`} subtitle="Histórico canal MKT" trend="neutral" trendValue="Canal MKT" />
        <KpiCard label="CPW (MKT)" value={`R$ ${metricasComerciais.cpw}`} subtitle="Histórico canal MKT" trend="neutral" trendValue="Custo por venda" />
      </div>

      <div className="bg-[#FFF5F3] border border-[#F06B5D]/20 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[#F06B5D] mb-2">Insights de Marketing</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>Facebook Ads gera 65%+ de todas as conversões no RD Station (146.922 conversões)</li>
          <li>Campanhas CBO regionais (RS/SC/PR) têm CTR superior (2,06-2,26%) vs nacionais (1,0-1,6%)</li>
          <li>Caraguá Spot tem melhor CPC (R$ 1,73) e maior CTR (3,21%)</li>
          <li>Volume de conversões cresceu 173% de 2024 para 2026</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Conversões RD Station por Trimestre" subtitle="2024-2026">
          <ResponsiveContainer>
            <LineChart data={rdConversionsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
              <Line type="monotone" dataKey="conversoes" stroke="#F06B5D" strokeWidth={2} name="Conversões" dot={{ fill: "#F06B5D" }} />
              <Line type="monotone" dataKey="contatos" stroke="#22c55e" strokeWidth={2} name="Contatos Únicos" dot={{ fill: "#22c55e" }} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Top Empreendimentos por Conversões (RD Station)" subtitle="Total histórico">
          <ResponsiveContainer>
            <BarChart data={rdTop2026.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="nome" type="category" tick={{ fill: "#6b7280", fontSize: 9 }} width={130} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
              <Bar dataKey="conversoes" fill="#F06B5D" radius={[0, 4, 4, 0]} name="Conversões" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Campanhas Facebook Ads (SZI) - Top por Investimento</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">Campanha</th>
                <th className="text-right py-2 px-3">Gasto (R$)</th>
                <th className="text-right py-2 px-3">Impressões</th>
                <th className="text-right py-2 px-3">Cliques</th>
                <th className="text-right py-2 px-3">CPC (R$)</th>
                <th className="text-right py-2 px-3">CTR (%)</th>
              </tr>
            </thead>
            <tbody>
              {facebookCampaigns2026.map((c) => (
                <tr key={c.nome} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700 max-w-[200px] truncate">{c.nome}</td>
                  <td className="text-right py-2 px-3 text-gray-500">{formatCurrency(c.gasto)}</td>
                  <td className="text-right py-2 px-3 text-gray-500">{(c.impressoes / 1e6).toFixed(1)}M</td>
                  <td className="text-right py-2 px-3 text-gray-500">{formatNumber(c.cliques)}</td>
                  <td className="text-right py-2 px-3 text-gray-500">R$ {c.cpc.toFixed(2)}</td>
                  <td className={`text-right py-2 px-3 font-medium ${c.ctr >= 2 ? "text-green-600" : c.ctr >= 1.5 ? "text-yellow-600" : "text-red-500"}`}>
                    {c.ctr.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Funil MKT vs PARC</h3>
        <div className="grid grid-cols-2 gap-6">
          {funnelByChannel.filter(c => c.canal !== "Outros").map((ch) => (
            <div key={ch.canal}>
              <h4 className="text-sm font-medium text-gray-500 mb-3">{ch.canal === "MKT" ? "Marketing" : "Parceiros"}</h4>
              <div className="space-y-2">
                {[
                  { label: "Lead → MQL", value: ((ch.mql / ch.leads) * 100).toFixed(1) },
                  { label: "MQL → SQL", value: ((ch.sql / ch.mql) * 100).toFixed(1) },
                  { label: "SQL → OPP", value: ((ch.opp / ch.sql) * 100).toFixed(1) },
                  { label: "OPP → Won", value: ((ch.won / ch.opp) * 100).toFixed(1) },
                ].map((step) => (
                  <div key={step.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{step.label}</span>
                      <span className="text-gray-700">{step.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full">
                      <div className="h-1.5 bg-[#F06B5D] rounded-full" style={{ width: `${step.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
