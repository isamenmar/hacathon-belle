"use client";
import { useParams } from "next/navigation";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { funnelByEmpreendimento, rdTop2026, facebookCampaigns2026, formatCurrency, formatNumber, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const tooltipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };

export default function EmpreendimentoPage() {
  const { slug } = useParams<{ slug: string }>();
  const emp = funnelByEmpreendimento.find(e => e.slug === slug);
  const rdEmp = rdTop2026.find(r => r.nome.toLowerCase().includes(slug.split("-")[0]));
  const fbCamp = facebookCampaigns2026.find(c => c.nome.toLowerCase().includes(slug.split("-")[0]));

  if (!emp) {
    return <div className="flex items-center justify-center h-full"><p className="text-gray-400">Empreendimento não encontrado: {slug}</p></div>;
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

  const cpwClass = emp.cpw > 3000 ? "text-red-600" : emp.cpw > 1000 ? "text-yellow-600" : emp.cpw > 0 ? "text-green-600" : "text-gray-400";
  const cpwLabel = emp.cpw > 3000 ? "CRÍTICO" : emp.cpw > 1000 ? "REGULAR" : emp.cpw > 0 ? "BOM" : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-[#F06B5D] uppercase tracking-wider font-semibold">Empreendimento</p>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">{emp.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">Setor: {emp.setor} | Análise consolidada</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Leads" value={formatNumber(emp.leads)} highlight />
        <KpiCard label="MQL" value={formatNumber(emp.mql)} />
        <KpiCard label="Oportunidades" value={formatNumber(emp.opp)} />
        <KpiCard label="Won" value={String(emp.won)} trend={emp.won >= 50 ? "up" : emp.won >= 20 ? "neutral" : "down"} trendValue={`${((emp.won / emp.leads) * 100).toFixed(2)}% conv.`} />
        <KpiCard label="CPW" value={emp.cpw > 0 ? `R$ ${formatNumber(emp.cpw)}` : "N/A"} trend={emp.cpw > 3000 ? "down" : emp.cpw > 0 ? "up" : "neutral"} trendValue={cpwLabel} />
      </div>

      {emp.cpw > 3000 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-600 mb-1">⚠ CPW Crítico</h3>
          <p className="text-xs text-red-700">CPW de {formatCurrency(emp.cpw)} está muito acima da média (R$ 954). Revisar segmentação ou realocar budget.</p>
        </div>
      )}

      {emp.cpw > 0 && emp.cpw <= 500 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-600 mb-1">✅ Excelente Performance</h3>
          <p className="text-xs text-green-700">CPW de {formatCurrency(emp.cpw)} - muito abaixo da média. Considerar aumentar investimento.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Funil de Vendas" subtitle={emp.nome}>
          <ResponsiveContainer>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="etapa" type="category" tick={{ fill: "#6b7280", fontSize: 11 }} width={80} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                {funnelData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Taxas de Conversão" subtitle="Por etapa do funil">
          <ResponsiveContainer>
            <BarChart data={conversionRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="etapa" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${Number(v).toFixed(1)}%`} />
              <Bar dataKey="taxa" fill="#F06B5D" radius={[4, 4, 0, 0]} name="Taxa (%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Investimento</h3>
          <p className="text-2xl font-bold text-[#0F1B2D]">{emp.investimento > 0 ? formatCurrency(emp.investimento) : "Sem registro"}</p>
          {emp.investimento > 0 && (
            <div className="mt-3 space-y-1 text-xs text-gray-500">
              <p>CPL: <span className="text-[#F06B5D] font-medium">R$ {(emp.investimento / emp.leads).toFixed(2)}</span></p>
              <p>CMQL: <span className="text-blue-600 font-medium">R$ {(emp.investimento / emp.mql).toFixed(2)}</span></p>
              <p>COPP: <span className="text-yellow-600 font-medium">R$ {(emp.investimento / emp.opp).toFixed(2)}</span></p>
              <p>CPW: <span className={`font-medium ${cpwClass}`}>R$ {(emp.investimento / emp.won).toFixed(2)}</span></p>
            </div>
          )}
        </div>

        {rdEmp && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">RD Station (2026)</h3>
            <p className="text-2xl font-bold text-[#0F1B2D]">{formatNumber(rdEmp.conversoes)}</p>
            <p className="text-xs text-gray-400 mt-1">conversões</p>
            <p className="text-lg font-semibold text-[#F06B5D] mt-2">{formatNumber(rdEmp.contatos)}</p>
            <p className="text-xs text-gray-400">contatos únicos</p>
          </div>
        )}

        {fbCamp && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Facebook Ads (2026)</h3>
            <p className="text-lg font-bold text-[#0F1B2D]">{formatCurrency(fbCamp.gasto)}</p>
            <p className="text-xs text-gray-400 mt-1">investido</p>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p>Impressões: <span className="text-[#0F1B2D]">{(fbCamp.impressoes / 1e6).toFixed(1)}M</span></p>
              <p>Cliques: <span className="text-[#0F1B2D]">{formatNumber(fbCamp.cliques)}</span></p>
              <p>CPC: <span className="text-[#0F1B2D]">R$ {fbCamp.cpc.toFixed(2)}</span></p>
              <p>CTR: <span className={fbCamp.ctr >= 2 ? "text-green-600" : "text-yellow-600"}>{fbCamp.ctr.toFixed(2)}%</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
