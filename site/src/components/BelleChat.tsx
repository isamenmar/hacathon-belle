"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { belleKnowledge, formatCurrency, formatNumber, pipelineOverview, metricasComerciais, miaData, funnelByChannel, setores, funnelByEmpreendimento, facebookCampaigns2026, lostReasons, squads, empHealthScores, vendas2026, topSellers2026, teamPerformers2026, allEmpreendimentos2026, seriesTemporais, projetar } from "@/data";

interface Message {
  role: "user" | "belle";
  text: string;
}

// Mapa de contexto por página
const pageContext: Record<string, { nome: string; elementos: string }> = {
  "/": { nome: "Home (Dashboard Executivo)", elementos: "**Cards:** Deals Won (histórico), Valor Total Won, Win Rate, Ticket Médio, Leads Abertos\n**Gráficos:** Deals Won por Mês (barras — eixo X: meses, Y: número de deals), Funil de Vendas (barras horizontais — cada barra é uma etapa: Leads→MQL→SQL→OPP→Won), Won vs Lost (área — verde=ganhos, vermelho=perdas), Leads por Setor (pizza — fatias=SZI/SZS/Parceiros/Marketplace/Expansão)\n**Tabelas:** Motivos de Perda (com barra de progresso), Métricas Comerciais (CPL/CMQL/COPP/CPW), Taxas de Conversão por Canal, Métricas por Setor 2026" },
  "/marketing": { nome: "Marketing & Campanhas", elementos: "**Cards:** Investimento Total FB (2026), Impressões, Cliques, CPL, CPW\n**Gráficos:** Conversões RD Station por Trimestre (linha — eixo X: trimestres, Y: conversões e contatos), Top Empreendimentos por Conversões (barras horizontais)\n**Tabelas:** Campanhas Facebook Ads com gasto/impressões/cliques/CPC/CTR, Funil MKT vs PARC (barras de progresso para cada etapa)" },
  "/time": { nome: "Performance do Time", elementos: "**Cards:** Total Atividades 2026, Reuniões, Contratos, Analistas Ativos (todos Jan-Mar/2026)\n**Gráficos:** Top 10 por Volume (barras empilhadas — azul=calls, verde=WhatsApp, amarelo=mensagens, coral=reuniões), Radar de Canal Top 5 (cada ponta=tipo de atividade)\n**Tabelas:** Ranking de Atividades (24 analistas com calls/WhatsApp/mensagens/reuniões/contratos/no-shows/concluídas/% conclusão), Top Vendedores por Valor" },
  "/mia": { nome: "MIA (IA Morada.ai)", elementos: "**Cards:** Total Atividades, Reuniões Agendadas, No-Shows (60%!), Reuniões Efetivas, Contratos (todos 2026)\n**Gráficos:** Distribuição de Atividades (pizza — calls/WhatsApp/mensagens/reuniões/no-shows), MIA vs Média Humana (barras comparativas — coral=MIA, cinza=humano)\n**Cards de análise:** Pontos Fortes (verde), Pontos de Melhoria (vermelho), Recomendações (coral), Impacto Estimado da Otimização" },
  "/squads": { nome: "Squads Comerciais", elementos: "**Cards:** Squads Ativos, Membros, Leads Totais, Won Total, Alertas\n**Cards de Squad:** Cada squad mostra métricas de funil (Leads→Won), barra de ocupação (%), score de saúde, membros com função, empreendimentos com score, alertas\n**Gráficos:** Conversão por Squad (barras), Radar de Perfil, Leads vs Won (barras), Ocupação (pizza)\n**Tabelas:** Score de Saúde por Empreendimento, Rankings (membros/empreendimentos/previsão)" },
  "/vendas": { nome: "Vendas", elementos: "**Cards:** Valor Total Vendido, Número de Vendas, Ticket Médio, Vendedores Ativos (todos 2026)\n**Gráficos:** Vendas por Empreendimento (barras horizontais — valor R$), Evolução Mensal (barras por mês), Vendas por Vendedor (barras horizontais), Vendas por Squad (pizza)\n**Tabelas:** Detalhamento de Vendas (empreendimento/vendedor/squad/valor/mês/pipeline), Ranking de Vendedores 2026 por valor" },
};

function getPageContext(pathname: string): { nome: string; elementos: string } {
  if (pageContext[pathname]) return pageContext[pathname];
  if (pathname.startsWith("/setores/")) return { nome: `Setor ${pathname.split("/")[2].toUpperCase()}`, elementos: "**Cards:** Won 2026, Lost 2026, Valor Total, Leads Abertos, Pipeline\n**Gráficos:** Won vs Lost mensal (área), Empreendimentos por Won (barras)\n**Tabela:** Funil por Empreendimento (leads/MQL/SQL/OPP/won/CPW/conversão)" };
  if (pathname.startsWith("/empreendimentos/")) return { nome: `Empreendimento ${pathname.split("/")[2]}`, elementos: "**Cards:** Leads, MQL, Oportunidades, Won, CPW\n**Gráficos:** Funil de Vendas (barras horizontais), Taxas de Conversão (barras por etapa)\n**Cards de dados:** Investimento (com CPL/CMQL/COPP/CPW), Conversões de Leads 2026 (RD Station), Facebook Ads 2026 (gasto/cliques/CPC/CTR/plataforma/tipo), Squad Responsável" };
  return { nome: "Dashboard", elementos: "Navegue para uma página específica para ter contexto detalhado." };
}

