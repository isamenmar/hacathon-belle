"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import {
  pipelineOverview, dealsWonByMonth, funnelByChannel, lostReasons,
  leadsAbertos, metricasComerciais, formatCurrency, formatNumber, winLostByMonth
} from "@/data";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#ef4444", "#3b82f6", "#f97316"];

const funnelData = funnelByChannel.reduce(
  (acc, ch) => ({
    leads: acc.leads + ch.leads,
    mql: acc.mql + ch.mql,
    sql: acc.sql + ch.sql,
    opp: acc.opp + ch.opp,
    won: acc.won + ch.won,
  }),
  { leads: 0, mql: 0, sql: 0, opp: 0, won: 0 }
);

const funnelSteps = [
  { etapa: "Leads", valor: funnelData.leads },
  { etapa: "MQL", valor: funnelData.mql },
  { etapa: "SQL", valor: funnelData.sql },
  { etapa: "Oportunidades", valor: funnelData.opp },
  { etapa: "Won", valor: funnelData.won },
];

const recent = dealsWonByMonth.filter(d => d.mes.includes("/25") || d.mes.includes("/26"));

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Executivo</h1>
        <p className="text-sm text-gray-500 mt-1">Visão consolidada | Dados até Mar/2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Deals Won" value={formatNumber(pipelineOverview.won.deals)} subtitle="Total histórico" highlight />
        <KpiCard label="Valor Total Won" value={formatCurrency(pipelineOverview.won.valor)} subtitle="R$ 1,09 Bilhão" highlight />
        <KpiCard label="Win Rate" value={`${pipelineOverview.winRate}%`} trend="down" trendValue="2,7% em Mar/26" />
        <KpiCard label="Ticket Médio" value={formatCurrency(pipelineOverview.won.ticketMedio)} trend="down" trendValue="vs R$167K Abr/24" />
        <KpiCard label="Leads Abertos" value={formatNumber(leadsAbertos.reduce((s, l) => s + l.leads, 0))} subtitle="Snapshot atual" />
      </div>

      {/* Alerts */}
      <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-red-400 mb-2">⚠ Alertas</h3>
        <ul className="text-xs text-red-300/80 space-y-1">
          <li>• Win rate caindo: 10,8% (Jan/25) → 2,7% (Mar/26) - investigar qualidade de leads</li>
          <li>• 37% dos deals perdidos por "Não atende/Não responde" (65.779 deals)</li>
          <li>• MIA (IA) com taxa de no-show de 46,2% vs 8,3% média humana</li>
        </ul>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Deals Won por Mês" subtitle="2025-2026">
          <ResponsiveContainer>
            <BarChart data={recent}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="mes" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
              <Bar dataKey="won" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Funil de Vendas" subtitle="Consolidado todos os canais">
          <ResponsiveContainer>
            <BarChart data={funnelSteps} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis dataKey="etapa" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={100} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                {funnelSteps.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Won vs Lost (Consolidado)" subtitle="2025-2026">
          <ResponsiveContainer>
            <AreaChart data={winLostByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="mes" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
              <Area type="monotone" dataKey="lost" fill="#ef444433" stroke="#ef4444" name="Lost" />
              <Area type="monotone" dataKey="won" fill="#22c55e33" stroke="#22c55e" name="Won" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Leads Abertos por Setor" subtitle="Snapshot atual">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={leadsAbertos} dataKey="leads" nameKey="setor" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${value}`}>
                {leadsAbertos.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Motivos de Perda + Métricas */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Motivos de Perda</h3>
          <div className="space-y-2">
            {lostReasons.slice(0, 7).map((r) => (
              <div key={r.motivo} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{r.motivo}</span>
                    <span className="text-gray-500">{r.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div className="h-1.5 bg-red-500/60 rounded-full" style={{ width: `${(r.pct / 37) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Métricas Comerciais (Canal MKT)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">CPL</p>
              <p className="text-xl font-bold text-indigo-400">R$ {metricasComerciais.cpl}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">CMQL</p>
              <p className="text-xl font-bold text-blue-400">R$ {metricasComerciais.cmql}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">COPP</p>
              <p className="text-xl font-bold text-yellow-400">R$ {metricasComerciais.copp}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">CPW</p>
              <p className="text-xl font-bold text-green-400">R$ {metricasComerciais.cpw}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400">
              <span className="text-indigo-400 font-medium">Insight:</span> Canal Parceiros converte 6,8x mais que MKT (4,6% vs 0,68%) com custo zero.
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Rates Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Taxas de Conversão por Canal</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">Canal</th>
                <th className="text-right py-2 px-3">Leads</th>
                <th className="text-right py-2 px-3">MQL</th>
                <th className="text-right py-2 px-3">SQL</th>
                <th className="text-right py-2 px-3">OPP</th>
                <th className="text-right py-2 px-3">Won</th>
                <th className="text-right py-2 px-3">Lead→Won</th>
                <th className="text-right py-2 px-3">Investimento</th>
              </tr>
            </thead>
            <tbody>
              {funnelByChannel.map((ch) => (
                <tr key={ch.canal} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 font-medium text-gray-300">{ch.canal}</td>
                  <td className="text-right py-2 px-3 text-gray-400">{formatNumber(ch.leads)}</td>
                  <td className="text-right py-2 px-3 text-gray-400">{formatNumber(ch.mql)}</td>
                  <td className="text-right py-2 px-3 text-gray-400">{formatNumber(ch.sql)}</td>
                  <td className="text-right py-2 px-3 text-gray-400">{formatNumber(ch.opp)}</td>
                  <td className="text-right py-2 px-3 text-green-400 font-medium">{ch.won}</td>
                  <td className="text-right py-2 px-3 text-indigo-400 font-medium">{(100 * ch.won / ch.leads).toFixed(2)}%</td>
                  <td className="text-right py-2 px-3 text-gray-400">{ch.investimento ? formatCurrency(ch.investimento) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
