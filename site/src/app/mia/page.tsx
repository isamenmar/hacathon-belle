"use client";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { miaData, teamPerformers, formatNumber } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#3b82f6", "#f97316"];

const miaBreakdown = [
  { tipo: "Calls", valor: miaData.calls },
  { tipo: "WhatsApp", valor: miaData.whatsapp },
  { tipo: "Mensagens", valor: miaData.mensagens },
  { tipo: "Reuniões", valor: miaData.reunioesAgendadas },
  { tipo: "No-Shows", valor: miaData.noShows },
];

const miaP = teamPerformers.find(p => p.nome.includes("Mia"))!;
const humanos = teamPerformers.filter(p => !p.nome.includes("Mia") && !p.nome.includes("Automação")).slice(0, 5);
const avgHumano = {
  total: Math.round(humanos.reduce((s, h) => s + h.total, 0) / humanos.length),
  calls: Math.round(humanos.reduce((s, h) => s + h.calls, 0) / humanos.length),
  whatsapp: Math.round(humanos.reduce((s, h) => s + h.whatsapp, 0) / humanos.length),
  reunioes: Math.round(humanos.reduce((s, h) => s + h.reunioes, 0) / humanos.length),
  noShows: Math.round(humanos.reduce((s, h) => s + h.noShows, 0) / humanos.length),
};

const comparison = [
  { metrica: "Total Atividades", mia: miaP.total, humano: avgHumano.total },
  { metrica: "Calls", mia: miaP.calls, humano: avgHumano.calls },
  { metrica: "WhatsApp", mia: miaP.whatsapp, humano: avgHumano.whatsapp },
  { metrica: "Reuniões", mia: miaP.reunioes, humano: avgHumano.reunioes },
  { metrica: "No-Shows", mia: miaP.noShows, humano: avgHumano.noShows },
];

const reunioesEfetivas = miaData.reunioesAgendadas - miaData.noShows;
const reunioesPotenciais = Math.round(miaData.reunioesAgendadas * 0.8);
const dealsPotenciais = Math.round(reunioesPotenciais * 0.15);
const receitaPotencial = dealsPotenciais * 86931;

export default function MiaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">MIA - Assistente Virtual (Morada.ai)</h1>
        <p className="text-sm text-gray-500 mt-1">Performance da IA interna | 2025-2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Total Atividades" value={formatNumber(miaData.totalAtividades)} subtitle={`#${miaData.ranking} no ranking`} highlight />
        <KpiCard label="Reuniões Agendadas" value={formatNumber(miaData.reunioesAgendadas)} trend="up" trendValue="7,8x vs humanos" />
        <KpiCard label="No-Shows" value={formatNumber(miaData.noShows)} trend="down" trendValue="46,2%" />
        <KpiCard label="Reuniões Efetivas" value={formatNumber(reunioesEfetivas)} subtitle={`${(100 - miaData.taxaNoShow).toFixed(1)}% efetividade`} />
        <KpiCard label="Contratos" value={String(miaData.contratos)} trend="down" trendValue="Precisa melhorar" />
      </div>

      <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-red-400 mb-2">⚠ Alerta: Taxa de No-Show Crítica</h3>
        <p className="text-xs text-red-300/80">
          A MIA tem taxa de no-show de <strong>46,2%</strong> vs 8,3% média humana.
          De 4.605 reuniões agendadas, 2.127 não compareceram.
          Se reduzir para 20%: <strong>+{formatNumber(dealsPotenciais)} deals potenciais = R$ {(receitaPotencial / 1e6).toFixed(1)}M em receita</strong>.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Distribuição de Atividades da MIA" subtitle="2025+">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={miaBreakdown} dataKey="valor" nameKey="tipo" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${formatNumber(Number(value))}`}>
                {miaBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="MIA vs Média Top 5 Humanos" subtitle="Comparativo direto">
          <ResponsiveContainer>
            <BarChart data={comparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="metrica" tick={{ fill: "#9ca3af", fontSize: 9 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
              <Bar dataKey="mia" fill="#8b5cf6" name="MIA (IA)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="humano" fill="#6b7280" name="Média Humana" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-green-400 mb-3">✅ Pontos Fortes</h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Volume equivalente aos top humanos (33.933 atividades)</li>
            <li>• Agenda 7,8x mais reuniões que a média humana</li>
            <li>• Opera multi-canal (calls + WhatsApp + mensagens)</li>
            <li>• Escalabilidade 24/7 sem fadiga</li>
          </ul>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-red-400 mb-3">❌ Pontos de Melhoria</h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Taxa no-show 46,2% (vs 8,3% humanos)</li>
            <li>• Apenas 1 contrato fechado</li>
            <li>• Leads agendados possivelmente menos qualificados</li>
            <li>• Falta confirmação pré-reunião</li>
          </ul>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3">🎯 Recomendações</h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Confirmação automática 24h antes (WhatsApp)</li>
            <li>• Lembrete 1h antes com link da reunião</li>
            <li>• Qualificação mais rigorosa antes de agendar</li>
            <li>• Reagendamento automático pós no-show (2x)</li>
            <li>• Meta: reduzir no-show para &lt; 20%</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-950 to-gray-900 border border-indigo-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-2">📈 Impacto Estimado da Otimização</h3>
        <div className="grid grid-cols-4 gap-4 mt-3">
          <div>
            <p className="text-xs text-gray-400">Reuniões Potenciais</p>
            <p className="text-xl font-bold text-white">{formatNumber(reunioesPotenciais)}</p>
            <p className="text-[10px] text-gray-500">com 80% efetividade</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Deals Potenciais</p>
            <p className="text-xl font-bold text-green-400">+{formatNumber(dealsPotenciais)}</p>
            <p className="text-[10px] text-gray-500">15% conversão pós-reunião</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Receita Potencial</p>
            <p className="text-xl font-bold text-indigo-400">R$ {(receitaPotencial / 1e6).toFixed(1)}M</p>
            <p className="text-[10px] text-gray-500">ticket médio R$ 86.931</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">ROI da Otimização</p>
            <p className="text-xl font-bold text-yellow-400">Altíssimo</p>
            <p className="text-[10px] text-gray-500">Investimento mínimo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
