"use client";
import { useParams } from "next/navigation";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { funnelByEmpreendimento, allEmpreendimentos2026, rdTop2026, facebookCampaigns2026, squads, formatCurrency, formatNumber, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const tooltipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };

export default function EmpreendimentoPage() {
  const { slug } = useParams<{ slug: string }>();

  // Buscar em funnelByEmpreendimento (dados completos de funil)
  const emp = funnelByEmpreendimento.find(e => e.slug === slug);
  // Buscar em allEmpreendimentos2026 (dados 2026 do RD Station)
  const emp2026 = allEmpreendimentos2026.find(e => e.slug === slug);
  // Buscar dados de RD Station e Facebook
  const searchKey = slug.split("-")[0];
  const rdEmp = rdTop2026.find(r => r.nome.toLowerCase().includes(searchKey));
  const fbCamp = facebookCampaigns2026.find(c => c.nome.toLowerCase().includes(searchKey));
  // Buscar squad que contém este empreendimento
  const squadInfo = squads.find(s => s.empreendimentos.some(e => e.nome.toLowerCase().includes(searchKey)));
  const squadEmp = squadInfo?.empreendimentos.find(e => e.nome.toLowerCase().includes(searchKey));

  // Se não encontrou em nenhuma fonte
  const nome = emp?.nome || emp2026?.nome || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const hasFullFunnel = !!emp;
  const hasAny = emp || emp2026 || rdEmp || fbCamp || squadEmp;

  if (!hasAny) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Empreendimento nao encontrado</p>
          <p className="text-xs text-gray-500 mt-1">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  // Dados de funil (do funnelByEmpreendimento ou do squad)
  const leads = emp?.leads || squadEmp?.leads || 0;
  const mql = emp?.mql || squadEmp?.mql || 0;
  const sql = emp?.sql || squadEmp?.sql || 0;
  const opp = emp?.opp || squadEmp?.opp || 0;
  const won = emp?.won || squadEmp?.won || 0;
  const investimento = emp?.investimento || squadEmp?.investimento || 0;
  const cpw = emp?.cpw || squadEmp?.cpw || (won > 0 && investimento > 0 ? investimento / won : 0);
  const setor = emp?.setor || "SZI";
  const conversoes2026 = emp2026?.conversoes2026 || squadEmp?.conversoes2026 || rdEmp?.conversoes || 0;

  const funnelData = [
    { etapa: "Leads", valor: leads },
    { etapa: "MQL", valor: mql },
    { etapa: "SQL", valor: sql },
    { etapa: "OPP", valor: opp },
    { etapa: "Won", valor: won },
  ];

  const conversionRates = [
    { etapa: "Lead->MQL", taxa: leads > 0 && mql > 0 ? ((mql / leads) * 100) : 0 },
    { etapa: "MQL->SQL", taxa: mql > 0 && sql > 0 ? ((sql / mql) * 100) : 0 },
    { etapa: "SQL->OPP", taxa: sql > 0 && opp > 0 ? ((opp / sql) * 100) : 0 },
    { etapa: "OPP->Won", taxa: opp > 0 && won > 0 ? ((won / opp) * 100) : 0 },
  ];

  const cpwClass = cpw > 3000 ? "text-red-600" : cpw > 1000 ? "text-yellow-600" : cpw > 0 ? "text-green-600" : "text-gray-400";
  const cpwLabel = cpw > 3000 ? "CRITICO" : cpw > 1000 ? "REGULAR" : cpw > 0 ? "BOM" : "N/A";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-[#F06B5D] uppercase tracking-wider font-semibold">Empreendimento</p>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">{nome}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Setor: {setor}
          {squadInfo && <> | {squadInfo.nome.split(" - ")[0]}</>}
          {!hasFullFunnel && " | Dados parciais (2026)"}
        </p>
      </div>

      {!hasFullFunnel && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <p className="text-xs text-yellow-700">
            <strong>Aviso:</strong> Este empreendimento nao possui funil historico completo. Exibindo dados disponiveis de 2026 (RD Station, Facebook Ads, Squads).
          </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {leads > 0 ? (
          <KpiCard label="Leads" value={formatNumber(leads)} highlight />
        ) : (
          <KpiCard label="Conv. Leads 2026" value={formatNumber(conversoes2026)} highlight />
        )}
        <KpiCard label="MQL" value={leads > 0 ? formatNumber(mql) : "-"} />
        <KpiCard label="Oportunidades" value={leads > 0 ? formatNumber(opp) : "-"} />
        <KpiCard label="Won" value={won > 0 ? String(won) : "-"} trend={won >= 50 ? "up" : won >= 20 ? "neutral" : won > 0 ? "down" : "neutral"} trendValue={leads > 0 && won > 0 ? `${((won / leads) * 100).toFixed(2)}% conv.` : conversoes2026 > 0 ? `${formatNumber(conversoes2026)} conv. RD` : "Sem dados"} />
        <KpiCard label="CPW" value={cpw > 0 ? `R$ ${formatNumber(Math.round(cpw))}` : "N/A"} trend={cpw > 3000 ? "down" : cpw > 0 ? "up" : "neutral"} trendValue={cpwLabel} />
      </div>

      {cpw > 3000 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-600 mb-1">CPW Critico</h3>
          <p className="text-xs text-red-700">CPW de {formatCurrency(cpw)} esta muito acima da media (R$ 954). Revisar segmentacao ou realocar budget.</p>
        </div>
      )}

      {cpw > 0 && cpw <= 500 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-600 mb-1">Excelente Performance</h3>
          <p className="text-xs text-green-700">CPW de {formatCurrency(cpw)} - muito abaixo da media. Considerar aumentar investimento.</p>
        </div>
      )}

      {/* Graficos de funil (se houver dados) */}
      {leads > 0 && (
        <div className="grid lg:grid-cols-2 gap-4">
          <ChartWrapper title="Funil de Vendas" subtitle={nome}>
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

          <ChartWrapper title="Taxas de Conversao" subtitle="Por etapa do funil">
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
      )}

      {/* Cards de dados */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Investimento / Metricas de custo */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Investimento</h3>
          <p className="text-2xl font-bold text-[#0F1B2D]">{investimento > 0 ? formatCurrency(investimento) : "Sem registro"}</p>
          {investimento > 0 && leads > 0 && (
            <div className="mt-3 space-y-1 text-xs text-gray-500">
              <p>CPL: <span className="text-[#F06B5D] font-medium">R$ {(investimento / leads).toFixed(2)}</span></p>
              {mql > 0 && <p>CMQL: <span className="text-blue-600 font-medium">R$ {(investimento / mql).toFixed(2)}</span></p>}
              {opp > 0 && <p>COPP: <span className="text-yellow-600 font-medium">R$ {(investimento / opp).toFixed(2)}</span></p>}
              {won > 0 && <p>CPW: <span className={`font-medium ${cpwClass}`}>R$ {(investimento / won).toFixed(2)}</span></p>}
            </div>
          )}
        </div>

        {/* RD Station 2026 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Conversoes de Leads 2026</h3>
          {(rdEmp || emp2026) ? (
            <>
              <p className="text-2xl font-bold text-[#0F1B2D]">{formatNumber(rdEmp?.conversoes || emp2026?.conversoes2026 || 0)}</p>
              <p className="text-xs text-gray-400 mt-1">conversoes (RD Station)</p>
              <p className="text-lg font-semibold text-[#F06B5D] mt-2">{formatNumber(rdEmp?.contatos || emp2026?.contatos || 0)}</p>
              <p className="text-xs text-gray-400">contatos unicos</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Sem dados de conversao em 2026</p>
          )}
        </div>

        {/* Facebook Ads 2026 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Facebook Ads (2026)</h3>
          {fbCamp ? (
            <>
              <p className="text-lg font-bold text-[#0F1B2D]">{formatCurrency(fbCamp.gasto)}</p>
              <p className="text-xs text-gray-400 mt-1">investido</p>
              <div className="mt-2 space-y-1 text-xs text-gray-500">
                <p>Impressoes: <span className="text-[#0F1B2D]">{(fbCamp.impressoes / 1e6).toFixed(1)}M</span></p>
                <p>Cliques: <span className="text-[#0F1B2D]">{formatNumber(fbCamp.cliques)}</span></p>
                <p>CPC: <span className="text-[#0F1B2D]">R$ {fbCamp.cpc.toFixed(2)}</span></p>
                <p>CTR: <span className={fbCamp.ctr >= 2 ? "text-green-600" : "text-yellow-600"}>{fbCamp.ctr.toFixed(2)}%</span></p>
                <p>Plataforma: <span className="text-[#0F1B2D]">{fbCamp.plataforma}</span></p>
                <p>Tipo: <span className="text-[#0F1B2D]">{fbCamp.tipo}</span></p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">Sem campanhas ativas em 2026</p>
          )}
        </div>
      </div>

      {/* Squad info */}
      {squadInfo && (
        <div className="bg-[#FFF5F3] border border-[#F06B5D]/20 rounded-xl p-5">
          <h3 className="text-xs text-[#F06B5D] uppercase tracking-wider font-semibold mb-2">Squad Responsavel</h3>
          <p className="text-sm font-bold text-[#0F1B2D]">{squadInfo.nome}</p>
          <p className="text-xs text-gray-500 mt-1">
            Membros: {squadInfo.membros.map(m => m.nome).join(", ")}
          </p>
          {squadEmp && (
            <div className="mt-2 grid grid-cols-4 gap-3 text-center">
              <div><p className="text-[10px] text-gray-500">Leads</p><p className="text-sm font-bold text-[#0F1B2D]">{formatNumber(squadEmp.leads)}</p></div>
              <div><p className="text-[10px] text-gray-500">Won</p><p className="text-sm font-bold text-green-600">{squadEmp.won}</p></div>
              <div><p className="text-[10px] text-gray-500">CPW</p><p className={`text-sm font-bold ${cpwClass}`}>{squadEmp.cpw > 0 ? formatCurrency(squadEmp.cpw) : "-"}</p></div>
              <div><p className="text-[10px] text-gray-500">Score</p><p className="text-sm font-bold text-[#0F1B2D]">{squadEmp.score}</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
