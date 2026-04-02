"use client";
import { useState, useRef, useEffect } from "react";
import { belleKnowledge, formatCurrency, formatNumber, pipelineOverview, metricasComerciais, miaData, funnelByChannel, setores, funnelByEmpreendimento, facebookCampaigns2026, lostReasons, squads, empHealthScores, vendas2026, topSellers2026, teamPerformers2026, allEmpreendimentos2026 } from "@/data";

interface Message {
  role: "user" | "belle";
  text: string;
}

function generateResponse(input: string): string {
  const q = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // --- DEFINICOES (com calculo e origem) ---
  for (const [key, val] of Object.entries(belleKnowledge.definitions)) {
    if (q.includes(key.toLowerCase())) {
      const src = key === "CPL" || key === "CMQL" || key === "COPP" || key === "CPW" || key === "CSQL"
        ? "Calculado com dados de investimento (Facebook Ads) e funil (Pipedrive/RD Station)."
        : key === "CPC" || key === "CTR"
        ? "Fonte: Facebook Ads (facebook_ads_szi_adsinsights via NEKT)."
        : "Fonte: Pipedrive (pipedrive_v2_deals) e RD Station (rd_station_contact_events) via NEKT.";
      return `**${key}**: ${val}\n\n**Origem do dado:** ${src}\n**Periodo:** Historico ou 2026 conforme contexto da pagina.\n**Calculo:** ${val}`;
    }
  }

  // --- ORIGEM / FONTE / DE ONDE VEM ---
  if (q.includes("de onde vem") || q.includes("fonte") || q.includes("origem") || q.includes("como e calculado") || q.includes("como calcula")) {
    return `📋 **Origem dos Dados - Belle Analytics**\n\n**Fontes principais:**\n• **Pipedrive** (CRM): Deals, pipeline, atividades, stages → tabela pipedrive_v2_deals, pipedrive_v2_consolidated_deal_flow\n• **RD Station** (Marketing): Conversoes, formularios, UTMs → tabela rd_station_contact_events (283.950 eventos)\n• **Facebook Ads** (Midia paga): Impressoes, cliques, gasto → tabela facebook_ads_szi_adsinsights\n• **Meetime** (Pre-venda): Ligacoes, cadencias → tabela meetime_szs_calls\n\n**Data warehouse:** NEKT (Amazon Athena)\n**Atualizacao:** Dados sincronizados periodicamente via pipedrive-5Slo e outras sources NEKT.\n\n**Periodos:**\n• Pipedrive: Jul/2019 - Abr/2026\n• RD Station: Jan/2024 - Abr/2026\n• Facebook Ads: Jun/2023 - Mar/2026\n• Dashboard prioriza: **Jan-Mar 2026**`;
  }

  // --- HISTORICO vs ATUAL ---
  if (q.includes("historico") || q.includes("esse ano") || q.includes("so esse ano") || q.includes("periodo") || q.includes("que ano") || q.includes("ta alto por que") || q.includes("esse numero")) {
    return `📅 **Contexto Temporal dos Dados**\n\n**Regra do sistema:** O dashboard prioriza dados de **2026 (Jan-Mar)**. Dados anteriores aparecem apenas como comparacao.\n\n**Como identificar:**\n• Cards com "Historico" = dados desde Jul/2019\n• Cards com "2026 (Jan-Mar)" = apenas periodo atual\n• Cards com "Snapshot atual" = valor do momento\n\n**Exemplos:**\n• Deals Won (12.515) = **Historico** desde 2019\n• Atividades do Time (26.914) = **Apenas 2026**\n• Leads Abertos (2.358) = **Snapshot** de agora\n\nSe voce vir um numero sem contexto temporal, me avise que eu identifico a origem.`;
  }

  // --- RESPONSAVEL / QUEM CUIDA ---
  if (q.includes("responsavel") || q.includes("quem cuida") || q.includes("quem e responsavel") || q.includes("dono")) {
    return `👤 **Responsaveis por Area**\n\n**Squad 1 (Hellen + Lua):**\n• Pre-vendas: Hellen Dias (7.312 calls em 2026)\n• Closer: Luana Schaikoski (25 deals won, R$ 8M)\n• Empreendimentos: Ponta das Canas, Itacare, Marista 144, Jurere II/III, Vistas de Anita\n\n**Squad 2 (Jeni + Filipe):**\n• Pre-vendas: Jeniffer Correa (1.984 calls em 2026)\n• Closer: Filipe Padoveze (72 deals won, R$ 778K)\n• Empreendimentos: Barra Grande, Natal, NC2, Caragua, Bonito\n\n**Para saber quem cuida de um empreendimento especifico, pergunte:** "Quem cuida do [nome]?"`;
  }

  // --- EMPREENDIMENTO ESPECIFICO ---
  const empNames = [...funnelByEmpreendimento.map(e => e.nome.toLowerCase()), ...allEmpreendimentos2026.map(e => e.nome.toLowerCase())];
  const matchedEmp = empNames.find(name => q.includes(name.split(" ")[0]));
  if (matchedEmp || q.includes("empreendimento") || q.includes("melhor empreendimento") || q.includes("pior empreendimento")) {
    if (matchedEmp) {
      const emp = funnelByEmpreendimento.find(e => e.nome.toLowerCase().includes(matchedEmp.split(" ")[0]));
      const emp26 = allEmpreendimentos2026.find(e => e.nome.toLowerCase().includes(matchedEmp.split(" ")[0]));
      const sq = squads.find(s => s.empreendimentos.some(e => e.nome.toLowerCase().includes(matchedEmp.split(" ")[0])));
      const nome = emp?.nome || emp26?.nome || matchedEmp;
      const fb = facebookCampaigns2026.find(c => c.nome.toLowerCase().includes(matchedEmp.split(" ")[0]));

      let resp = `🏗️ **${nome}**\n\n`;
      if (emp) {
        resp += `**Funil (historico):** ${formatNumber(emp.leads)} leads → ${formatNumber(emp.mql)} MQL → ${formatNumber(emp.sql)} SQL → ${formatNumber(emp.opp)} OPP → ${emp.won} Won\n`;
        resp += `**Conversao Lead→Won:** ${((emp.won / emp.leads) * 100).toFixed(2)}%\n`;
        if (emp.cpw > 0) resp += `**CPW:** R$ ${formatNumber(Math.round(emp.cpw))} (${emp.cpw > 3000 ? "CRITICO" : emp.cpw > 1000 ? "Regular" : "Bom"})\n`;
        if (emp.investimento > 0) resp += `**Investimento:** ${formatCurrency(emp.investimento)}\n`;
        resp += `**Origem:** dataset_szi (funil) + Pipedrive (deals)\n`;
      }
      if (emp26) resp += `**Conversoes 2026 (RD Station):** ${formatNumber(emp26.conversoes2026)} conversoes, ${formatNumber(emp26.contatos)} contatos unicos\n`;
      if (fb) resp += `**Facebook Ads 2026:** ${formatCurrency(fb.gasto)} gasto | ${formatNumber(fb.cliques)} cliques | CPC R$ ${fb.cpc} | ${fb.plataforma} (${fb.tipo})\n`;
      if (sq) resp += `\n**Squad responsavel:** ${sq.nome}\n**Membros:** ${sq.membros.map(m => `${m.nome} (${m.role})`).join(", ")}`;

      return resp;
    }

    const best = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => a.cpw - b.cpw)[0];
    const worst = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => b.cpw - a.cpw)[0];
    return `🏗️ **Analise de Empreendimentos**\n\n✅ **Melhor CPW:** ${best.nome} (R$ ${best.cpw.toFixed(2)}) - ${best.won} vendas\n❌ **Pior CPW:** ${worst.nome} (R$ ${formatNumber(Math.round(worst.cpw))}) - ${worst.won} vendas\n\n**Top 3 por volume:**\n${funnelByEmpreendimento.sort((a, b) => b.won - a.won).slice(0, 3).map(e => `• ${e.nome}: ${e.won} won`).join("\n")}\n\n**Top 3 conversoes 2026 (RD Station):**\n${allEmpreendimentos2026.slice(0, 3).map(e => `• ${e.nome}: ${formatNumber(e.conversoes2026)} conv.`).join("\n")}\n\n**Origem:** dataset_szi (funil historico) + rd_station_contact_events (2026) + Pipedrive`;
  }

  // --- PIPELINE / OVERVIEW ---
  if (q.includes("pipeline") || q.includes("visao geral") || q.includes("overview") || q.includes("resumo") || q.includes("como esta") || q.includes("situacao")) {
    return `📊 **Visao Geral do Pipeline**\n**Periodo:** Historico (Jul/2019 - Mar/2026)\n\n• **Total de Deals:** ${formatNumber(pipelineOverview.totalDeals)}\n• **Won:** ${formatNumber(pipelineOverview.won.deals)} (${formatCurrency(pipelineOverview.won.valor)})\n• **Lost:** ${formatNumber(pipelineOverview.lost.deals)} (${formatCurrency(pipelineOverview.lost.valor)})\n• **Open:** ${formatNumber(pipelineOverview.open.deals)}\n• **Win Rate:** ${pipelineOverview.winRate}%\n• **Ticket Medio:** ${formatCurrency(pipelineOverview.won.ticketMedio)}\n\n**Origem:** pipedrive_v2_deals (195.327 registros)\n**Calculo Win Rate:** Won / (Won + Lost) * 100 = ${pipelineOverview.winRate}%\n\n⚠️ **Alerta:** Win rate caindo de 10,8% (Jan/25) para 2,7% (Mar/26). Causa provavel: aumento de volume sem aumento proporcional de qualificacao.`;
  }

  // --- GARGALOS ---
  if (q.includes("gargalo") || q.includes("critico") || q.includes("o que fazer") || q.includes("acao")) {
    return `⚠️ **Gargalos e Acoes Recomendadas**\n**Periodo:** Analise historica + 2026\n\n**1. Contato (37% dos lost)**\n• Dado: 65.779 deals perdidos por "Nao atende"\n• Fonte: pipedrive_v2_deals.lost_reason\n• Acao: Cadencia multi-canal automatica (WhatsApp→Call→Email→SMS)\n• Impacto estimado: R$ 18,7M recuperavel (5% dos lost)\n\n**2. Win Rate em queda**\n• Dado: 10,8% (Jan/25) → 2,7% (Mar/26)\n• Fonte: pipedrive_v2_consolidated_deal_flow (status changes)\n• Causa: Volume de leads cresceu mas qualidade caiu\n• Acao: Auditar qualidade por fonte no RD Station\n\n**3. MIA no-show (60%)**\n• Dado: 2.597 reunioes, 1.548 no-shows\n• Fonte: pipedrive_v2_consolidated_deal_flow (owner=Morada-Mia)\n• Acao: Confirmacao 24h + lembrete 1h antes\n• Impacto: +R$ 15,7M se reduzir para 20%\n\n**4. MQL→SQL no MKT (21,7%)**\n• Dado: 24.440 MQLs → 5.307 SQLs\n• Fonte: dataset_szi\n• Acao: Scoring mais rigoroso antes da pre-venda\n\n**5. Morro das Pedras (CPW R$ 11.400)**\n• Acao: Suspender investimento e realocar para Marista 144 (CPW R$ 104)`;
  }

  // --- SQUADS ---
  if (q.includes("squad") || q.includes("hellen") || q.includes("lua") || q.includes("jeni") || q.includes("filipe")) {
    const sorted = [...squads].sort((a, b) => b.score - a.score);
    return `⚡ **Squads Comerciais**\n**Periodo:** Dados 2026 (Jan-Mar) + historico de funil\n\n${squads.map(sq => {
      const icon = sq.status === "saudavel" ? "🟢" : sq.status === "atencao" ? "🟡" : "🔴";
      return `${icon} **${sq.nome}**\n• Tipo: ${sq.tipo}\n• Score: ${sq.score}/100 | Ocupacao: ${sq.ocupacao}%\n• Funil: ${formatNumber(sq.metricas.leads)} leads → ${sq.metricas.won} won\n• Membros: ${sq.membros.map(m => `${m.nome} (${m.role})`).join(", ")}\n• Investimento: ${formatCurrency(sq.metricas.investimento)}\n• Alertas: ${sq.alertas.length > 0 ? sq.alertas.slice(0, 2).join("; ") : "Nenhum"}`;
    }).join("\n\n")}\n\n**Melhor:** ${sorted[0].nome} (score ${sorted[0].score})\n**Fonte:** Squads definidos em CLAUDE.md + dados Pipedrive/RD Station\n\n**Acao recomendada:** ${sorted[sorted.length - 1].alertas.length > 0 ? sorted[sorted.length - 1].alertas[0] : "Manter operacao atual"}`;
  }

  // --- MIA ---
  if (q.includes("mia") || q.includes("morada") || q.includes("inteligencia artificial")) {
    return `🤖 **MIA (Morada.ai) - 2026 (Jan-Mar)**\n\n• Atividades: ${formatNumber(miaData.totalAtividades)} (#${miaData.ranking} no ranking geral)\n• Reunioes agendadas: ${formatNumber(miaData.reunioesAgendadas)}\n• No-Shows: ${formatNumber(miaData.noShows)} (**${miaData.taxaNoShow}%** - CRITICO)\n• Reunioes efetivas: ${formatNumber(miaData.reunioesEfetivas)}\n• Deals won: 15 (Pipedrive)\n\n**Origem:** pipedrive_v2_consolidated_deal_flow WHERE owner_name = 'Morada - Mia'\n**Calculo no-show:** no_shows / reunioes_agendadas * 100 = ${miaData.taxaNoShow}%\n\n**Comparativo:**\n• MIA agenda 4,4x mais reunioes que humanos\n• Mas tem 60% no-show vs 8,3% media humana\n\n**Diagnostico:** MIA e excelente em volume mas falha em efetividade.\n**Causa provavel:** Agendamento com leads pouco qualificados + falta de confirmacao.\n**Acao:** Confirmacao 24h antes (WhatsApp) + qualificacao mais rigorosa.\n**Impacto estimado:** Se no-show cair para 20% → +552 reunioes efetivas → ~83 deals → R$ 7,2M`;
  }

  // --- CAMPANHAS ---
  if (q.includes("campanha") || q.includes("facebook") || q.includes("meta") || q.includes("ads") || q.includes("midia")) {
    const top5 = facebookCampaigns2026.slice(0, 5);
    const totalGasto = facebookCampaigns2026.reduce((s, c) => s + c.gasto, 0);
    return `📣 **Facebook Ads - 2026 (Jan-Mar)**\n**Fonte:** facebook_ads_szi_adsinsights via NEKT\n\n**Resumo:** ${facebookCampaigns2026.length} campanhas | ${formatCurrency(totalGasto)} investido\n\n**Top 5 por investimento:**\n${top5.map((c, i) => `${i + 1}. **${c.nome}**\n   Gasto: ${formatCurrency(c.gasto)} | Cliques: ${formatNumber(c.cliques)} | CPC: R$ ${c.cpc} | CTR: ${c.ctr}%\n   Plataforma: ${c.plataforma} | Tipo: ${c.tipo}`).join("\n")}\n\n**Insights:**\n• Melhor CPC: Ponta das Canas (R$ 1,86) - video em FB+IG\n• Melhor CTR: Ponta das Canas II (1,94%) - video regional\n• Campanhas regionais (RS/SC/PR) performam melhor que nacionais\n• Videos tem CTR superior a imagens estaticas`;
  }

  // --- VENDAS ---
  if (q.includes("venda") || q.includes("receita") || q.includes("faturamento") || q.includes("fechamento")) {
    const totalValor = vendas2026.reduce((s, v) => s + v.valor, 0);
    const totalDeals = vendas2026.length;
    const byVendedor = Object.entries(vendas2026.reduce((acc, v) => { acc[v.vendedor] = (acc[v.vendedor] || 0) + v.valor; return acc; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]);
    return `💰 **Vendas 2026 (Jan-Mar)**\n**Fonte:** pipedrive_v2_deals (status=won, won_time>=2026-01-01)\n\n• Total: ${formatCurrency(totalValor)} em ${totalDeals} deals\n• Ticket medio: ${formatCurrency(Math.round(totalValor / totalDeals))}\n\n**Top vendedores por valor:**\n${byVendedor.slice(0, 5).map(([nome, val]) => `• ${nome}: ${formatCurrency(val)}`).join("\n")}\n\n**Top vendedores por volume (Pipedrive 2026):**\n${topSellers2026.slice(0, 5).map(s => `• ${s.nome}: ${s.dealsWon} deals won`).join("\n")}\n\n**Insight:** Luana Schaikoski tem maior ticket medio (R$ 320K). Fabio Cristiano lidera em valor total (R$ 13,6M com 43 deals).`;
  }

  // --- PERDAS ---
  if (q.includes("perda") || q.includes("lost") || q.includes("perdido") || q.includes("motivo") || q.includes("por que perd")) {
    return `❌ **Motivos de Perda**\n**Periodo:** Historico\n**Fonte:** pipedrive_v2_deals.lost_reason\n\n${lostReasons.map(r => `• **${r.motivo}**: ${formatNumber(r.total)} deals (${r.pct}%)`).join("\n")}\n\n**Analise:**\n• **49% das perdas** sao por problemas de CONTATO (nao atende + sem conexao + parou + sem resposta)\n• Isso representa ~87.500 deals perdidos\n• Valor medio de deal lost: R$ 4.537\n\n**Por que isso acontece?**\n1. Leads de marketing sao mais frios (curiosos vs interessados)\n2. Cadencia de follow-up insuficiente\n3. Canal unico (so ligacao, sem WhatsApp)\n\n**Acao:** Multi-canal automatico + MIA com confirmacao = potencial R$ 18,7M`;
  }

  // --- SETORES ---
  if (q.includes("setor") || q.includes("szi") || q.includes("szs") || q.includes("parceiro") || q.includes("marketplace")) {
    return `🏢 **Setores (2026)**\n**Fonte:** pipedrive_v2_deals por pipeline_id\n\n${setores.map(s => {
      const wr = ((s.wonTotal / (s.wonTotal + s.lostTotal)) * 100).toFixed(1);
      return `• **${s.nome}** (Pipeline #${s.pipeline})\n  Won: ${s.wonTotal} | Lost: ${formatNumber(s.lostTotal)} | Win Rate: ${wr}%\n  Valor: ${s.valorTotal > 0 ? formatCurrency(s.valorTotal) : "N/A"} | Leads abertos: ${s.leadsAbertos}${s.cpl > 0 ? `\n  CPL: R$ ${s.cpl} | CMQL: R$ ${s.cmql} | CSQL: R$ ${s.csql} | COPP: R$ ${s.copp}` : ""}`;
    }).join("\n\n")}\n\n**Insight:** Canal Parceiros (Pipeline #7) converte 6,8x mais que MKT com custo zero.`;
  }

  // --- PREVISAO ---
  if (q.includes("previsao") || q.includes("forecast") || q.includes("projecao") || q.includes("futuro") || q.includes("tendencia") || q.includes("meta")) {
    const prevTotal = squads.reduce((s, sq) => s + sq.previsaoWon, 0);
    return `🔮 **Projecao e Tendencias**\n**Base:** Dados Jan-Mar/2026 extrapolados\n\n• **Media mensal 2026:** ~465 deals won/mes\n• **Projecao anual 2026:** ~5.580 deals\n• **Ticket medio atual:** R$ 53K (queda de 39% vs historico R$ 87K)\n• **Volume:** Compensando queda de ticket com mais deals\n\n**Previsao por Squad:**\n${squads.map(sq => `• ${sq.nome.split(" - ")[0]}: ${sq.previsaoWon} won (proximo periodo)`).join("\n")}\n• Total previsto: ${prevTotal} deals\n\n**Riscos:**\n• Win rate em queda (10,8% → 2,7%) pode reduzir volume futuro\n• MIA com 60% no-show limita pipeline\n\n**Oportunidades:**\n• Otimizar MIA: potencial +R$ 7-15M\n• Escalar Parceiros: ROI infinito\n• Realocar budget de empreendimentos criticos\n\n**Calculo:** Previsao = Won historico * 1.1 (crescimento estimado 10%)`;
  }

  // --- CANAL / FUNIL ---
  if (q.includes("canal") || q.includes("conversao") || q.includes("funil") || q.includes("mkt") || q.includes("parc")) {
    return `🔄 **Funil por Canal**\n**Fonte:** dataset_szi\n\n${funnelByChannel.map(ch => {
      const rate = ((ch.won / ch.leads) * 100).toFixed(2);
      return `**${ch.canal}**: ${formatNumber(ch.leads)} leads → ${formatNumber(ch.mql)} MQL → ${formatNumber(ch.sql)} SQL → ${formatNumber(ch.opp)} OPP → ${ch.won} Won\n  Conversao: ${rate}% | Investimento: ${ch.investimento > 0 ? formatCurrency(ch.investimento) : "R$ 0"}`;
    }).join("\n\n")}\n\n**Taxas de conversao MKT:**\n• Lead→MQL: 62% | MQL→SQL: 21,7% (GARGALO) | SQL→OPP: 34,5% | OPP→Won: 14,6%\n\n**PARC vs MKT:** Parceiros converte 6,8x mais (4,6% vs 0,68%) com custo zero.\n**Calculo:** Won / Leads * 100`;
  }

  // --- NAO SEI / TRANSPARENCIA ---
  if (q.includes("nao sei") || q.includes("nao entendi") || q.includes("explica melhor")) {
    return `Sem problema! Me diga especificamente o que voce quer entender e eu explico com:\n\n• **Origem do dado** (de qual sistema vem)\n• **Calculo** (formula usada)\n• **Periodo** (que datas estao consideradas)\n• **Responsavel** (quem cuida daquela area)\n\nExemplos:\n• "De onde vem o numero de deals won?"\n• "Como e calculado o CPW?"\n• "Quem cuida do Marista 144?"\n• "Esse dado e de 2026 ou historico?"`;
  }

  // --- DEFAULT ---
  return `Ola! Sou a **Belle**, analista senior de vendas e marketing da Seazone.\n\nPosso responder com profundidade sobre:\n\n📊 **Dados** - "De onde vem esse dado?", "Como e calculado?"\n📅 **Periodo** - "Isso e historico ou 2026?"\n👤 **Responsaveis** - "Quem cuida desse empreendimento?"\n⚠️ **Gargalos** - "Qual o maior problema?", "O que fazer?"\n⚡ **Squads** - "Como esta o Squad 1?"\n💰 **Vendas** - "Como estao as vendas em 2026?"\n📣 **Campanhas** - "Qual campanha performa melhor?"\n🏗️ **Empreendimentos** - "Como esta o Marista 144?"\n🤖 **MIA** - "A MIA esta funcionando?"\n🔮 **Previsoes** - "Qual a projecao?"\n❌ **Perdas** - "Por que perdemos deals?"\n🏢 **Setores** - "Como esta o SZI?"\n\nPara cada resposta, informo: **origem, calculo, periodo e responsavel**.`;
}

export default function BelleChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "belle", text: "Ola! Sou a **Belle**, analista senior de vendas e marketing da Seazone. Posso explicar qualquer metrica, identificar gargalos e recomendar acoes. Pergunte qualquer coisa!" }
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
    }, 500);
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
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-[#0F1B2D] px-4 py-3 flex items-center gap-3">
            <img src="/belle-avatar.svg" alt="Belle" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h3 className="text-sm font-semibold text-white">Belle - Analista Senior</h3>
              <p className="text-[10px] text-gray-400">Seazone | Respostas com origem, calculo e periodo</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: 420 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
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
                placeholder="Ex: De onde vem o CPW? Quem cuida do Marista?"
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
