"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { teamPerformers, topSellers, formatCurrency, formatNumber } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

const totalActivities = teamPerformers.reduce((s, p) => s + p.total, 0);
const totalReunions = teamPerformers.reduce((s, p) => s + p.reunioes, 0);
const totalContratos = teamPerformers.reduce((s, p) => s + p.contratos, 0);
const humanPerformers = teamPerformers.filter(p => !p.nome.includes("Mia") && !p.nome.includes("Automação"));

const top5Radar = humanPerformers.slice(0, 5).map(p => ({
  nome: p.nome.split(" ")[0],
  calls: Math.round(p.calls / 100),
  whatsapp: Math.round(p.whatsapp / 100),
  reunioes: p.reunioes,
  mensagens: Math.round(p.mensagens / 100),
}));

export default function TimePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance do Time</h1>
        <p className="text-sm text-gray-500 mt-1">Atividades e vendas por analista | 2025-2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Atividades" value={formatNumber(totalActivities)} subtitle="2025+" highlight />
        <KpiCard label="Reuniões" value={formatNumber(totalReunions)} />
        <KpiCard label="Contratos" value={formatNumber(totalContratos)} />
        <KpiCard label="Analistas Ativos" value={String(teamPerformers.length)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Top 10 por Volume de Atividades" subtitle="2025+">
          <ResponsiveContainer>
            <BarChart data={teamPerformers.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis dataKey="nome" type="category" tick={{ fill: "#9ca3af", fontSize: 9 }} width={130} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
              <Bar dataKey="calls" stackId="a" fill="#3b82f6" name="Calls" />
              <Bar dataKey="whatsapp" stackId="a" fill="#22c55e" name="WhatsApp" />
              <Bar dataKey="mensagens" stackId="a" fill="#eab308" name="Mensagens" />
              <Bar dataKey="reunioes" stackId="a" fill="#6366f1" name="Reuniões" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Perfil de Canal - Top 5 Humanos" subtitle="Escala: calls e whatsapp /100">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius={90} data={top5Radar}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="nome" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: "#6b7280", fontSize: 8 }} />
              <Radar name="Calls" dataKey="calls" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Radar name="WhatsApp" dataKey="whatsapp" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              <Radar name="Reuniões" dataKey="reunioes" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Ranking de Atividades (2025+)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Analista</th>
                <th className="text-right py-2 px-3">Total</th>
                <th className="text-right py-2 px-3">Calls</th>
                <th className="text-right py-2 px-3">WhatsApp</th>
                <th className="text-right py-2 px-3">Msgs</th>
                <th className="text-right py-2 px-3">Reuniões</th>
                <th className="text-right py-2 px-3">Contratos</th>
                <th className="text-right py-2 px-3">No-Shows</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformers.map((p, i) => (
                <tr key={p.nome} className={`border-b border-gray-800/50 hover:bg-gray-800/30 ${p.nome.includes("Mia") ? "bg-purple-950/20" : ""}`}>
                  <td className="py-2 px-3 text-gray-600">{i + 1}</td>
                  <td className="py-2 px-3 text-gray-300 font-medium">
                    {p.nome}
                    {p.nome.includes("Mia") && <span className="ml-1.5 badge-yellow">IA</span>}
                    {p.nome.includes("Automação") && <span className="ml-1.5 badge-yellow">BOT</span>}
                  </td>
                  <td className="text-right py-2 px-3 text-white font-medium">{formatNumber(p.total)}</td>
                  <td className="text-right py-2 px-3 text-blue-400">{formatNumber(p.calls)}</td>
                  <td className="text-right py-2 px-3 text-green-400">{formatNumber(p.whatsapp)}</td>
                  <td className="text-right py-2 px-3 text-yellow-400">{formatNumber(p.mensagens)}</td>
                  <td className="text-right py-2 px-3 text-indigo-400">{formatNumber(p.reunioes)}</td>
                  <td className="text-right py-2 px-3 text-emerald-400">{p.contratos}</td>
                  <td className={`text-right py-2 px-3 ${p.noShows > 500 ? "text-red-400" : "text-gray-500"}`}>{p.noShows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Vendedores por Valor (2024+)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Vendedor</th>
                <th className="text-right py-2 px-3">Deals Won</th>
                <th className="text-right py-2 px-3">Valor Total</th>
                <th className="text-right py-2 px-3">Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.filter(s => s.valorTotal > 0).sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 12).map((s, i) => (
                <tr key={s.nome} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-gray-600">{i + 1}</td>
                  <td className="py-2 px-3 text-gray-300 font-medium">{s.nome}</td>
                  <td className="text-right py-2 px-3 text-gray-400">{s.dealsWon}</td>
                  <td className="text-right py-2 px-3 text-green-400 font-medium">{formatCurrency(s.valorTotal)}</td>
                  <td className="text-right py-2 px-3 text-indigo-400">{formatCurrency(s.ticketMedio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
