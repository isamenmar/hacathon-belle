"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { squads, empHealthScores, formatCurrency, formatNumber, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  PieChart, Pie, Cell
} from "recharts";

const ts = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };
const statusIcon = { saudavel: "🟢", atencao: "🟡", sobrecarregado: "🔴" };
const scoreIcon = { bom: "🟢", medio: "🟡", critico: "🔴" };

const totalLeads = squads.reduce((s, sq) => s + sq.metricas.leads, 0);
const totalWon = squads.reduce((s, sq) => s + sq.metricas.won, 0);
const totalMembros = squads.reduce((s, sq) => s + sq.membros.length, 0);
const totalAlertas = squads.reduce((s, sq) => s + sq.alertas.length, 0);
const totalInvest = squads.reduce((s, sq) => s + sq.metricas.investimento, 0);

const compData = squads.map(sq => ({
  nome: sq.nome.split(" - ")[0],
  leads: sq.metricas.leads,
  won: sq.metricas.won,
  convRate: sq.metricas.leads > 0 ? Number(((sq.metricas.won / sq.metricas.leads) * 100).toFixed(2)) : 0,
  score: sq.score,
  ocupacao: sq.ocupacao,
  investimento: sq.metricas.investimento,
  cpw: sq.metricas.won > 0 ? Math.round(sq.metricas.investimento / sq.metricas.won) : 0,
}));

const allMembers = squads.flatMap(sq => sq.membros.map(m => ({
  ...m,
  squad: sq.nome.split(" - ")[0],
  totalAtividades: m.calls + m.whatsapp + m.mensagens + m.reunioes,
})));

