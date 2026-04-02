"use client";
import { useParams } from "next/navigation";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { setores, funnelByEmpreendimento, formatCurrency, formatNumber, winLostByMonth, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Legend
} from "recharts";

const tooltipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };

export default function SetorPage() {
  const { slug } = useParams<{ slug: string }>();
  const setor = setores.find(s => s.slug === slug);

  if (!setor) {
    return <div className="flex items-center justify-center h-full"><p className="text-gray-400">Setor não encontrado</p></div>;
  }

  const empreendimentos = funnelByEmpreendimento.filter(e => {
    if (slug === "szi") return e.setor === "SZI";
    if (slug === "szs") return e.setor === "SZS";
    return false;
  });

  const winRate = setor.wonTotal > 0 ? ((setor.wonTotal / (setor.wonTotal + setor.lostTotal)) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-[#F06B5D] uppercase tracking-wider font-semibold">Setor</p>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">{setor.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">Pipeline #{setor.pipeline} | Dados 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Won 2026" value={formatNumber(setor.wonTotal)} subtitle="Jan-Mar/2026" highlight />
        <KpiCard label="Lost 2026" value={formatNumber(setor.lostTotal)} subtitle="Jan-Mar/2026" trend="down" trendValue={`${winRate}% win rate`} />
        <KpiCard label="Valor Total" value={setor.valorTotal > 0 ? formatCurrency(setor.valorTotal) : "N/A"} subtitle="Acumulado 2026" />
        <KpiCard label="Leads Abertos" value={formatNumber(setor.leadsAbertos)} subtitle="Snapshot atual" />
        <KpiCard label="Pipeline" value={`#${setor.pipeline}`} subtitle="Identificador" />
      </div>

      {setor.cpl > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-4">Métricas de Custo (2026)</h3>
          <div className="grid grid-cols-4 gap-4">
            <div><p className="text-xs text-gray-500">CPL</p><p className="text-xl font-bold text-[#F06B5D]">R$ {setor.cpl.toFixed(2)}</p></div>
            <div><p className="text-xs text-gray-500">CMQL</p><p className="text-xl font-bold text-blue-600">R$ {setor.cmql.toFixed(2)}</p></div>
            <div><p className="text-xs text-gray-500">CSQL</p><p className="text-xl font-bold text-yellow-600">R$ {setor.csql.toFixed(2)}</p></div>
            <div><p className="text-xs text-gray-500">COPP</p><p className="text-xl font-bold text-green-600">R$ {setor.copp.toFixed(2)}</p></div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Won vs Lost (Mensal)" subtitle="2025-2026">
          <ResponsiveContainer>
            <AreaChart data={winLostByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="won" fill="#bbf7d0" stroke="#22c55e" name="Won" />
              <Area type="monotone" dataKey="lost" fill="#fecaca" stroke="#ef4444" name="Lost" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {empreendimentos.length > 0 && (
          <ChartWrapper title="Empreendimentos (Deals Won)" subtitle={setor.nome}>
            <ResponsiveContainer>
              <BarChart data={empreendimentos.sort((a, b) => b.won - a.won)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
                <YAxis dataKey="nome" type="category" tick={{ fill: "#6b7280", fontSize: 9 }} width={130} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="won" fill="#F06B5D" radius={[0, 4, 4, 0]} name="Won" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        )}
      </div>

      {empreendimentos.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Funil por Empreendimento</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="text-left py-2 px-3">Empreendimento</th>
                  <th className="text-right py-2 px-3">Leads</th>
                  <th className="text-right py-2 px-3">MQL</th>
                  <th className="text-right py-2 px-3">SQL</th>
                  <th className="text-right py-2 px-3">OPP</th>
                  <th className="text-right py-2 px-3">Won</th>
                  <th className="text-right py-2 px-3">CPW</th>
                  <th className="text-right py-2 px-3">Lead→Won</th>
                </tr>
              </thead>
              <tbody>
                {empreendimentos.sort((a, b) => b.won - a.won).map((e) => (
                  <tr key={e.nome} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-[#0F1B2D] font-medium">{e.nome}</td>
                    <td className="text-right py-2 px-3 text-gray-600">{formatNumber(e.leads)}</td>
                    <td className="text-right py-2 px-3 text-gray-600">{formatNumber(e.mql)}</td>
                    <td className="text-right py-2 px-3 text-gray-600">{formatNumber(e.sql)}</td>
                    <td className="text-right py-2 px-3 text-gray-600">{formatNumber(e.opp)}</td>
                    <td className="text-right py-2 px-3 text-green-600 font-medium">{e.won}</td>
                    <td className={`text-right py-2 px-3 font-medium ${e.cpw > 3000 ? "text-red-600" : e.cpw > 1000 ? "text-yellow-600" : e.cpw > 0 ? "text-green-600" : "text-gray-400"}`}>
                      {e.cpw > 0 ? `R$ ${formatNumber(e.cpw)}` : "-"}
                    </td>
                    <td className="text-right py-2 px-3 text-[#F06B5D] font-medium">{((e.won / e.leads) * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
