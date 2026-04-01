"use client";
import { useParams } from "next/navigation";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { funnelByEmpreendimento, rdTopEmpreendimentos, facebookCampaigns, formatCurrency, formatNumber } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#3b82f6", "#ef4444"];

function slugify(name: string): string {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export default function EmpreendimentoPage() {
  const { slug } = useParams<{ slug: string }>();

  const emp = funnelByEmpreendimento.find(e => slugify(e.nome) === slug);
  const rdEmp = rdTopEmpreendimentos.find(r => slugify(r.nome) === slug || slugify(r.nome).includes(slug.split("-")[0]));
  const fbCamp = facebookCampaigns.find(c => c.nome.toLowerCase().includes(slug.split("-")[0]));

  if (!emp) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Empreendimento não encontrado</p>
          <p className="text-xs text-gray-600">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  const funnelData = [
    { etapa: "Leads", valor: emp.leads },
    { etapa: "MQL", valor: emp.mql },
    { etapa: "SQL", valor: emp.sql },
    { etapa: "OPP", valor: emp.opp },
    { etapa: "Won", valor: emp.won },
  ];

  const conversionRates = [
    { etapa: "Lead→MQL", taxa: emp.mql > 0 ? ((emp.mql / emp.leads) * 100) : 0 },
    { etapa: "MQL→SQL", taxa: emp.sql > 0 ? ((emp.sql / emp.mql) * 100) : 0 },
    { etapa: "SQL→OPP", taxa: emp.opp > 0 ? ((emp.opp / emp.sql) * 100) : 0 },
    { etapa: "OPP→Won", taxa: emp.won > 0 ? ((emp.won / emp.opp) * 100) : 0 },
  ];

  const cpwClass = emp.cpw > 3000 ? "text-red-400" : emp.cpw > 1000 ? "text-yellow-400" : emp.cpw > 0 ? "text-green-400" : "text-gray-500";
  const cpwLabel = emp.cpw > 3000 ? "CRÍTICO" : emp.cpw > 1000 ? "REGULAR" : emp.cpw > 0 ? "BOM" : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-indigo-400 uppercase tracking-wider">Empreendimento</p>
        <h1 className="text-2xl font-bold">{emp.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">Análise detalhada | Dados consolidados</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Leads" value={formatNumber(emp.leads)} highlight />
        <KpiCard label="MQL" value={formatNumber(emp.mql)} />
        <KpiCard label="Oportunidades" value={formatNumber(emp.opp)} />
        <KpiCard label="Won" value={String(emp.won)} trend={emp.won >= 50 ? "up" : emp.won >= 20 ? "neutral" : "down"} trendValue={`${((emp.won / emp.leads) * 100).toFixed(2)}% conv.`} />
        <KpiCard label="CPW" value={emp.cpw > 0 ? `R$ ${formatNumber(emp.cpw)}` : "N/A"} trend={emp.cpw > 3000 ? "down" : emp.cpw > 0 ? "up" : "neutral"} trendValue={cpwLabel} />
      </div>

      {emp.cpw > 3000 && (
        <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-400 mb-1">⚠ CPW Crítico</h3>
          <p className="text-xs text-red-300/80">
            O custo por venda de {formatCurrency(emp.cpw)} está muito acima da média (R$ 954).
            Recomendação: revisar segmentação de campanhas ou realocar budget.
          </p>
        </div>
      )}

      {emp.cpw > 0 && emp.cpw <= 500 && (
        <div className="bg-green-950/30 border border-green-900/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-400 mb-1">✅ Excelente Performance</h3>
          <p className="text-xs text-green-300/80">
            CPW de {formatCurrency(emp.cpw)} - muito abaixo da média. Considerar aumentar investimento neste empreendimento.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Funil de Vendas" subtitle={emp.nome}>
          <ResponsiveContainer>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis dataKey="etapa" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                {funnelData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Taxas de Conversão" subtitle="Por etapa do funil">
          <ResponsiveContainer>
            <BarChart data={conversionRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="etapa" tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} formatter={(v) => `${Number(v).toFixed(1)}%`} />
              <Bar dataKey="taxa" fill="#6366f1" radius={[4, 4, 0, 0]} name="Taxa (%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Investimento</h3>
          <p className="text-2xl font-bold text-white">{emp.investimento > 0 ? formatCurrency(emp.investimento) : "Sem registro"}</p>
          {emp.investimento > 0 && (
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>CPL: <span className="text-indigo-400">R$ {(emp.investimento / emp.leads).toFixed(2)}</span></p>
              <p>CMQL: <span className="text-blue-400">R$ {(emp.investimento / emp.mql).toFixed(2)}</span></p>
              <p>COPP: <span className="text-yellow-400">R$ {(emp.investimento / emp.opp).toFixed(2)}</span></p>
              <p>CPW: <span className={cpwClass}>R$ {(emp.investimento / emp.won).toFixed(2)}</span></p>
            </div>
          )}
        </div>

        {rdEmp && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">RD Station</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(rdEmp.conversoes)}</p>
            <p className="text-xs text-gray-400 mt-1">conversões</p>
            <p className="text-lg font-semibold text-indigo-400 mt-2">{formatNumber(rdEmp.contatos)}</p>
            <p className="text-xs text-gray-400">contatos únicos</p>
          </div>
        )}

        {fbCamp && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Facebook Ads</h3>
            <p className="text-lg font-bold text-white">{formatCurrency(fbCamp.gasto)}</p>
            <p className="text-xs text-gray-400 mt-1">investido</p>
            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Impressões: <span className="text-gray-300">{(fbCamp.impressoes / 1e6).toFixed(1)}M</span></p>
              <p>Cliques: <span className="text-gray-300">{formatNumber(fbCamp.cliques)}</span></p>
              <p>CPC: <span className="text-gray-300">R$ {fbCamp.cpc.toFixed(2)}</span></p>
              <p>CTR: <span className={`${fbCamp.ctr >= 2 ? "text-green-400" : "text-yellow-400"}`}>{fbCamp.ctr.toFixed(2)}%</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