export default function SquadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">Squads Comerciais</h1>
        <p className="text-sm text-gray-500 mt-1">Estrutura operacional real | Dados priorizando 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Squads Ativos" value={String(squads.length)} subtitle="Estrutura atual" highlight />
        <KpiCard label="Membros" value={String(totalMembros)} subtitle="Ativos em 2026" />
        <KpiCard label="Leads Totais" value={formatNumber(totalLeads)} subtitle="Acumulado histórico" />
        <KpiCard label="Won Total" value={formatNumber(totalWon)} subtitle="Acumulado histórico" trend="up" trendValue={`${((totalWon / totalLeads) * 100).toFixed(2)}%`} />
        <KpiCard label="Alertas" value={String(totalAlertas)} subtitle="Ativos agora" trend={totalAlertas > 5 ? "down" : "up"} trendValue={totalAlertas > 5 ? "Atenção" : "OK"} />
      </div>

      {/* Squad Cards */}
      {squads.map((sq) => (
        <div key={sq.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#0F1B2D] px-5 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{sq.nome}</h3>
              <p className="text-[10px] text-gray-400">{sq.tipo} | Capacidade: {sq.capacidadeSemanal} leads/semana</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{statusIcon[sq.status]}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                sq.status === "saudavel" ? "bg-green-100 text-green-700" :
                sq.status === "atencao" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
              }`}>{sq.ocupacao}% ocupação</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                sq.scoreLabel === "bom" ? "bg-green-100 text-green-700" :
                sq.scoreLabel === "medio" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
              }`}>Score: {sq.score}</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Métricas Funil */}
            <div className="grid grid-cols-6 gap-2 text-center">
              {[
                { label: "Leads", val: sq.metricas.leads, color: "text-[#0F1B2D]" },
                { label: "MQL", val: sq.metricas.mql, color: "text-[#0F1B2D]" },
                { label: "SQL", val: sq.metricas.sql, color: "text-[#0F1B2D]" },
                { label: "OPP", val: sq.metricas.opp, color: "text-[#0F1B2D]" },
                { label: "Won", val: sq.metricas.won, color: "text-green-600" },
                { label: "Investimento", val: sq.metricas.investimento, color: "text-[#F06B5D]" },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <p className="text-[10px] text-gray-500">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{label === "Investimento" ? formatCurrency(val) : formatNumber(val)}</p>
                </div>
              ))}
            </div>

            {/* Ocupação */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Ocupacao ({sq.leadsAtribuidos} leads ativos / {sq.capacidadeSemanal}/sem)</span>
                <span className={sq.ocupacao > 90 ? "text-red-600 font-medium" : sq.ocupacao > 70 ? "text-yellow-600" : "text-green-600"}>{sq.ocupacao}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 rounded-full ${sq.ocupacao > 90 ? "bg-red-500" : sq.ocupacao > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${sq.ocupacao}%` }} />
              </div>
            </div>

            {/* Membros */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Membros do Squad</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      <th className="text-left py-1.5 px-2">Nome</th>
                      <th className="text-center py-1.5 px-2">Função</th>
                      <th className="text-right py-1.5 px-2">Calls</th>
                      <th className="text-right py-1.5 px-2">WhatsApp</th>
                      <th className="text-right py-1.5 px-2">Reunioes</th>
                      <th className="text-right py-1.5 px-2">Contratos</th>
                      <th className="text-right py-1.5 px-2">Won</th>
                      <th className="text-right py-1.5 px-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sq.membros.map(mb => (
                      <tr key={mb.nome} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-1.5 px-2 font-medium text-[#0F1B2D]">{mb.nome}</td>
                        <td className="text-center py-1.5 px-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${mb.role === "Pre-vendas" ? "bg-blue-100 text-blue-700" : mb.role === "Closer" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{mb.role}</span>
                        </td>
                        <td className="text-right py-1.5 px-2 text-gray-600">{formatNumber(mb.calls)}</td>
                        <td className="text-right py-1.5 px-2 text-gray-600">{formatNumber(mb.whatsapp)}</td>
                        <td className="text-right py-1.5 px-2 text-gray-600">{formatNumber(mb.reunioes)}</td>
                        <td className="text-right py-1.5 px-2 text-green-600 font-medium">{mb.contratos}</td>
                        <td className="text-right py-1.5 px-2 text-green-600 font-medium">{mb.dealsWon}</td>
                        <td className="text-right py-1.5 px-2 text-[#F06B5D] font-medium">{mb.valorTotal > 0 ? formatCurrency(mb.valorTotal) : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Empreendimentos */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Empreendimentos</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      <th className="text-left py-1.5 px-2">Empreendimento</th>
                      <th className="text-center py-1.5 px-2">Score</th>
                      <th className="text-left py-1.5 px-2">Fonte</th>
                      <th className="text-right py-1.5 px-2">Leads</th>
                      <th className="text-right py-1.5 px-2">Won</th>
                      <th className="text-right py-1.5 px-2">CPW</th>
                      <th className="text-right py-1.5 px-2">Leads 2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sq.empreendimentos.map(e => (
                      <tr key={e.nome} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-1.5 px-2 font-medium text-[#0F1B2D]">{e.nome}</td>
                        <td className="text-center py-1.5 px-2">
                          <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded ${
                            e.scoreLabel === "bom" ? "bg-green-100 text-green-700" :
                            e.scoreLabel === "medio" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          }`}>{scoreIcon[e.scoreLabel]} {e.score}</span>
                        </td>
                        <td className="py-1.5 px-2 text-gray-500 text-[10px]">{e.fonte}</td>
                        <td className="text-right py-1.5 px-2 text-gray-600">{formatNumber(e.leads)}</td>
                        <td className="text-right py-1.5 px-2 text-green-600 font-medium">{e.won}</td>
                        <td className={`text-right py-1.5 px-2 font-medium ${e.cpw > 5000 ? "text-red-600" : e.cpw > 2000 ? "text-yellow-600" : e.cpw > 0 ? "text-green-600" : "text-gray-400"}`}>
                          {e.cpw > 0 ? formatCurrency(e.cpw) : "-"}
                        </td>
                        <td className="text-right py-1.5 px-2 text-[#F06B5D]">{formatNumber(e.conversoes2026)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alertas */}
            {sq.alertas.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <p className="text-[10px] text-red-600 font-semibold uppercase mb-1">Alertas ({sq.alertas.length})</p>
                {sq.alertas.map((a, i) => <p key={i} className="text-[10px] text-red-700">• {a}</p>)}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Comparação entre Squads */}
      <h2 className="text-lg font-bold text-[#0F1B2D] pt-2">Comparacao entre Squads</h2>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Conversão Lead→Won (%)" subtitle="Por squad">
          <ResponsiveContainer>
            <BarChart data={compData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="nome" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={ts} />
              <Bar dataKey="convRate" fill="#F06B5D" radius={[4, 4, 0, 0]} name="Conversão (%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Volume: Leads vs Won" subtitle="Escala absoluta">
          <ResponsiveContainer>
            <BarChart data={compData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="nome" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={ts} />
              <Bar dataKey="leads" fill="#0F1B2D" name="Leads" radius={[4, 4, 0, 0]} />
              <Bar dataKey="won" fill="#22c55e" name="Won" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Investimento e CPW" subtitle="Por squad">
          <ResponsiveContainer>
            <BarChart data={compData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="nome" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={ts} formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="investimento" fill="#0F1B2D" name="Investimento" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cpw" fill="#F06B5D" name="CPW" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Ocupação por Squad (%)" subtitle="Capacidade utilizada">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={compData.map(c => ({ nome: c.nome, value: c.ocupacao }))} dataKey="value" nameKey="nome" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                {compData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={ts} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Rankings */}
      <h2 className="text-lg font-bold text-[#0F1B2D] pt-2">Rankings</h2>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Ranking Membros */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">🏆 Ranking Membros (Atividades)</h3>
          {allMembers.sort((a, b) => b.totalAtividades - a.totalAtividades).map((m, i) => (
            <div key={m.nome} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                <div>
                  <span className="text-xs font-medium text-[#0F1B2D]">{m.nome}</span>
                  <span className="text-[10px] text-gray-400 ml-1">({m.squad})</span>
                </div>
              </div>
              <span className="text-xs text-gray-600">{formatNumber(m.totalAtividades)}</span>
            </div>
          ))}
        </div>

        {/* Ranking Empreendimentos */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">🏆 Ranking Empreendimentos (Score)</h3>
          {empHealthScores.sort((a, b) => b.score - a.score).map((e, i) => (
            <div key={e.nome} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                <span className="text-xs font-medium text-[#0F1B2D]">{e.nome}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">{e.score}</span>
                <span>{scoreIcon[e.scoreLabel]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Previsão */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">🔮 Previsão por Squad</h3>
          {squads.map(sq => (
            <div key={sq.id} className="py-2 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#0F1B2D]">{sq.nome.split(" - ")[0]}</span>
                <span className="text-xs font-bold text-[#F06B5D]">{sq.previsaoWon} won</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">
                +10% sobre histórico ({sq.metricas.won} atual) | {sq.membros.length} membros
              </p>
            </div>
          ))}
          <div className="mt-3 p-2 bg-[#FFF5F3] rounded-lg">
            <p className="text-[10px] text-gray-600">
              <strong className="text-[#F06B5D]">Total previsto:</strong> {squads.reduce((s, sq) => s + sq.previsaoWon, 0)} deals won (próximo período)
            </p>
          </div>
        </div>
      </div>

      {/* Health Score Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Score de Saude por Empreendimento</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">Empreendimento</th>
                <th className="text-center py-2 px-3">Score</th>
                <th className="text-left py-2 px-3">Squad</th>
                <th className="text-right py-2 px-3">Conversao</th>
                <th className="text-right py-2 px-3">CPW</th>
                <th className="text-right py-2 px-3">Won</th>
                <th className="text-right py-2 px-3">Leads 2026</th>
                <th className="text-center py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {empHealthScores.sort((a, b) => b.score - a.score).map(e => (
                <tr key={e.nome} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-[#0F1B2D] font-medium">{e.nome}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      e.scoreLabel === "bom" ? "bg-green-100 text-green-700" :
                      e.scoreLabel === "medio" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                    }`}>{e.score}</span>
                  </td>
                  <td className="py-2 px-3 text-gray-600">{e.squad}</td>
                  <td className="text-right py-2 px-3 text-[#F06B5D] font-medium">{e.conversao.toFixed(2)}%</td>
                  <td className={`text-right py-2 px-3 font-medium ${e.cpw > 5000 ? "text-red-600" : e.cpw > 2000 ? "text-yellow-600" : e.cpw > 0 ? "text-green-600" : "text-gray-400"}`}>
                    {e.cpw > 0 ? formatCurrency(e.cpw) : "-"}
                  </td>
                  <td className="text-right py-2 px-3 text-gray-600">{e.volume}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{formatNumber(e.conversoes2026)}</td>
                  <td className="text-center py-2 px-3">{scoreIcon[e.scoreLabel]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
