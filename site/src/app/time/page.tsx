"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { teamPerformers2026, topSellers2026, formatCurrency, formatNumber, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

const ts = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };
const totalActivities = teamPerformers2026.reduce((s, p) => s + p.total, 0);
const totalReunions = teamPerformers2026.reduce((s, p) => s + p.reunioes, 0);
const totalContratos = teamPerformers2026.reduce((s, p) => s + p.contratos, 0);
const humanPerformers = teamPerformers2026.filter(p => !p.nome.includes("Mia") && !p.nome.includes("Automação"));

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1B2D]">Performance do Time</h1>
          <p className="text-sm text-gray-500 mt-1">Atividades e vendas por analista | Exclusivamente 2026</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F06B5D] text-white">
          2026
        </span>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
        <p className="text-xs text-blue-700">
          <strong>Periodo:</strong> Jan-Mar 2026 (dados exclusivos). Nenhum dado de periodos anteriores esta sendo exibido.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Atividades 2026" value={formatNumber(totalActivities)} subtitle="Jan-Mar/2026" highlight />
        <KpiCard label="Reuniões 2026" value={formatNumber(totalReunions)} subtitle="2026 (Jan-Mar)" />
        <KpiCard label="Contratos 2026" value={formatNumber(totalContratos)} subtitle="2026 (Jan-Mar)" />
        <KpiCard label="Analistas Ativos" value={String(teamPerformers2026.length)} subtitle="2026 (Jan-Mar)" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Top 10 por Volume de Atividades (2026)" subtitle="Jan-Mar 2026">
          <ResponsiveContainer>
            <BarChart data={teamPerformers2026.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="nome" type="category" tick={{ fill: "#6b7280", fontSize: 9 }} width={130} />
              <Tooltip contentStyle={ts} />
              <Bar dataKey="calls" stackId="a" fill="#3b82f6" name="Calls" />
              <Bar dataKey="whatsapp" stackId="a" fill="#22c55e" name="WhatsApp" />
              <Bar dataKey="mensagens" stackId="a" fill="#eab308" name="Mensagens" />
              <Bar dataKey="reunioes" stackId="a" fill="#F06B5D" name="Reuniões" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Perfil de Canal - Top 5 Humanos (2026)" subtitle="Escala: calls e whatsapp /100">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius={90} data={top5Radar}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="nome" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: "#9ca3af", fontSize: 8 }} />
              <Radar name="Calls" dataKey="calls" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Radar name="WhatsApp" dataKey="whatsapp" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              <Radar name="Reuniões" dataKey="reunioes" stroke="#F06B5D" fill="#F06B5D" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Ranking de Atividades (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Analista</th>
                <th className="text-right py-2 px-3">Total</th>
                <th className="text-right py-2 px-3">Calls</th>
                <th className="text-right py-2 px-3">WhatsApp</th>
                <th className="text-right py-2 px-3">Mensagens</th>
                <th className="text-right py-2 px-3">Reuniões</th>
                <th className="text-right py-2 px-3">Contratos</th>
                <th className="text-right py-2 px-3">No-Shows</th>
                <th className="text-right py-2 px-3">Concluídas</th>
                <th className="text-right py-2 px-3">% Conclusão</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformers2026.map((p, i) => {
                const pctConcl = p.total > 0 ? Math.round((p.concluidas / p.total) * 100) : 0;
                return (
                  <tr key={p.nome} className={`border-b border-gray-100 hover:bg-gray-50 ${p.nome.includes("Mia") ? "bg-[#FFF5F3]" : ""}`}>
                    <td className="py-2 px-3 text-gray-400 font-bold">{i + 1}</td>
                    <td className="py-2 px-3 text-[#0F1B2D] font-medium">
                      {p.nome}
                      {p.nome.includes("Mia") && <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F06B5D]/10 text-[#F06B5D]">IA</span>}
                      {p.nome.includes("Automação") && <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-700">BOT</span>}
                    </td>
                    <td className="text-right py-2 px-3 text-[#0F1B2D] font-medium">{formatNumber(p.total)}</td>
                    <td className="text-right py-2 px-3 text-blue-600">{formatNumber(p.calls)}</td>
                    <td className="text-right py-2 px-3 text-green-600">{formatNumber(p.whatsapp)}</td>
                    <td className="text-right py-2 px-3 text-yellow-600">{formatNumber(p.mensagens)}</td>
                    <td className="text-right py-2 px-3 text-[#F06B5D]">{formatNumber(p.reunioes)}</td>
                    <td className="text-right py-2 px-3 text-emerald-600">{p.contratos}</td>
                    <td className={`text-right py-2 px-3 ${p.noShows > 500 ? "text-red-600" : "text-gray-500"}`}>{p.noShows}</td>
                    <td className="text-right py-2 px-3 text-gray-600">{formatNumber(p.concluidas)}</td>
                    <td className="text-right py-2 px-3">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${pctConcl >= 80 ? "bg-green-100 text-green-700" : pctConcl >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{pctConcl}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Top Vendedores por Valor (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Vendedor</th>
                <th className="text-right py-2 px-3">Deals Won</th>
                <th className="text-right py-2 px-3">Valor Total</th>
                <th className="text-right py-2 px-3">Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {topSellers2026.filter(s => s.valorTotal > 0).sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 15).map((s, i) => (
                <tr key={s.nome} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-400 font-bold">{i + 1}</td>
                  <td className="py-2 px-3 font-medium text-[#0F1B2D]">{s.nome}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{s.dealsWon}</td>
                  <td className="text-right py-2 px-3 text-green-600 font-medium">{formatCurrency(s.valorTotal)}</td>
                  <td className="text-right py-2 px-3 text-[#F06B5D]">{formatCurrency(s.ticketMedio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
