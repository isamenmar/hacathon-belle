"use client";
import { useParams } from "next/navigation";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { setores, funnelByEmpreendimento, leadsAbertos, formatCurrency, formatNumber, winLostByMonth } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Legend
} from "recharts";

export default function SetorPage() {
  const { slug } = useParams<{ slug: string }>();
  const setor = setores.find(s => s.slug === slug);

  if (!setor) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Setor não encontrado</p>
      </div>
    );
  }

  const la = leadsAbertos.find(l => l.setor === (
    slug === "szi" ? "SZI" : slug === "szs" ? "SZS" : slug === "parceiros" ? "Parceiros" : slug === "marketplace" ? "Marketplace" : "Expansão"
  ));

  const empreendimentos = slug === "szi"
    ? funnelByEmpreendimento.filter(e => ["Marista 144 Spot", "Urubici Spot II", "Vistas de Anitá 2", "Batel Spot", "Vale do Ouro", "Morro das Pedras Spot", "Imbassaí Spot", "Salvador Spot", "Trancoso Spot", "Caraguá Spot", "Jurerê Spot II"].includes(e.nome))
    : slug === "szs"
    ? funnelByEmpreendimento.filter(e => ["Santinho Spot", "Meireles Spot", "Bonito Spot", "Santo Antônio Spot"].includes(e.nome))
    : funnelByEmpreendimento.slice(0, 5);

  const winRate = setor.wonTotal > 0 ? ((setor.wonTotal / (setor.wonTotal + 10000)) * 100).toFixed(1) : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-indigo-400 uppercase tracking-wider">Setor</p>
        <h1 className="text-2xl font-bold">{setor.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">Pipeline #{setor.pipeline} | Dados até Mar/2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Deals Won" value={formatNumber(setor.wonTotal)} highlight />
        <KpiCard label="Valor Total" value={setor.valorTotal > 0 ? formatCurrency(setor.valorTotal) : "N/A"} />
        <KpiCard label="Leads Abertos" value={la ? formatNumber(la.leads) : "N/A"} subtitle="Snapshot atual" />
        <KpiCard label="Pipeline ID" value={`#${setor.pipeline}`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Won vs Lost (Mensal)" subtitle="2025-2026">
          <ResponsiveContainer>
            <AreaChart data={winLostByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="mes" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
              <Area type="monotone" dataKey="won" fill="#22c55e33" stroke="#22c55e" name="Won" />
              <Area type="monotone" dataKey="lost" fill="#ef444433" stroke="#ef4444" name="Lost" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {empreendimentos.length > 0 && (
          <ChartWrapper title="Empreendimentos (Deals Won)" subtitle={setor.nome}>
            <ResponsiveContainer>
              <BarChart data={empreendimentos.sort((a, b) => b.won - a.won)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <YAxis dataKey="nome" type="category" tick={{ fill: "#9ca3af", fontSize: 9 }} width={130} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
                <Bar dataKey="won" fill="#6366f1" radius={[0, 4, 4, 0]} name="Won" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        )}
      </div>

      {empreendimentos.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Funil por Empreendimento</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
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
                  <tr key={e.nome} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-3 text-gray-300 font-medium">{e.nome}</td>
                    <td className="text-right py-2 px-3 text-gray-400">{formatNumber(e.leads)}</td>
                    <td className="text-right py-2 px-3 text-gray-400">{formatNumber(e.mql)}</td>
                    <td className="text-right py-2 px-3 text-gray-400">{formatNumber(e.sql)}</td>
                    <td className="text-right py-2 px-3 text-gray-400">{formatNumber(e.opp)}</td>
                    <td className="text-right py-2 px-3 text-green-400 font-medium">{e.won}</td>
                    <td className={`text-right py-2 px-3 font-medium ${e.cpw > 3000 ? "text-red-400" : e.cpw > 1000 ? "text-yellow-400" : e.cpw > 0 ? "text-green-400" : "text-gray-600"}`}>
                      {e.cpw > 0 ? `R$ ${formatNumber(e.cpw)}` : "-"}
                    </td>
                    <td className="text-right py-2 px-3 text-indigo-400">{((e.won / e.leads) * 100).toFixed(2)}%</td>
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