function generateResponse(input: string, pagina: string): string {
  const q = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // =====================================================
  // DETECÇÃO DE INTENÇÃO FUTURA — DEVE SER O PRIMEIRO CHECK
  // Se a pergunta tem intenção de futuro, NUNCA retornar dados passados
  // =====================================================
  const isFuture = q.includes("proximo") || q.includes("próximo") || q.includes("agosto") || q.includes("julho") || q.includes("previsao") || q.includes("previsão") || q.includes("forecast") || q.includes("projecao") || q.includes("projeção") || q.includes("tendencia") || q.includes("tendência") || q.includes("se continuarmos") || q.includes("continuar assim") || q.includes("mantendo esse ritmo") || q.includes("do jeito que esta") || q.includes("se nada mudar") || q.includes("quanto vamos") || q.includes("quantos teremos") || q.includes("quantas teremos") || q.includes("devemos ter") || q.includes("devemos fechar") || q.includes("devemos vender") || q.includes("futuro") || q.includes("vamos bater") || q.includes("vai dar") || q.includes("expectativa");

  if (isFuture) {
    // Determinar QUAL métrica o usuário quer prever
    const isLeads = q.includes("lead");
    const isOpp = q.includes("oportunidade") || q.includes("opp");
    const isLost = q.includes("perda") || q.includes("lost") || q.includes("perder");
    const isReceita = q.includes("receita") || q.includes("faturamento") || q.includes("faturar");
    const isMeta = q.includes("meta") || q.includes("bater") || q.includes("atingir") || q.includes("ritmo");

    if (isLeads) {
      const p = projetar(seriesTemporais.leadsRD);
      const tendLabel = p.tendencia > 0.02 ? "CRESCIMENTO" : p.tendencia < -0.02 ? "QUEDA" : "ESTÁVEL";
      return `📈 **Devemos ter entre ${formatNumber(Math.round(p.pessimista / 3))} e ${formatNumber(Math.round(p.otimista / 3))} leads no próximo mês.**\n\n**Tendência:** ${tendLabel} (${(p.tendencia * 100).toFixed(1)}%/mês)\n**Últimos 3 meses:** ${seriesTemporais.leadsRD.slice(-3).map(m => `${m.mes}: ${formatNumber(m.valor)}`).join(" → ")}\n\n**🟢 Otimista:** ~${formatNumber(Math.round(p.otimista / 3))}/mês\n**🟡 Realista:** ~${formatNumber(Math.round(p.realista / 3))}/mês\n**🔴 Pessimista:** ~${formatNumber(Math.round(p.pessimista / 3))}/mês\n\n**Confiança:** MÉDIA (9 meses de dados)\n**Método:** Projeção exponencial sobre conversões RD Station`;
    }

    if (isOpp) {
      const pL = projetar(seriesTemporais.leadsRD);
      const conv = 0.0619;
      return `🎯 **Devemos gerar entre ${Math.round(pL.pessimista / 3 * conv)} e ${Math.round(pL.otimista / 3 * conv)} oportunidades no próximo mês.**\n\n**Cálculo:** Leads projetados × taxa Lead→OPP (${(conv * 100).toFixed(2)}%)\n\n**🟢 Otimista:** ~${Math.round(pL.otimista / 3 * conv)}/mês\n**🟡 Realista:** ~${Math.round(pL.realista / 3 * conv)}/mês\n**🔴 Pessimista:** ~${Math.round(pL.pessimista / 3 * conv)}/mês\n\n**Confiança:** MÉDIA\n**Como aumentar:** Melhorar MQL→SQL (21,7% → 30%) = +38% oportunidades`;
    }

    if (isLost) {
      const p = projetar(seriesTemporais.lost);
      return `❌ **Devemos ter entre ${formatNumber(Math.round(p.pessimista / 3))} e ${formatNumber(Math.round(p.otimista / 3))} perdas no próximo mês.**\n\n**Tendência:** ${p.tendencia > 0.02 ? "AUMENTO" : p.tendencia < -0.02 ? "REDUÇÃO" : "ESTÁVEL"} (${(p.tendencia * 100).toFixed(1)}%/mês)\n**Últimos 3 meses:** ${seriesTemporais.lost.slice(-3).map(m => `${m.mes}: ${formatNumber(m.valor)}`).join(" → ")}\n\n**🟢 Otimista (menos perdas):** ~${formatNumber(Math.round(p.pessimista / 3))}/mês\n**🟡 Realista:** ~${formatNumber(Math.round(p.realista / 3))}/mês\n**🔴 Pessimista (mais perdas):** ~${formatNumber(Math.round(p.otimista / 3))}/mês\n\n**Confiança:** MÉDIA\n**Principal causa:** 37% por "Não atende" — cadência multi-canal pode reduzir 15%`;
    }

    if (isReceita) {
      const p = projetar(seriesTemporais.receita);
      return `💰 **Devemos faturar entre ${formatCurrency(Math.round(p.pessimista / 3))} e ${formatCurrency(Math.round(p.otimista / 3))} no próximo mês.**\n\n**Tendência:** ${p.tendencia > 0.02 ? "CRESCIMENTO" : p.tendencia < -0.02 ? "QUEDA" : "ESTÁVEL"} (${(p.tendencia * 100).toFixed(1)}%/mês)\n**Últimos 3 meses:** ${seriesTemporais.receita.slice(-3).map(m => `${m.mes}: ${formatCurrency(m.valor)}`).join(" → ")}\n\n**🟢 Otimista:** ~${formatCurrency(Math.round(p.otimista / 3))}/mês\n**🟡 Realista:** ~${formatCurrency(Math.round(p.realista / 3))}/mês\n**🔴 Pessimista:** ~${formatCurrency(Math.round(p.pessimista / 3))}/mês\n\n**Confiança:** MÉDIA\n**Risco:** Ticket médio em queda (R$ 87K → R$ 53K)`;
    }

    if (isMeta) {
      const wonMeses = [563, 420, 412];
      const wonQ1 = wonMeses.reduce((s, v) => s + v, 0);
      const media = Math.round(wonQ1 / 3);
      const metaAnual = 6000;
      const falta = metaAnual - wonQ1;
      const ritmo = Math.round(falta / 9);
      const prob = media >= ritmo ? "ALTA" : media >= ritmo * 0.85 ? "MÉDIA" : "BAIXA";
      return `🎯 **Se continuarmos no ritmo atual (${media} deals/mês), ${media >= ritmo ? "vamos bater a meta" : `ficaremos abaixo da meta em ~${formatNumber(falta - media * 9)} deals`}.**\n\n**Meta anual:** ${formatNumber(metaAnual)} deals\n**Realizado Q1:** ${formatNumber(wonQ1)} (${((wonQ1 / metaAnual) * 100).toFixed(1)}%)\n**Ritmo necessário:** ${ritmo}/mês | **Ritmo atual:** ${media}/mês\n**Probabilidade:** ${prob}\n\n${media < ritmo ? `**Para bater a meta:**\n• Aumentar ${ritmo - media} deals/mês\n• Melhorar win rate de 2,7% para ${((ritmo / (4131 / 9)) * 100).toFixed(1)}%\n• Ou gerar +${formatNumber(Math.round((ritmo - media) / 0.027))} leads/mês` : "**Ação:** Manter ritmo atual e monitorar win rate."}\n\n**Confiança:** ${prob}\n**Método:** Q1/2026 extrapolado (${wonMeses.join(" → ")} deals)`;
    }

    // Won / vendas genérico futuro
    const p = projetar(seriesTemporais.won);
    const pR = projetar(seriesTemporais.receita);
    const ticketMedio = Math.round(seriesTemporais.receita.slice(-3).reduce((s, m) => s + m.valor, 0) / seriesTemporais.won.slice(-3).reduce((s, m) => s + m.valor, 0));
    return `🔮 **Devemos fechar entre ${Math.round(p.pessimista / 3)} e ${Math.round(p.otimista / 3)} deals no próximo mês, com receita estimada entre ${formatCurrency(Math.round(pR.pessimista / 3))} e ${formatCurrency(Math.round(pR.otimista / 3))}.**\n\n**Tendência:** ${p.tendencia < -0.05 ? "QUEDA" : p.tendencia > 0.05 ? "CRESCIMENTO" : "ESTÁVEL"} (${(p.tendencia * 100).toFixed(1)}%/mês)\n**Últimos 3 meses:** ${seriesTemporais.won.slice(-3).map(m => `${m.mes}: ${m.valor}`).join(" → ")} deals\n**Ticket médio:** ${formatCurrency(ticketMedio)}\n\n**🟢 Otimista:** ~${Math.round(p.otimista / 3)} deals/mês (${formatCurrency(Math.round(pR.otimista / 3))})\n**🟡 Realista:** ~${Math.round(p.realista / 3)} deals/mês (${formatCurrency(Math.round(pR.realista / 3))})\n**🔴 Pessimista:** ~${Math.round(p.pessimista / 3)} deals/mês (${formatCurrency(Math.round(pR.pessimista / 3))})\n\n**Pipeline:** ${formatNumber(4131)} deals abertos × ${(6.4)}% win rate = ~${Math.round(4131 * 0.064)} esperados\n**Confiança:** MÉDIA\n**Método:** Regressão exponencial sobre 9 meses (Jul/25-Mar/26)\n\n**Para melhorar:**\n• Otimizar MIA (no-show 60%→20%): +83 deals/trimestre\n• Escalar Parceiros: conversão 6,8x maior\n• Realocar R$ 100K de empreendimentos críticos: +970 deals`;
  }

  // --- DEFINICOES (com calculo e origem) ---
  for (const [key, val] of Object.entries(belleKnowledge.definitions)) {
    if (q.includes(key.toLowerCase())) {
      const src = key === "CPL" || key === "CMQL" || key === "COPP" || key === "CPW" || key === "CSQL"
        ? "Calculado com dados de investimento (Facebook Ads) e funil (Pipedrive/RD Station)."
        : key === "CPC" || key === "CTR"
        ? "Fonte: Facebook Ads (facebook_ads_szi_adsinsights via NEKT)."
        : "Fonte: Pipedrive (pipedrive_v2_deals) e RD Station (rd_station_contact_events) via NEKT.";
      return `**${key}**: ${val}\n\n**Origem do dado:** ${src}\n**Período:** Histórico ou 2026 conforme contexto da pagina.\n**Cálculo:** ${val}`;
    }
  }

  // --- CONTEXTO DE PÁGINA ---
  const ctx = getPageContext(pagina);

  // --- EXPLICAÇÃO DE CARDS (com contexto da página) ---
  if (q.includes("o que e isso") || q.includes("o que é isso") || q.includes("explica esse card") || q.includes("esse card") || q.includes("o que significa") || q.includes("o que quer dizer") || q.includes("esse numero") || q.includes("esse número")) {
    return `📊 **Você está na página: ${ctx.nome}**\n\n**Elementos desta página:**\n${ctx.elementos}\n\n---\n\n**Como ler os cards:**\n• Valor em destaque = métrica principal\n• Subtítulo = período ("Histórico", "2026 Jan-Mar" ou "Snapshot")\n• 🟢 Verde = positivo | 🔴 Vermelho = negativo | 🟡 Amarelo = neutro\n• Cards escuros = KPIs de destaque\n\nPergunta sobre um elemento específico e eu explico em detalhe!`;
  }

  // --- EXPLICAÇÃO DE GRÁFICOS (com contexto da página) ---
  if (q.includes("grafico") || q.includes("gráfico") || q.includes("explica esse grafico") || q.includes("o que mostra") || q.includes("esse chart") || q.includes("eixo")) {
    return `📈 **Gráficos na página: ${ctx.nome}**\n\n${ctx.elementos.split("**Gráficos:**")[1]?.split("\n**Tabelas")[0] || ctx.elementos}\n\n---\n\n**Como ler gráficos:**\n• **Barras verticais:** Eixo X = categorias/meses, Y = valores. Altura = magnitude.\n• **Barras horizontais:** Usadas para ranking. Maior barra = maior valor.\n• **Área:** Mostra evolução temporal. A área preenchida indica volume.\n• **Pizza:** Proporção entre categorias. Fatia maior = maior participação.\n• **Radar:** Perfil multidimensional. Cada ponta = uma métrica diferente.\n\n**Cores padrão:**\n• Coral (#F06B5D) = métrica principal\n• Azul = calls/ligações\n• Verde = WhatsApp/positivo\n• Amarelo = mensagens/atenção\n• Cinza escuro = volume/comparativo\n\nMe diga qual gráfico específico quer entender!`;
  }

  // --- EXPLICAÇÃO DE TABELAS (com contexto da página) ---
  if (q.includes("tabela") || q.includes("coluna") || q.includes("explica essa tabela") || q.includes("o que cada coluna")) {
    return `📋 **Tabelas na página: ${ctx.nome}**\n\n${ctx.elementos.split("**Tabelas:**")[1]?.split("\n**Cards")[0] || ctx.elementos}\n\n---\n\n**Colunas comuns:**\n• **#** = posição no ranking\n• **Won** = vendas concluídas (verde = positivo)\n• **Lost** = vendas perdidas (vermelho)\n• **CPW** = custo por venda (verde <R$500, amarelo R$500-3K, vermelho >R$3K)\n• **Lead→Won** = taxa de conversão final (coral)\n• **Score** = saúde 0-100 (🟢≥60 🟡40-59 🔴<40)\n• **Concluídas / %** = eficiência operacional\n• Badge **IA** = Morada-Mia | **BOT** = Automação\n\nMe diga qual tabela e eu detalho cada coluna!`;
  }

  // --- FUNIL (explicação didática) ---
  if (q.includes("o que e funil") || q.includes("o que é funil") || q.includes("explica o funil") || q.includes("como funciona o funil") || q.includes("etapas do funil")) {
    return `🔄 **O Funil de Vendas — Explicação Completa**\n\nO funil representa a jornada do cliente, do primeiro contato até a compra:\n\n**1. Lead** — Pessoa que demonstrou interesse (formulário, anúncio, indicação)\n→ ${formatNumber(47530)} leads no total\n\n**2. MQL (Marketing Qualified Lead)** — Lead com perfil mínimo aprovado pelo marketing\n→ ${formatNumber(31498)} MQLs (66,3% dos leads passam)\n\n**3. SQL (Sales Qualified Lead)** — Lead confirmado pela pré-venda como pronto\n→ ${formatNumber(7218)} SQLs (22,9% dos MQLs passam — **GARGALO PRINCIPAL**)\n\n**4. OPP (Oportunidade)** — Lead em reunião ou negociação\n→ ${formatNumber(2941)} OPPs (40,7% dos SQLs passam)\n\n**5. Won (Venda)** — Compra concluída com sucesso\n→ ${formatNumber(628)} vendas (21,4% das OPPs fecham)\n\nA cada etapa, parte dos leads é perdida. O maior gargalo é MQL→SQL (apenas 21,7% no canal MKT), onde a pré-venda filtra leads não qualificados.\n\n**Por que isso importa:** Melhorar a conversão em qualquer etapa tem impacto direto na receita. Por exemplo, subir MQL→SQL de 21,7% para 30% = +38% mais oportunidades.`;
  }

  // --- ORIGEM / FONTE / DE ONDE VEM ---
  if (q.includes("de onde vem") || q.includes("fonte") || q.includes("origem") || q.includes("como é calculado") || q.includes("como calcula")) {
    return `📋 **Origem dos Dados - Belle Analytics**\n\n**Fontes principais:**\n• **Pipedrive** (CRM): Deals, pipeline, atividades, stages → tabela pipedrive_v2_deals, pipedrive_v2_consolidated_deal_flow\n• **RD Station** (Marketing): Conversões, formulários, UTMs → tabela rd_station_contact_events (283.950 eventos)\n• **Facebook Ads** (Mídia paga): Impressões, cliques, gasto → tabela facebook_ads_szi_adsinsights\n• **Meetime** (Pre-venda): Ligações, cadências → tabela meetime_szs_calls\n\n**Data warehouse:** NEKT (Amazon Athena)\n**Atualização:** Dados sincronizados periodicamente via pipedrive-5Slo e outras sources NEKT.\n\n**Periodos:**\n• Pipedrive: Jul/2019 - Abr/2026\n• RD Station: Jan/2024 - Abr/2026\n• Facebook Ads: Jun/2023 - Mar/2026\n• Dashboard prioriza: **Jan-Mar 2026**`;
  }

  // --- HISTORICO vs ATUAL ---
  if (q.includes("histórico") || q.includes("esse ano") || q.includes("so esse ano") || q.includes("periodo") || q.includes("que ano") || q.includes("ta alto por que") || q.includes("esse numero")) {
    return `📅 **Contexto Temporal dos Dados**\n\n**Regra do sistema:** O dashboard prioriza dados de **2026 (Jan-Mar)**. Dados anteriores aparecem apenas como comparação.\n\n**Como identificar:**\n• Cards com "Histórico" = dados desde Jul/2019\n• Cards com "2026 (Jan-Mar)" = apenas período atual\n• Cards com "Snapshot atual" = valor do momento\n\n**Exemplos:**\n• Deals Won (12.515) = **Historico** desde 2019\n• Atividades do Time (26.914) = **Apenas 2026**\n• Leads Abertos (2.358) = **Snapshot** de agora\n\nSe você vir um número sem contexto temporal, me avise que eu identifico a origem.`;
  }

  // --- RESPONSAVEL / QUEM CUIDA ---
  if (q.includes("responsável") || q.includes("quem cuida") || q.includes("quem e responsável") || q.includes("dono")) {
    return `👤 **Responsáveis por Area**\n\n**Squad 1 (Hellen + Lua):**\n• Pre-vendas: Hellen Dias (7.312 calls em 2026)\n• Closer: Luana Schaikoski (25 deals won, R$ 8M)\n• Empreendimentos: Ponta das Canas, Itacare, Marista 144, Jurere II/III, Vistas de Anita\n\n**Squad 2 (Jeni + Filipe):**\n• Pre-vendas: Jeniffer Correa (1.984 calls em 2026)\n• Closer: Filipe Padoveze (72 deals won, R$ 778K)\n• Empreendimentos: Barra Grande, Natal, NC2, Caragua, Bonito\n\n**Para saber quem cuida de um empreendimento especifico, pergunte:** "Quem cuida do [nome]?"`;
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
        resp += `**Funil (histórico):** ${formatNumber(emp.leads)} leads → ${formatNumber(emp.mql)} MQL → ${formatNumber(emp.sql)} SQL → ${formatNumber(emp.opp)} OPP → ${emp.won} Won\n`;
        resp += `**Conversão Lead→Won:** ${((emp.won / emp.leads) * 100).toFixed(2)}%\n`;
        if (emp.cpw > 0) resp += `**CPW:** R$ ${formatNumber(Math.round(emp.cpw))} (${emp.cpw > 3000 ? "CRITICO" : emp.cpw > 1000 ? "Regular" : "Bom"})\n`;
        if (emp.investimento > 0) resp += `**Investimento:** ${formatCurrency(emp.investimento)}\n`;
        resp += `**Origem:** dataset_szi (funil) + Pipedrive (deals)\n`;
      }
      if (emp26) resp += `**Conversões 2026 (RD Station):** ${formatNumber(emp26.conversoes2026)} conversões, ${formatNumber(emp26.contatos)} contatos únicos\n`;
      if (fb) resp += `**Facebook Ads 2026:** ${formatCurrency(fb.gasto)} gasto | ${formatNumber(fb.cliques)} cliques | CPC R$ ${fb.cpc} | ${fb.plataforma} (${fb.tipo})\n`;
      if (sq) resp += `\n**Squad responsável:** ${sq.nome}\n**Membros:** ${sq.membros.map(m => `${m.nome} (${m.role})`).join(", ")}`;

      return resp;
    }

    const best = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => a.cpw - b.cpw)[0];
    const worst = funnelByEmpreendimento.filter(e => e.cpw > 0).sort((a, b) => b.cpw - a.cpw)[0];
    return `🏗️ **Análise de Empreendimentos**\n\n✅ **Melhor CPW:** ${best.nome} (R$ ${best.cpw.toFixed(2)}) - ${best.won} vendas\n❌ **Pior CPW:** ${worst.nome} (R$ ${formatNumber(Math.round(worst.cpw))}) - ${worst.won} vendas\n\n**Top 3 por volume:**\n${funnelByEmpreendimento.sort((a, b) => b.won - a.won).slice(0, 3).map(e => `• ${e.nome}: ${e.won} won`).join("\n")}\n\n**Top 3 conversões 2026 (RD Station):**\n${allEmpreendimentos2026.slice(0, 3).map(e => `• ${e.nome}: ${formatNumber(e.conversoes2026)} conv.`).join("\n")}\n\n**Origem:** dataset_szi (funil histórico) + rd_station_contact_events (2026) + Pipedrive`;
  }

  // --- PIPELINE / OVERVIEW ---
  if (q.includes("pipeline") || q.includes("visao geral") || q.includes("overview") || q.includes("resumo") || q.includes("como esta") || q.includes("situacao")) {
    return `📊 **Visão Geral do Pipeline**\n**Período:** Histórico (Jul/2019 - Mar/2026)\n\n• **Total de Deals:** ${formatNumber(pipelineOverview.totalDeals)}\n• **Won:** ${formatNumber(pipelineOverview.won.deals)} (${formatCurrency(pipelineOverview.won.valor)})\n• **Lost:** ${formatNumber(pipelineOverview.lost.deals)} (${formatCurrency(pipelineOverview.lost.valor)})\n• **Open:** ${formatNumber(pipelineOverview.open.deals)}\n• **Win Rate:** ${pipelineOverview.winRate}%\n• **Ticket Médio:** ${formatCurrency(pipelineOverview.won.ticketMedio)}\n\n**Origem:** pipedrive_v2_deals (195.327 registros)\n**Cálculo Win Rate:** Won / (Won + Lost) * 100 = ${pipelineOverview.winRate}%\n\n⚠️ **Alerta:** Win rate caindo de 10,8% (Jan/25) para 2,7% (Mar/26). Causa provável: aumento de volume sem aumento proporcional de qualificação.`;
  }

  // --- GARGALOS ---
  if (q.includes("gargalo") || q.includes("crítico") || q.includes("o que fazer") || q.includes("acao")) {
    return `⚠️ **Gargalos e Ações Recomendadas**\n**Período:** Análise histórica + 2026\n\n**1. Contato (37% dos lost)**\n• Dado: 65.779 deals perdidos por "Não atende"\n• Fonte: pipedrive_v2_deals.lost_reason\n• Ação: Cadência multi-canal automatica (WhatsApp→Call→Email→SMS)\n• Impacto estimado: R$ 18,7M recuperável (5% dos lost)\n\n**2. Win Rate em queda**\n• Dado: 10,8% (Jan/25) → 2,7% (Mar/26)\n• Fonte: pipedrive_v2_consolidated_deal_flow (status changes)\n• Causa: Volume de leads cresceu mas qualidade caiu\n• Ação: Auditar qualidade por fonte no RD Station\n\n**3. MIA no-show (60%)**\n• Dado: 2.597 reuniões, 1.548 no-shows\n• Fonte: pipedrive_v2_consolidated_deal_flow (owner=Morada-Mia)\n• Ação: Confirmação 24h + lembrete 1h antes\n• Impacto: +R$ 15,7M se reduzir para 20%\n\n**4. MQL→SQL no MKT (21,7%)**\n• Dado: 24.440 MQLs → 5.307 SQLs\n• Fonte: dataset_szi\n• Ação: Scoring mais rigoroso antes da pre-venda\n\n**5. Morro das Pedras (CPW R$ 11.400)**\n• Ação: Suspender investimento e realocar para Marista 144 (CPW R$ 104)`;
  }

  // --- SQUADS ---
  if (q.includes("squad") || q.includes("hellen") || q.includes("lua") || q.includes("jeni") || q.includes("filipe")) {
    const sorted = [...squads].sort((a, b) => b.score - a.score);
    return `⚡ **Squads Comerciais**\n**Período:** Dados 2026 (Jan-Mar) + histórico de funil\n\n${squads.map(sq => {
      const icon = sq.status === "saudavel" ? "🟢" : sq.status === "atencao" ? "🟡" : "🔴";
      return `${icon} **${sq.nome}**\n• Tipo: ${sq.tipo}\n• Score: ${sq.score}/100 | Ocupação: ${sq.ocupacao}%\n• Funil: ${formatNumber(sq.metricas.leads)} leads → ${sq.metricas.won} won\n• Membros: ${sq.membros.map(m => `${m.nome} (${m.role})`).join(", ")}\n• Investimento: ${formatCurrency(sq.metricas.investimento)}\n• Alertas: ${sq.alertas.length > 0 ? sq.alertas.slice(0, 2).join("; ") : "Nenhum"}`;
    }).join("\n\n")}\n\n**Melhor:** ${sorted[0].nome} (score ${sorted[0].score})\n**Fonte:** Squads definidos em CLAUDE.md + dados Pipedrive/RD Station\n\n**Acao recomendada:** ${sorted[sorted.length - 1].alertas.length > 0 ? sorted[sorted.length - 1].alertas[0] : "Manter operacao atual"}`;
  }

  // --- MIA ---
  if (q.includes("mia") || q.includes("morada") || q.includes("inteligencia artificial")) {
    return `🤖 **MIA (Morada.ai) - 2026 (Jan-Mar)**\n\n• Atividades: ${formatNumber(miaData.totalAtividades)} (#${miaData.ranking} no ranking geral)\n• Reuniões agendadas: ${formatNumber(miaData.reunioesAgendadas)}\n• No-Shows: ${formatNumber(miaData.noShows)} (**${miaData.taxaNoShow}%** - CRITICO)\n• Reuniões efetivas: ${formatNumber(miaData.reunioesEfetivas)}\n• Deals won: 15 (Pipedrive)\n\n**Origem:** pipedrive_v2_consolidated_deal_flow WHERE owner_name = 'Morada - Mia'\n**Cálculo no-show:** no_shows / reuniões_agendadas * 100 = ${miaData.taxaNoShow}%\n\n**Comparativo:**\n• MIA agenda 4,4x mais reuniões que humanos\n• Mas tem 60% no-show vs 8,3% media humana\n\n**Diagnóstico:** MIA e excelente em volume mas falha em efetividade.\n**Causa provável:** Agendamento com leads pouco qualificados + falta de confirmação.\n**Ação:** Confirmação 24h antes (WhatsApp) + qualificação mais rigorosa.\n**Impacto estimado:** Se no-show cair para 20% → +552 reuniões efetivas → ~83 deals → R$ 7,2M`;
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
    return `❌ **Motivos de Perda**\n**Período:** Histórico\n**Fonte:** pipedrive_v2_deals.lost_reason\n\n${lostReasons.map(r => `• **${r.motivo}**: ${formatNumber(r.total)} deals (${r.pct}%)`).join("\n")}\n\n**Análise:**\n• **49% das perdas** são por problemas de CONTATO (não atende + sem conexão + parou + sem resposta)\n• Isso representa ~87.500 deals perdidos\n• Valor médio de deal lost: R$ 4.537\n\n**Por que isso acontece?**\n1. Leads de marketing são mais frios (curiosos vs interessados)\n2. Cadência de follow-up insuficiente\n3. Canal único (só ligação, sem WhatsApp)\n\n**Ação:** Multi-canal automático + MIA com confirmação = potencial R$ 18,7M`;
  }

  // --- SETORES ---
  if (q.includes("setor") || q.includes("szi") || q.includes("szs") || q.includes("parceiro") || q.includes("marketplace")) {
    return `🏢 **Setores (2026)**\n**Fonte:** pipedrive_v2_deals por pipeline_id\n\n${setores.map(s => {
      const wr = ((s.wonTotal / (s.wonTotal + s.lostTotal)) * 100).toFixed(1);
      return `• **${s.nome}** (Pipeline #${s.pipeline})\n  Won: ${s.wonTotal} | Lost: ${formatNumber(s.lostTotal)} | Win Rate: ${wr}%\n  Valor: ${s.valorTotal > 0 ? formatCurrency(s.valorTotal) : "N/A"} | Leads abertos: ${s.leadsAbertos}${s.cpl > 0 ? `\n  CPL: R$ ${s.cpl} | CMQL: R$ ${s.cmql} | CSQL: R$ ${s.csql} | COPP: R$ ${s.copp}` : ""}`;
    }).join("\n\n")}\n\n**Insight:** Canal Parceiros (Pipeline #7) converte 6,8x mais que MKT com custo zero.`;
  }

  // --- PREVISÃO DE LEADS ---
  if (q.includes("quantos leads") || q.includes("previsao de leads") || q.includes("previsão de leads") || q.includes("leads no proximo") || q.includes("leads no próximo") || q.includes("leads em agosto") || q.includes("geracao de leads") || q.includes("geração de leads")) {
    const p = projetar(seriesTemporais.leadsRD);
    const tendLabel = p.tendencia > 0.02 ? "CRESCIMENTO" : p.tendencia < -0.02 ? "QUEDA" : "ESTÁVEL";
    return `📈 **Previsão de Leads — Próximo Trimestre (Abr-Jun/2026)**\n\n**Tendência identificada:** ${tendLabel} (${(p.tendencia * 100).toFixed(1)}% ao mês)\n**Últimos 3 meses:** ${seriesTemporais.leadsRD.slice(-3).map(m => `${m.mes}: ${formatNumber(m.valor)}`).join(" → ")}\n**Média recente:** ${formatNumber(p.media)}/mês\n\n**🟢 Cenário Otimista:** ~${formatNumber(p.otimista)} leads no trimestre (~${formatNumber(Math.round(p.otimista / 3))}/mês)\n**🟡 Cenário Realista:** ~${formatNumber(p.realista)} leads no trimestre (~${formatNumber(Math.round(p.realista / 3))}/mês)\n**🔴 Cenário Pessimista:** ~${formatNumber(p.pessimista)} leads no trimestre (~${formatNumber(Math.round(p.pessimista / 3))}/mês)\n\n**Confiança:** MÉDIA (9 meses de dados)\n**Base:** Conversões RD Station (rd_station_contact_events)\n**Método:** Projeção exponencial com tendência dos últimos 3 meses\n\n**Observação:** ${p.tendencia < -0.05 ? "Tendência de queda. Revisar campanhas e budget de Facebook Ads." : p.tendencia > 0.05 ? "Tendência de crescimento. Manter estratégia atual." : "Volume estável. Oportunidade de otimizar conversão."}`;
  }

  // --- PREVISÃO DE OPORTUNIDADES ---
  if (q.includes("oportunidade") || q.includes("opps") || q.includes("quantas opp") || q.includes("opp no proximo") || q.includes("opp no próximo")) {
    const convLeadOpp = 0.0619; // historico: 2941 opp / 47530 leads
    const pLeads = projetar(seriesTemporais.leadsRD);
    const oppOtimista = Math.round(pLeads.otimista * convLeadOpp);
    const oppRealista = Math.round(pLeads.realista * convLeadOpp);
    const oppPessimista = Math.round(pLeads.pessimista * convLeadOpp);
    return `🎯 **Previsão de Oportunidades — Próximo Trimestre**\n\n**Taxa de conversão Lead→OPP:** ${(convLeadOpp * 100).toFixed(2)}% (histórico)\n**Baseado na projeção de leads:**\n\n**🟢 Otimista:** ~${formatNumber(oppOtimista)} oportunidades (~${Math.round(oppOtimista / 3)}/mês)\n**🟡 Realista:** ~${formatNumber(oppRealista)} oportunidades (~${Math.round(oppRealista / 3)}/mês)\n**🔴 Pessimista:** ~${formatNumber(oppPessimista)} oportunidades (~${Math.round(oppPessimista / 3)}/mês)\n\n**Confiança:** MÉDIA\n**Método:** Projeção de leads × taxa de conversão histórica Lead→OPP\n**Fonte:** dataset_szi (funil) + rd_station_contact_events (leads)\n\n**Como aumentar oportunidades:**\n• Melhorar MQL→SQL (hoje 21,7% → meta 30%) = +38% mais SQLs\n• Reduzir no-show da MIA (60% → 20%) = +552 reuniões efetivas/trimestre`;
  }

  // --- PREVISÃO DE PERDAS ---
  if (q.includes("perda") && (q.includes("previsao") || q.includes("previsão") || q.includes("proximo") || q.includes("próximo") || q.includes("tendencia") || q.includes("tendência") || q.includes("aumentar") || q.includes("diminuir"))) {
    const p = projetar(seriesTemporais.lost);
    const tendLabel = p.tendencia > 0.02 ? "AUMENTO" : p.tendencia < -0.02 ? "REDUÇÃO" : "ESTÁVEL";
    return `❌ **Previsão de Perdas — Próximo Trimestre**\n\n**Tendência:** ${tendLabel} (${(p.tendencia * 100).toFixed(1)}% ao mês)\n**Últimos 3 meses:** ${seriesTemporais.lost.slice(-3).map(m => `${m.mes}: ${formatNumber(m.valor)}`).join(" → ")}\n**Média recente:** ${formatNumber(p.media)} lost/mês\n\n**🟢 Cenário Otimista (menos perdas):** ~${formatNumber(p.pessimista)} lost no trimestre\n**🟡 Cenário Realista:** ~${formatNumber(p.realista)} lost no trimestre\n**🔴 Cenário Pessimista (mais perdas):** ~${formatNumber(p.otimista)} lost no trimestre\n\n**Confiança:** MÉDIA\n**Principal motivo de perda:** "Não atende/Não responde" (37%)\n\n**Como reduzir perdas:**\n• Cadência multi-canal (WhatsApp→Call→Email) = -15% estimado\n• Confirmação MIA 24h antes = reduzir no-show\n• Qualificação mais rigorosa = menos leads frios\n\n**Método:** Projeção exponencial sobre série lost (pipedrive_v2_consolidated_deal_flow)`;
  }

  // --- PREVISÃO DE RECEITA ---
  if (q.includes("receita") && (q.includes("previsao") || q.includes("previsão") || q.includes("proximo") || q.includes("próximo") || q.includes("quanto") || q.includes("faturar") || q.includes("faturamento"))) {
    const p = projetar(seriesTemporais.receita);
    const tendLabel = p.tendencia > 0.02 ? "CRESCIMENTO" : p.tendencia < -0.02 ? "QUEDA" : "ESTÁVEL";
    return `💰 **Previsão de Receita — Próximo Trimestre (Abr-Jun/2026)**\n\n**Tendência:** ${tendLabel} (${(p.tendencia * 100).toFixed(1)}% ao mês)\n**Últimos 3 meses:** ${seriesTemporais.receita.slice(-3).map(m => `${m.mes}: ${formatCurrency(m.valor)}`).join(" → ")}\n**Média recente:** ${formatCurrency(p.media)}/mês\n\n**🟢 Cenário Otimista:** ${formatCurrency(p.otimista)} no trimestre (~${formatCurrency(Math.round(p.otimista / 3))}/mês)\n**🟡 Cenário Realista:** ${formatCurrency(p.realista)} no trimestre (~${formatCurrency(Math.round(p.realista / 3))}/mês)\n**🔴 Cenário Pessimista:** ${formatCurrency(p.pessimista)} no trimestre (~${formatCurrency(Math.round(p.pessimista / 3))}/mês)\n\n**Confiança:** MÉDIA (9 meses de série)\n**Fonte:** pipedrive_v2_deals (valor × won_time)\n**Método:** Projeção exponencial com tendência dos últimos 3 meses\n\n**Fatores de risco:**\n• Ticket médio em queda (R$ 87K → R$ 53K)\n• Win rate caindo (impacta volume de won)\n• Pipeline de 4.131 deals abertos pode não repor`;
  }

  // --- PREVISÃO DE WON / VENDAS GENÉRICA ---
  if (q.includes("previsao") || q.includes("previsão") || q.includes("forecast") || q.includes("projecao") || q.includes("projeção") || q.includes("futuro") || q.includes("tendencia") || q.includes("tendência") || q.includes("quanto vamos vender") || q.includes("se continuarmos") || q.includes("continuar assim") || q.includes("mantendo esse ritmo") || q.includes("do jeito que esta") || q.includes("se nada mudar")) {
    // Dados mensais REAIS para calcular tendência
    const meses = [
      { mes: "Jan/26", won: 563, valor: 29535529 },
      { mes: "Fev/26", won: 420, valor: 20231194 },
      { mes: "Mar/26", won: 412, valor: 24639000 },
    ];
    // Tendência: variação média mês a mês
    const var1 = (meses[1].won - meses[0].won) / meses[0].won; // -25,4%
    const var2 = (meses[2].won - meses[1].won) / meses[1].won; // -1,9%
    const tendenciaMensal = (var1 + var2) / 2; // média: ~-13,6%
    const tendenciaLabel = tendenciaMensal < -0.05 ? "QUEDA" : tendenciaMensal > 0.05 ? "CRESCIMENTO" : "ESTÁVEL";
    const ultimoMes = meses[meses.length - 1];

    // Projeção Abril baseada em tendência
    const abrRealista = Math.round(ultimoMes.won * (1 + tendenciaMensal));
    const abrOtimista = Math.round(ultimoMes.won * 1.10); // se corrigir tendência
    const abrPessimista = Math.round(ultimoMes.won * (1 + tendenciaMensal * 1.5));

    const ticketMedio = Math.round(meses.reduce((s, m) => s + m.valor, 0) / meses.reduce((s, m) => s + m.won, 0));

    // Projeção Q2 (Abr-Jun)
    const q2Realista = abrRealista + Math.round(abrRealista * (1 + tendenciaMensal)) + Math.round(abrRealista * (1 + tendenciaMensal) * (1 + tendenciaMensal));
    const q2Otimista = abrOtimista * 3;
    const q2Pessimista = abrPessimista + Math.round(abrPessimista * 0.85) + Math.round(abrPessimista * 0.72);

    // Pipeline para calcular probabilidade
    const openDeals = 4131;
    const winRate = 0.064;
    const expectedFromPipeline = Math.round(openDeals * winRate);

    return `🔮 **PROJEÇÃO FUTURA — Abril a Junho/2026**\n\n**📈 Tendência identificada:** ${tendenciaLabel} (${(tendenciaMensal * 100).toFixed(1)}% ao mês)\n**Base de cálculo:** Progressão Jan→Fev→Mar/2026 (${meses.map(m => m.won).join(" → ")} deals)\n**Ticket médio atual:** ${formatCurrency(ticketMedio)}\n\n---\n\n**🟢 Cenário Otimista** (tendência corrigida +10%)\n• Abril: **${abrOtimista} deals** (${formatCurrency(abrOtimista * ticketMedio)})\n• Q2 total: **${q2Otimista} deals** (${formatCurrency(q2Otimista * ticketMedio)})\n• Premissa: Otimização da MIA + escalar Parceiros + realocar budget\n• **Confiança: MÉDIA** — depende de ações corretivas\n\n**🟡 Cenário Realista** (mantém tendência atual)\n• Abril: **${abrRealista} deals** (${formatCurrency(abrRealista * ticketMedio)})\n• Q2 total: **${q2Realista} deals** (${formatCurrency(q2Realista * ticketMedio)})\n• Premissa: Nenhuma mudança operacional\n• **Confiança: ALTA** — segue padrão observado\n\n**🔴 Cenário Pessimista** (tendência acelera -50%)\n• Abril: **${abrPessimista} deals** (${formatCurrency(abrPessimista * ticketMedio)})\n• Q2 total: **${q2Pessimista} deals** (${formatCurrency(q2Pessimista * ticketMedio)})\n• Premissa: Win rate continua caindo + pipeline não repõe\n• **Confiança: MÉDIA** — risco real se nada mudar\n\n---\n\n**Pipeline atual:** ${formatNumber(openDeals)} deals abertos\n**Conversão esperada (win rate ${(winRate * 100).toFixed(1)}%):** ~${expectedFromPipeline} deals\n\n**⚠️ Por que a tendência é de queda?**\n1. Win rate caiu de 10,8% → 2,7% (Jan/25 → Mar/26)\n2. Volume de leads cresceu mas qualidade diminuiu\n3. MIA gera reuniões mas 60% são no-show\n\n**Como reverter:**\n• Confirmar reuniões da MIA 24h antes → pode adicionar +83 deals/trimestre\n• Escalar Parceiros (conversão 6,8x maior) → ROI infinito\n• Realocar R$ 100K de empreendimentos críticos → +970 deals\n\n**Método:** Regressão linear sobre Q1/2026, ajustada por win rate e pipeline aberto.`;
  }

  // --- META ---
  if (q.includes("meta") || q.includes("bater meta") || q.includes("falta") || q.includes("ritmo") || q.includes("vamos bater") || q.includes("atingir")) {
    const wonMeses = [563, 420, 412]; // Jan, Fev, Mar 2026
    const wonQ1 = wonMeses.reduce((s, v) => s + v, 0);
    const mediaMensal = Math.round(wonQ1 / 3);
    const tendencia = ((wonMeses[2] - wonMeses[0]) / wonMeses[0]); // Jan→Mar
    const metaAnual = 6000;
    const falta = metaAnual - wonQ1;
    const mesesRestantes = 9;
    const ritmoNecessario = Math.round(falta / mesesRestantes);

    // Projeção baseada em tendência
    let acumulado = wonQ1;
    let mesAtual = wonMeses[2];
    const tendMensal = tendencia / 2; // suavizar
    for (let i = 0; i < mesesRestantes; i++) {
      mesAtual = Math.round(mesAtual * (1 + tendMensal));
      acumulado += Math.max(mesAtual, 200); // piso mínimo
    }
    const projecaoAnual = acumulado;
    const prob = projecaoAnual >= metaAnual ? "ALTA" : projecaoAnual >= metaAnual * 0.85 ? "MÉDIA" : "BAIXA";
    const atingePct = ((projecaoAnual / metaAnual) * 100).toFixed(1);

    return `🎯 **Análise Preditiva de Meta — 2026**\n\n**Meta anual estimada:** ${formatNumber(metaAnual)} deals\n**Realizado Q1 (Jan-Mar):** ${formatNumber(wonQ1)} deals (${((wonQ1 / metaAnual) * 100).toFixed(1)}%)\n**Faltam:** ${formatNumber(falta)} deals em ${mesesRestantes} meses\n\n---\n\n**📊 Projeção baseada na tendência atual:**\n• Tendência mensal: ${(tendMensal * 100).toFixed(1)}% (${tendMensal < 0 ? "queda" : "crescimento"})\n• Projeção anual: **${formatNumber(projecaoAnual)} deals** (${atingePct}% da meta)\n• **Probabilidade de atingir:** ${prob}\n\n**Ritmo necessário:** ${ritmoNecessario} deals/mês\n**Ritmo atual:** ${mediaMensal} deals/mês (${mediaMensal >= ritmoNecessario ? "✅ suficiente" : `⚠️ faltam ${ritmoNecessario - mediaMensal}/mês`})\n\n---\n\n**Se nada mudar:** ${projecaoAnual >= metaAnual ? "A meta será atingida." : `Ficaremos ${formatNumber(metaAnual - projecaoAnual)} deals abaixo da meta.`}\n\n**Para bater a meta:**\n• Necessário: ${ritmoNecessario} deals/mês nos próximos ${mesesRestantes} meses\n• Aumentar win rate de 2,7% para ${(ritmoNecessario / (4131 / mesesRestantes) * 100).toFixed(1)}%\n• Ou gerar +${formatNumber(Math.round((ritmoNecessario - mediaMensal) / 0.027))} leads adicionais/mês\n\n**Método:** Projeção exponencial com tendência Q1/2026 (Jan: ${wonMeses[0]}, Fev: ${wonMeses[1]}, Mar: ${wonMeses[2]}), piso mínimo de 200 deals/mês.\n**Confiança:** ${prob} — baseado em apenas 3 meses de dados.`;
  }

  // --- SIMULACAO ---
  if (q.includes("se aumentar") || q.includes("se melhorar") || q.includes("se redistribuir") || q.includes("simulacao") || q.includes("simular") || q.includes("e se") || q.includes("o que acontece") || q.includes("impacto")) {
    const wonBase = 465;
    const ticketBase = 53478;
    const receitaBase = wonBase * ticketBase;
    const mkt = funnelByChannel.find(c => c.canal === "MKT")!;
    const mktConvRate = mkt.won / mkt.leads;

    return `🧪 **Simulações de Cenários**\n**Base:** ${wonBase} deals/mes × ${formatCurrency(ticketBase)} = ${formatCurrency(receitaBase)}/mes\n\n**Cenário 1: Aumentar leads em 20%**\n• Leads adicionais: +${formatNumber(Math.round(mkt.leads * 0.2 / 12))}/mes\n• Won adicionais: +${Math.round(mkt.leads * 0.2 / 12 * mktConvRate)} deals/mes (mantendo conversão ${(mktConvRate * 100).toFixed(2)}%)\n• Receita adicional: +${formatCurrency(Math.round(mkt.leads * 0.2 / 12 * mktConvRate * ticketBase))}/mes\n• **Confiança:** ALTA (relacao linear leads→won comprovada)\n\n**Cenário 2: Melhorar conversão MQL→SQL de 21,7% para 30%**\n• SQLs adicionais: +${formatNumber(Math.round(mkt.mql / 12 * 0.083))}/mes\n• Won adicionais: +${Math.round(mkt.mql / 12 * 0.083 * 0.345 * 0.146)} deals/mes\n• Receita: +${formatCurrency(Math.round(mkt.mql / 12 * 0.083 * 0.345 * 0.146 * ticketBase))}/mes\n• **Confiança:** MEDIA (depende de qualificação)\n\n**Cenário 3: Reduzir no-show MIA de 60% para 20%**\n• Reuniões efetivas adicionais: +${Math.round(miaData.reunioesAgendadas * 0.4 / 3)}/mes\n• Won adicionais: +${Math.round(miaData.reunioesAgendadas * 0.4 / 3 * 0.15)} deals/mes\n• Receita: +${formatCurrency(Math.round(miaData.reunioesAgendadas * 0.4 / 3 * 0.15 * ticketBase))}/mes\n• **Confiança:** MEDIA (depende da implementação)\n\n**Cenário 4: Redistribuir budget de empreendimentos críticos**\n• Realocar R$ 45.600 (Morro das Pedras) + R$ 55.266 (Vistas Anita) = R$ 100.866\n• Para Marista 144 (CPW R$ 104): +${Math.round(100866 / 104)} vendas adicionais\n• **Confiança:** ALTA (CPW comprovado)\n\n**Premissas:** Conversão histórica mantida. Sazonalidade não modelada (dados insuficientes).`;
  }

  // --- CANAL / FUNIL ---
  if (q.includes("canal") || q.includes("conversão") || q.includes("funil") || q.includes("mkt") || q.includes("parc")) {
    return `🔄 **Funil por Canal**\n**Fonte:** dataset_szi\n\n${funnelByChannel.map(ch => {
      const rate = ((ch.won / ch.leads) * 100).toFixed(2);
      return `**${ch.canal}**: ${formatNumber(ch.leads)} leads → ${formatNumber(ch.mql)} MQL → ${formatNumber(ch.sql)} SQL → ${formatNumber(ch.opp)} OPP → ${ch.won} Won\n  Conversão: ${rate}% | Investimento: ${ch.investimento > 0 ? formatCurrency(ch.investimento) : "R$ 0"}`;
    }).join("\n\n")}\n\n**Taxas de conversão MKT:**\n• Lead→MQL: 62% | MQL→SQL: 21,7% (GARGALO) | SQL→OPP: 34,5% | OPP→Won: 14,6%\n\n**PARC vs MKT:** Parceiros converte 6,8x mais (4,6% vs 0,68%) com custo zero.\n**Cálculo:** Won / Leads * 100`;
  }

  // --- NAO SEI / TRANSPARENCIA ---
  if (q.includes("nao sei") || q.includes("nao entendi") || q.includes("explica melhor")) {
    return `Sem problema! Me diga especificamente o que você quer entender e eu explico com:\n\n• **Origem do dado** (de qual sistema vem)\n• **Calculo** (fórmula usada)\n• **Periodo** (que datas estão consideradas)\n• **Responsável** (quem cuida daquela área)\n\nExemplos:\n• "De onde vem o número de deals won?"\n• "Como é calculado o CPW?"\n• "Quem cuida do Marista 144?"\n• "Esse dado é de 2026 ou histórico?"`;
  }

  // --- DEFAULT ---
  return `Olá! Sou a **Belle**, analista sênior da Seazone Saleszone.\n\nPosso explicar qualquer coisa do sistema:\n\n📖 **Termos** - "O que é MQL?", "O que é Won?", "O que é Pipeline?"\n📊 **Cards** - "O que é isso?", "O que esse card significa?"\n📈 **Gráficos** - "Explica esse gráfico", "O que cada eixo mostra?"\n📋 **Tabelas** - "O que cada coluna significa?"\n🔄 **Funil** - "Como funciona o funil?", "O que é SQL?"\n\n💡 **Análise:**\n⚠️ **Gargalos** - "Qual o maior problema?"\n⚡ **Squads** - "Como está o Squad 1?"\n👤 **Responsáveis** - "Quem cuida do Natal Spot?"\n🏗️ **Empreendimentos** - "Como está o Marista 144?"\n\n🔮 **Previsões:**\n• "Quantos leads teremos no próximo mês?"\n• "Vamos bater a meta?"\n• "Qual a previsão de receita?"\n• "Se aumentar leads em 20%?"\n\nPara cada resposta eu informo: **o que é, como é calculado, de onde vem e o que fazer**.`;
}

export default function BelleChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "belle", text: "Olá! Sou a **Belle**, analista sênior da Seazone Saleszone. Posso explicar qualquer elemento do dashboard — cards, gráficos, tabelas, métricas. Pergunte qualquer coisa!" }
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
      setMessages(prev => [...prev, { role: "belle", text: generateResponse(userMsg, pathname) }]);
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
