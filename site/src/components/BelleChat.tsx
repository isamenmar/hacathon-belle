"use client";
import { useState, useRef, useEffect } from "react";
import { belleKnowledge, formatCurrency, formatNumber, pipelineOverview, metricasComerciais, miaData, funnelByChannel, setores, funnelByEmpreendimento, facebookCampaigns2026, lostReasons, squads, empHealthScores, vendas2026 } from "@/data";

interface Message {
  role: "user" | "belle";
  text: string;
}

function generateResponse(input: string): string {
  const q = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Definitions
  for (const [key, val] of Object.entries(belleKnowledge.definitions)) {
    if (q.includes(key.toLowerCase())) {
      return `**${key}**: ${val}`;
    }
  }

  // Data sources
  for (const [key, val] of Object.entries(belleKnowledge.dataSources)) {
    if (q.includes(key.toLowerCase())) {
      return `**${key}**: ${val}`;
    }
  }

  // Pipeline / overview
  if (q.includes("pipeline") || q.includes("visao geral") || q.includes("overview") || q.includes("resumo")) {
    return `📊 **Visão Geral do Pipeline**\n\n• Total de Deals: ${formatNumber(pipelineOverview.totalDeals)}\n• Won: ${formatNumber(pipelineOverview.won.deals)} (${formatCurrency(pipelineOverview.won.valor)})\n• Lost: ${formatNumber(pipelineOverview.lost.deals)}\n• Open: ${formatNumber(pipelineOverview.open.deals)}\n• Win Rate: ${pipelineOverview.winRate}%\n• Ticket Médio: ${formatCurrency(pipelineOverview.won.ticketMedio)}`;
  }

  // Gargalos
  if (q.includes("gargalo") || q.includes("problema") || q.includes("critico")) {
    return `⚠️ **Principais Gargalos Identificados**\n\n1. **37% dos deals perdidos por "Não atende"** - 65.779 deals. Recomendo cadência multi-canal automatizada.\n2. **Win rate caindo** de 10,8% (Jan/25) para 2,7% (Mar/26). Necessário auditar qualidade de leads.\n3. **MIA com 60% de no-show** em 2026 - agenda muitas reuniões mas leads não comparecem.\n4. **Morro das Pedras Spot** com CPW de R$ 11.400 - recomendo suspender investimento.\n5. **Conversão MQL→SQL no MKT** apenas 21,7% - principal gargalo do funil.`;
  }

  // MIA
  if (q.includes("mia") || q.includes("ia") || q.includes("morada") || q.includes("inteligencia artificial")) {
    return `🤖 **MIA (Morada.ai) - 2026**\n\n• Atividades: ${formatNumber(miaData.totalAtividades)} (#${miaData.ranking} no ranking)\n• Reuniões agendadas: ${formatNumber(miaData.reunioesAgendadas)}\n• No-Shows: ${formatNumber(miaData.noShows)} (${miaData.taxaNoShow}%)\n• Reuniões efetivas: ${formatNumber(miaData.reunioesEfetivas)}\n\n**Diagnóstico:** A MIA agenda 4,4x mais reuniões que humanos, mas 60% resultam em no-show. Recomendo confirmação 24h antes e qualificação mais rigorosa.`;
  }

  // Campanhas
  if (q.includes("campanha") || q.includes("facebook") || q.includes("meta") || q.includes("ads")) {
    const top3 = facebookCampaigns2026.slice(0, 3);
    return `📣 **Top Campanhas Facebook Ads (2026)**\n\n${top3.map((c, i) => `${i + 1}. **${c.nome}**: Gasto ${formatCurrency(c.gasto)} | ${formatNumber(c.cliques)} cliques | CPC R$ ${c.cpc.toFixed(2)} | CTR ${c.ctr}%`).join("\n")}\n\n**Insight:** Campanhas CBO regionais (RS/SC/PR) têm melhor CTR que nacionais. Ponta das Canas II tem melhor CPC (R$ 1,86).`;
  }

  // Perdas / lost
  if (q.includes("perda") || q.includes("lost") || q.includes("perdido") || q.includes("motivo")) {
    return `❌ **Top Motivos de Perda**\n\n${lostReasons.slice(0, 5).map(r => `• ${r.motivo}: ${formatNumber(r.total)} (${r.pct}%)`).join("\n")}\n\n**49% das perdas** são por problemas de contato. Potencial de R$ 18,7M recuperável com melhoria de 5%.`;
  }

  // Empreendimento
  if (q.includes("empreendimento") || q.includes("melhor empreendimento") || q.includes("pior empreendimento")) {
    const best = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => a.cpw - b.cpw)[0];
    const worst = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => b.cpw - a.cpw)[0];
    return `🏗️ **Análise de Empreendimentos**\n\n✅ **Melhor CPW:** ${best.nome} (R$ ${best.cpw.toFixed(2)}) - ${best.won} vendas\n❌ **Pior CPW:** ${worst.nome} (R$ ${formatNumber(worst.cpw)}) - ${worst.won} vendas\n\n**Top 3 por volume de vendas:**\n${funnelByEmpreendimento.sort((a, b) => b.won - a.won).slice(0, 3).map(e => `• ${e.nome}: ${e.won} won`).join("\n")}`;
  }

  // Squads
  if (q.includes("squad") || q.includes("hellen") || q.includes("lua") || q.includes("jeni") || q.includes("filipe") || q.includes("pior squad") || q.includes("melhor squad") || q.includes("problema")) {
    const sorted = [...squads].sort((a, b) => b.score - a.score);
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    return `⚡ **Squads Comerciais**\n\n${squads.map(sq => {
      const icon = sq.status === "saudavel" ? "🟢" : sq.status === "atencao" ? "🟡" : "🔴";
      return `${icon} **${sq.nome}**\n  Score: ${sq.score} | Ocupação: ${sq.ocupacao}% | Won: ${sq.metricas.won}\n  Membros: ${sq.membros.map(m => m.nome).join(", ")}\n  Alertas: ${sq.alertas.length > 0 ? sq.alertas[0] : "Nenhum"}`;
    }).join("\n\n")}\n\n**Melhor squad:** ${best.nome} (score ${best.score})\n**Squad com mais alertas:** ${worst.nome} (${worst.alertas.length} alertas)\n\n**Ação recomendada:** ${worst.alertas.length > 0 ? worst.alertas[0] : "Manter operação atual"}`;
  }

  // Setores
  if (q.includes("setor") || q.includes("szi") || q.includes("szs") || q.includes("parceiro")) {
    return `🏢 **Métricas por Setor (2026)**\n\n${setores.map(s => `• **${s.nome}**: ${s.wonTotal} won | ${s.lostTotal} lost | Win Rate: ${((s.wonTotal / (s.wonTotal + s.lostTotal)) * 100).toFixed(1)}%${s.valorTotal > 0 ? ` | ${formatCurrency(s.valorTotal)}` : ""}`).join("\n")}`;
  }

  // Previsão / forecast
  if (q.includes("previsao") || q.includes("forecast") || q.includes("projecao") || q.includes("futuro") || q.includes("tendencia")) {
    return `🔮 **Projeção e Tendências**\n\n• **Média mensal 2026:** ~465 deals won/mês\n• **Projeção anual 2026:** ~5.580 deals (vs 5.577 em 2025)\n• **Ticket médio:** Em queda (R$ 53K em 2026 vs R$ 87K histórico)\n• **Volume:** Compensando queda de ticket com mais deals\n\n⚠️ **Alerta:** Win rate caindo. Se mantiver tendência, 2026 pode ter mais volume mas menos receita total.\n\n**Recomendação:** Focar em canal Parceiros (6,8x mais conversão) e otimizar MIA (reduzir no-show de 60% para 20%).`;
  }

  // Canal / conversão
  if (q.includes("canal") || q.includes("conversao") || q.includes("funil")) {
    return `🔄 **Funil por Canal**\n\n${funnelByChannel.map(ch => `**${ch.canal}**: ${formatNumber(ch.leads)} leads → ${ch.won} won (${((ch.won / ch.leads) * 100).toFixed(2)}%)`).join("\n")}\n\n**Insight principal:** Canal PARC converte 6,8x mais que MKT com custo zero. Investir em expansão de parceiros tem ROI infinito.`;
  }

  // Vendas
  if (q.includes("venda") || q.includes("vendas") || q.includes("receita") || q.includes("faturamento")) {
    const totalValor = vendas2026.reduce((s, v) => s + v.valor, 0);
    const totalDeals = vendas2026.length;
    const byVendedor = Object.entries(vendas2026.reduce((acc, v) => { acc[v.vendedor] = (acc[v.vendedor] || 0) + v.valor; return acc; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]);
    return `💰 **Vendas 2026 (Jan-Mar)**\n\n• Total: ${formatCurrency(totalValor)} em ${totalDeals} deals\n• Ticket médio: ${formatCurrency(Math.round(totalValor / totalDeals))}\n\n**Top vendedores por valor:**\n${byVendedor.slice(0, 5).map(([nome, val]) => `• ${nome}: ${formatCurrency(val)}`).join("\n")}\n\n**Insight:** Luana Schaikoski e Filipe Padoveze (membros dos squads) concentram os maiores valores por deal.`;
  }

  // Default
  return `Olá! Sou a **Belle**, sua analista de vendas e marketing. Posso ajudar com:\n\n• **Definições** - "O que é CPL?", "O que é MQL?"\n• **Gargalos** - "Quais são os gargalos do funil?"\n• **Campanhas** - "Como estão as campanhas?"\n• **Vendas** - "Como estão as vendas?"\n• **Squads** - "Como estão os squads?"\n• **Setores** - "Métricas por setor"\n• **Empreendimentos** - "Qual melhor empreendimento?"\n• **MIA** - "Como está a performance da IA?"\n• **Previsões** - "Qual a projeção de vendas?"\n• **Perdas** - "Por que estamos perdendo deals?"`;
}

export default function BelleChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "belle", text: "Olá! Sou a **Belle**, sua analista de vendas e marketing da Seazone. Como posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "belle", text: generateResponse(userMsg) }]);
    }, 400);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#F06B5D] hover:bg-[#e05a4c] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <img src="/belle-avatar.svg" alt="Belle" className="w-10 h-10 rounded-full" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-[#0F1B2D] px-4 py-3 flex items-center gap-3">
            <img src="/belle-avatar.svg" alt="Belle" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <h3 className="text-sm font-semibold text-white">Belle</h3>
              <p className="text-[10px] text-gray-400">Analista IA • Seazone</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: 380 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-[#F06B5D] text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm"
                }`}>
                  {m.text.split("**").map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Pergunte sobre vendas, marketing..."
                className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F06B5D]/50 text-gray-700"
              />
              <button
                onClick={send}
                className="px-3 py-2 bg-[#F06B5D] text-white rounded-lg text-xs font-medium hover:bg-[#e05a4c] transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
