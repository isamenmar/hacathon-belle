"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import {
  pipelineOverview, dealsWonByMonth, funnelByChannel, lostReasons,
  leadsAbertos, metricasComerciais, formatCurrency, formatNumber, winLostByMonth,
  setores, CHART_COLORS
} from "@/data";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

const funnelData = funnelByChannel.reduce(
  (acc, ch) => ({ leads: acc.leads + ch.leads, mql: acc.mql + ch.mql, sql: acc.sql + ch.sql, opp: acc.opp + ch.opp, won: acc.won + ch.won }),
  { leads: 0, mql: 0, sql: 0, opp: 0, won: 0 }
);

const funnelSteps = [
  { etapa: "Leads", valor: funnelData.leads },
  { etapa: "MQL", valor: funnelData.mql },
  { etapa: "SQL", valor: funnelData.sql },
  { etapa: "Oportunidades", valor: funnelData.opp },
  { etapa: "Won", valor: funnelData.won },
];

const tooltipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">Dashboard Executivo</h1>
        <p className="text-sm text-gray-500 mt-1">Visão consolidada | Dados priorizando Jan-Mar/2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Deals Won" value={formatNumber(pipelineOverview.won.deals)} subtitle="Historico (Jul/2019 - Mar/2026)" highlight />
        <KpiCard label="Valor Total Won" value={formatCurrency(pipelineOverview.won.valor)} subtitle="Historico | R$ 1,09 Bilhao" highlight />
        <KpiCard label="Win Rate" value={`${pipelineOverview.winRate}%`} subtitle="Historico geral" trend="down" trendValue="2,7% em Mar/26" />
        <KpiCard label="Ticket Médio" value={formatCurrency(pipelineOverview.won.ticketMedio)} subtitle="Historico geral" trend="down" trendValue="queda vs 2024" />
        <KpiCard label="Leads Abertos" value={formatNumber(leadsAbertos.reduce((s, l) => s + l.leads, 0))} subtitle="Snapshot atual" />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-red-600 mb-2">⚠ Alertas Críticos</h3>
        <ul className="text-xs text-red-700/80 space-y-1">
          <li>• Win rate caindo: 10,8% (Jan/25) → 2,7% (Mar/26) - investigar qualidade de leads</li>
          <li>• 37% dos deals perdidos por &quot;Não atende/Não responde&quot; (65.779 deals)</li>
          <li>• MIA (IA) com taxa de no-show de 60% em 2026 vs 8,3% média humana</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Deals Won por Mês" subtitle="2025-2026">
          <ResponsiveContainer>
            <BarChart data={dealsWonByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="won" fill="#F06B5D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Funil de Vendas" subtitle="Consolidado todos os canais">
          <ResponsiveContainer>
            <BarChart data={funnelSteps} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="etapa" type="category" tick={{ fill: "#6b7280", fontSize: 11 }} width={100} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                {funnelSteps.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Won vs Lost (Consolidado)" subtitle="2025-2026">
          <ResponsiveContainer>
            <AreaChart data={winLostByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="lost" fill="#fecaca" stroke="#ef4444" name="Lost" />
              <Area type="monotone" dataKey="won" fill="#bbf7d0" stroke="#22c55e" name="Won" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Leads Abertos por Setor" subtitle="Snapshot atual">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={leadsAbertos} dataKey="leads" nameKey="setor" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${value}`}>
                {leadsAbertos.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Top Motivos de Perda</h3>
          <div className="space-y-2">
            {lostReasons.slice(0, 7).map((r) => (
              <div key={r.motivo} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{r.motivo}</span>
                    <span className="text-gray-400">{r.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 bg-[#F06B5D] rounded-full" style={{ width: `${(r.pct / 37) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-4">Métricas Comerciais (Canal MKT)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-xs text-gray-500">CPL</p><p className="text-xl font-bold text-[#F06B5D]">R$ {metricasComerciais.cpl}</p></div>
            <div><p className="text-xs text-gray-500">CMQL</p><p className="text-xl font-bold text-blue-600">R$ {metricasComerciais.cmql}</p></div>
            <div><p className="text-xs text-gray-500">COPP</p><p className="text-xl font-bold text-yellow-600">R$ {metricasComerciais.copp}</p></div>
            <div><p className="text-xs text-gray-500">CPW</p><p className="text-xl font-bold text-green-600">R$ {metricasComerciais.cpw}</p></div>
          </div>
          <div className="mt-4 p-3 bg-[#FFF5F3] rounded-lg border border-[#F06B5D]/20">
            <p className="text-xs text-gray-600">
              <span className="text-[#F06B5D] font-medium">Insight:</span> Canal Parceiros converte 6,8x mais que MKT (4,6% vs 0,68%) com custo zero.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Taxas de Conversão por Canal</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
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
                <tr key={ch.canal} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-[#0F1B2D]">{ch.canal}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{formatNumber(ch.leads)}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{formatNumber(ch.mql)}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{formatNumber(ch.sql)}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{formatNumber(ch.opp)}</td>
                  <td className="text-right py-2 px-3 text-green-600 font-medium">{ch.won}</td>
                  <td className="text-right py-2 px-3 text-[#F06B5D] font-medium">{(100 * ch.won / ch.leads).toFixed(2)}%</td>
                  <td className="text-right py-2 px-3 text-gray-600">{ch.investimento ? formatCurrency(ch.investimento) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Métricas por Setor (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">Setor</th>
                <th className="text-right py-2 px-3">Won 2026</th>
                <th className="text-right py-2 px-3">Lost 2026</th>
                <th className="text-right py-2 px-3">Valor Won</th>
                <th className="text-right py-2 px-3">Leads Abertos</th>
                <th className="text-right py-2 px-3">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {setores.map((s) => (
                <tr key={s.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-[#0F1B2D]">{s.nome}</td>
                  <td className="text-right py-2 px-3 text-green-600 font-medium">{formatNumber(s.wonTotal)}</td>
                  <td className="text-right py-2 px-3 text-red-500">{formatNumber(s.lostTotal)}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{s.valorTotal > 0 ? formatCurrency(s.valorTotal) : "-"}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{s.leadsAbertos}</td>
                  <td className="text-right py-2 px-3 text-[#F06B5D] font-medium">{s.wonTotal > 0 ? ((s.wonTotal / (s.wonTotal + s.lostTotal)) * 100).toFixed(1) : "0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
