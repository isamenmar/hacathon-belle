// ============ SEAZONE COLORS ============
export const COLORS = {
  coral: "#F06B5D",
  coralLight: "#f8a49b",
  navy: "#0F1B2D",
  navyLight: "#1a2d47",
  white: "#ffffff",
  grayBg: "#f8f9fa",
  grayBorder: "#e5e7eb",
  grayText: "#6b7280",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#eab308",
  blue: "#3b82f6",
  indigo: "#6366f1",
};

export const CHART_COLORS = ["#F06B5D", "#0F1B2D", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6", "#f97316", "#ec4899"];

// ============ FUNNEL DATA BY CHANNEL ============
export const funnelByChannel = [
  { canal: "MKT", leads: 39427, mql: 24440, sql: 5307, opp: 1831, won: 268, investimento: 255691 },
  { canal: "PARC", leads: 7681, mql: 6720, sql: 1804, opp: 1039, won: 353, investimento: 0 },
  { canal: "Outros", leads: 422, mql: 338, sql: 107, opp: 71, won: 7, investimento: 0 },
];

// ============ FUNNEL DATA BY EMPREENDIMENTO ============
export const funnelByEmpreendimento = [
  { nome: "Marista 144 Spot", slug: "marista-144-spot", leads: 13180, mql: 6934, sql: 1993, opp: 572, won: 219, investimento: 22750, cpw: 103.88, setor: "SZI" },
  { nome: "Urubici Spot II", slug: "urubici-spot-ii", leads: 11866, mql: 8965, sql: 1854, opp: 812, won: 104, investimento: 31850, cpw: 306.25, setor: "SZI" },
  { nome: "Vistas de Anitá 2", slug: "vistas-de-anita-2", leads: 6906, mql: 5227, sql: 558, opp: 214, won: 15, investimento: 55266, cpw: 3684.40, setor: "SZI" },
  { nome: "Santinho Spot", slug: "santinho-spot", leads: 3876, mql: 1933, sql: 846, opp: 285, won: 75, investimento: 0, cpw: 0, setor: "SZS" },
  { nome: "Batel Spot", slug: "batel-spot", leads: 3061, mql: 2405, sql: 256, opp: 111, won: 30, investimento: 36300, cpw: 1210, setor: "SZI" },
  { nome: "Meireles Spot", slug: "meireles-spot", leads: 2103, mql: 1080, sql: 233, opp: 79, won: 39, investimento: 0, cpw: 0, setor: "SZS" },
  { nome: "Bonito Spot", slug: "bonito-spot", leads: 1789, mql: 1237, sql: 396, opp: 149, won: 38, investimento: 0, cpw: 0, setor: "SZS" },
  { nome: "Vale do Ouro", slug: "vale-do-ouro", leads: 1564, mql: 1251, sql: 379, opp: 244, won: 24, investimento: 25294, cpw: 1053.92, setor: "SZI" },
  { nome: "Morro das Pedras Spot", slug: "morro-das-pedras-spot", leads: 822, mql: 780, sql: 80, opp: 37, won: 4, investimento: 45600, cpw: 11400, setor: "SZI" },
  { nome: "Santo Antônio Spot", slug: "santo-antonio-spot", leads: 692, mql: 485, sql: 63, opp: 25, won: 11, investimento: 0, cpw: 0, setor: "SZS" },
  { nome: "Imbassaí Spot", slug: "imbassai-spot", leads: 445, mql: 356, sql: 147, opp: 111, won: 11, investimento: 15175, cpw: 1379.55, setor: "SZI" },
  { nome: "Salvador Spot", slug: "salvador-spot", leads: 406, mql: 325, sql: 162, opp: 130, won: 13, investimento: 12015, cpw: 923.46, setor: "SZI" },
  { nome: "Caraguá Spot", slug: "caragua-spot", leads: 323, mql: 203, sql: 98, opp: 84, won: 23, investimento: 0, cpw: 0, setor: "SZI" },
  { nome: "Jurerê Spot II", slug: "jurere-spot-ii", leads: 309, mql: 167, sql: 78, opp: 29, won: 10, investimento: 0, cpw: 0, setor: "SZI" },
  { nome: "Trancoso Spot", slug: "trancoso-spot", leads: 188, mql: 150, sql: 75, opp: 60, won: 6, investimento: 11441, cpw: 1906.83, setor: "SZI" },
];

// ============ DEALS WON BY MONTH (2025-2026 focus) ============
export const dealsWonByMonth = [
  { mes: "Jan/25", won: 275, valor: 26382710, ticket: 95937 },
  { mes: "Fev/25", won: 394, valor: 60578765, ticket: 153753 },
  { mes: "Mar/25", won: 210, valor: 18622725, ticket: 88680 },
  { mes: "Abr/25", won: 382, valor: 50553790, ticket: 132340 },
  { mes: "Mai/25", won: 267, valor: 28631251, ticket: 107233 },
  { mes: "Jun/25", won: 272, valor: 23712969, ticket: 87180 },
  { mes: "Jul/25", won: 404, valor: 34248397, ticket: 84773 },
  { mes: "Ago/25", won: 556, valor: 41890633, ticket: 75343 },
  { mes: "Set/25", won: 790, valor: 42404495, ticket: 53677 },
  { mes: "Out/25", won: 762, valor: 44845590, ticket: 58852 },
  { mes: "Nov/25", won: 583, valor: 22440622, ticket: 38492 },
  { mes: "Dez/25", won: 682, valor: 32448367, ticket: 47578 },
  { mes: "Jan/26", won: 563, valor: 29535529, ticket: 52461 },
  { mes: "Fev/26", won: 420, valor: 20231194, ticket: 48170 },
  { mes: "Mar/26", won: 412, valor: 24639000, ticket: 59803 },
];

// ============ LOST REASONS ============
export const lostReasons = [
  { motivo: "Não atende/Não responde", total: 65779, pct: 37.0 },
  { motivo: "Não tem interesse", total: 13155, pct: 7.4 },
  { motivo: "Sem conexão", total: 9401, pct: 5.3 },
  { motivo: "Timing", total: 9120, pct: 5.1 },
  { motivo: "Duplicado/Erro", total: 4789, pct: 2.7 },
  { motivo: "Parou de responder", total: 4775, pct: 2.7 },
  { motivo: "Região Inativa/Descartada", total: 4267, pct: 2.4 },
  { motivo: "Região Não Atendida", total: 3882, pct: 2.2 },
  { motivo: "Sem resposta", total: 3375, pct: 1.9 },
  { motivo: "Contato Inválido", total: 2951, pct: 1.7 },
];

// ============ TOP SELLERS 2026 ============
export const topSellers2026 = [
  { nome: "Gabriel Zonatto", dealsWon: 147, valorTotal: 0, ticketMedio: 0 },
  { nome: "Pedro Eckert", dealsWon: 141, valorTotal: 0, ticketMedio: 0 },
  { nome: "Giovanna Zanchetta", dealsWon: 105, valorTotal: 1321462, ticketMedio: 12585 },
  { nome: "Gabriela Branco", dealsWon: 99, valorTotal: 131881, ticketMedio: 1332 },
  { nome: "Gabriela Lemos", dealsWon: 81, valorTotal: 0, ticketMedio: 0 },
  { nome: "Eduardo Albani", dealsWon: 79, valorTotal: 2968388, ticketMedio: 37575 },
  { nome: "Carol Rosário", dealsWon: 77, valorTotal: 4383579, ticketMedio: 56930 },
  { nome: "Automação", dealsWon: 74, valorTotal: 0, ticketMedio: 0 },
  { nome: "Filipe Padoveze", dealsWon: 72, valorTotal: 777794, ticketMedio: 10803 },
  { nome: "Maria Vitória Amaral", dealsWon: 69, valorTotal: 50000, ticketMedio: 725 },
  { nome: "Fabio Cristiano", dealsWon: 43, valorTotal: 13573063, ticketMedio: 315653 },
  { nome: "Amanda Peixoto", dealsWon: 27, valorTotal: 6393469, ticketMedio: 236795 },
  { nome: "Luana Schaikoski", dealsWon: 25, valorTotal: 8011168, ticketMedio: 320447 },
  { nome: "Priscila Pestana", dealsWon: 18, valorTotal: 5421254, ticketMedio: 301181 },
];

// ============ TEAM ACTIVITY 2026 ============
export const teamPerformers2026 = [
  { nome: "Automação", total: 26315, calls: 2393, whatsapp: 20944, mensagens: 2506, reunioes: 2, contratos: 0, noShows: 2 },
  { nome: "Morada - Mia (IA)", total: 16581, calls: 2113, whatsapp: 2614, mensagens: 1707, reunioes: 2565, contratos: 0, noShows: 1538 },
  { nome: "Hellen Dias", total: 14946, calls: 7141, whatsapp: 123, mensagens: 2196, reunioes: 33, contratos: 0, noShows: 93 },
  { nome: "Natália Saramago", total: 14168, calls: 6438, whatsapp: 103, mensagens: 2492, reunioes: 1493, contratos: 0, noShows: 128 },
  { nome: "Karoane Izabela", total: 11121, calls: 7495, whatsapp: 184, mensagens: 3103, reunioes: 2, contratos: 0, noShows: 61 },
  { nome: "Karoline Borges", total: 8636, calls: 5786, whatsapp: 96, mensagens: 2441, reunioes: 100, contratos: 0, noShows: 36 },
  { nome: "Luciana Patrício", total: 8130, calls: 5610, whatsapp: 10, mensagens: 1096, reunioes: 127, contratos: 0, noShows: 193 },
  { nome: "Gabriel Zonatto", total: 7273, calls: 857, whatsapp: 5463, mensagens: 871, reunioes: 10, contratos: 0, noShows: 4 },
  { nome: "Joyce", total: 5804, calls: 2216, whatsapp: 294, mensagens: 2221, reunioes: 476, contratos: 0, noShows: 108 },
  { nome: "Larissa Marques", total: 5758, calls: 1071, whatsapp: 327, mensagens: 2599, reunioes: 1, contratos: 0, noShows: 141 },
  { nome: "Raquel", total: 4651, calls: 2493, whatsapp: 147, mensagens: 1869, reunioes: 11, contratos: 0, noShows: 123 },
  { nome: "Rubia Lorena", total: 4541, calls: 1801, whatsapp: 596, mensagens: 1836, reunioes: 132, contratos: 0, noShows: 6 },
  { nome: "Raynara Lopes", total: 4200, calls: 1274, whatsapp: 713, mensagens: 2126, reunioes: 42, contratos: 0, noShows: 37 },
  { nome: "Gabriela Lemos", total: 4037, calls: 462, whatsapp: 1551, mensagens: 498, reunioes: 448, contratos: 0, noShows: 18 },
  { nome: "Giovanna Zanchetta", total: 3420, calls: 1106, whatsapp: 1327, mensagens: 436, reunioes: 327, contratos: 0, noShows: 6 },
  { nome: "Rodrigo Paixão", total: 3407, calls: 1297, whatsapp: 1289, mensagens: 632, reunioes: 44, contratos: 26, noShows: 23 },
];

// ============ MIA DATA 2026 ============
export const miaData = {
  totalAtividades: 16581,
  ranking: 2,
  calls: 2113,
  whatsapp: 2614,
  mensagens: 1707,
  reunioesAgendadas: 2565,
  noShows: 1538,
  taxaNoShow: 60.0,
  contratos: 0,
  reunioesEfetivas: 1027,
};

// ============ FACEBOOK ADS 2026 (SZI) ============
export const facebookCampaigns2026 = [
  { nome: "Barra Grande Spot (BA/MG)", gasto: 100395, impressoes: 2875621, cliques: 26069, cpc: 4.50, ctr: 1.04, setor: "SZI", regiao: "BA/MG" },
  { nome: "Natal Spot (RN/CE/PB)", gasto: 89816, impressoes: 4559596, cliques: 30236, cpc: 3.50, ctr: 0.89, setor: "SZI", regiao: "RN/CE/PB" },
  { nome: "Jurerê Spot III (RS/SC/PR)", gasto: 73421, impressoes: 2756766, cliques: 19733, cpc: 4.14, ctr: 0.78, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Barra Grande Spot II (BA/MG)", gasto: 58454, impressoes: 1453473, cliques: 14047, cpc: 5.04, ctr: 1.00, setor: "SZI", regiao: "BA/MG" },
  { nome: "Ponta das Canas II (RS/SC/PR)", gasto: 58217, impressoes: 3004363, cliques: 34305, cpc: 2.23, ctr: 1.94, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Natal Spot II (RN/CE/PB)", gasto: 56284, impressoes: 1469169, cliques: 13651, cpc: 4.44, ctr: 0.97, setor: "SZI", regiao: "RN/CE/PB" },
  { nome: "Ponta das Canas (RS/SC/PR)", gasto: 55413, impressoes: 1922679, cliques: 32807, cpc: 1.86, ctr: 1.91, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Jurerê Spot II (RS/SC/PR)", gasto: 44636, impressoes: 1059138, cliques: 13431, cpc: 3.63, ctr: 1.42, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Jurerê Spot II v2 (RS/SC/PR)", gasto: 37849, impressoes: 870927, cliques: 8654, cpc: 5.01, ctr: 1.05, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Novo Campeche II (RS/SC/PR)", gasto: 28567, impressoes: 618897, cliques: 5820, cpc: 5.50, ctr: 1.11, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Vistas de Anitá (RS/SC/PR)", gasto: 22813, impressoes: 754155, cliques: 11342, cpc: 2.73, ctr: 1.45, setor: "SZI", regiao: "RS/SC/PR" },
  { nome: "Bonito Spot II (MS/MT/PR/GO)", gasto: 4197, impressoes: 116977, cliques: 1137, cpc: 3.49, ctr: 1.18, setor: "SZI", regiao: "MS/MT/PR/GO" },
];

// ============ RD STATION 2026 ============
export const rdTop2026 = [
  { nome: "Ponta das Canas Spot II", conversoes: 5001, contatos: 4766 },
  { nome: "Natal Spot", conversoes: 4821, contatos: 4604 },
  { nome: "Barra Grande Spot", conversoes: 4422, contatos: 4252 },
  { nome: "Jurerê Spot III", conversoes: 2399, contatos: 2380 },
  { nome: "Jurerê Spot II", conversoes: 1925, contatos: 1823 },
  { nome: "Foz Spot", conversoes: 1508, contatos: 1451 },
  { nome: "Vistas de Anitá II", conversoes: 1359, contatos: 1331 },
  { nome: "Rosa Sul Spot", conversoes: 1306, contatos: 1248 },
  { nome: "Cachoeira Beach Spot", conversoes: 1245, contatos: 1213 },
  { nome: "Meireles Spot", conversoes: 1065, contatos: 1020 },
  { nome: "Ilha do Campeche II", conversoes: 918, contatos: 910 },
  { nome: "Caraguá Spot", conversoes: 79, contatos: 68 },
];

export const rdConversionsByMonth = [
  { mes: "Jan/25", conversoes: 10309, contatos: 6030 },
  { mes: "Abr/25", conversoes: 11200, contatos: 6046 },
  { mes: "Jul/25", conversoes: 9801, contatos: 6416 },
  { mes: "Out/25", conversoes: 19683, contatos: 14636 },
  { mes: "Jan/26", conversoes: 18461, contatos: 14952 },
  { mes: "Fev/26", conversoes: 15738, contatos: 12515 },
  { mes: "Mar/26", conversoes: 11669, contatos: 9063 },
];

// ============ PIPELINE OVERVIEW ============
export const pipelineOverview = {
  totalDeals: 195327,
  won: { deals: 12515, valor: 1087947206, ticketMedio: 86931 },
  lost: { deals: 178681, valor: 810650832 },
  open: { deals: 4131, valor: 88244192 },
  winRate: 6.4,
};

// ============ LEADS ABERTOS ============
export const leadsAbertos = [
  { setor: "SZI", leads: 684 },
  { setor: "SZS", leads: 559 },
  { setor: "Parceiros", leads: 515 },
  { setor: "Marketplace", leads: 451 },
  { setor: "Expansão", leads: 149 },
];

// ============ METRICAS COMERCIAIS ============
export const metricasComerciais = { cpl: 6.49, cmql: 10.46, copp: 139.65, cpw: 954.07 };

// ============ WIN/LOST BY MONTH ============
export const winLostByMonth = [
  { mes: "Jan/25", won: 56, lost: 463 },
  { mes: "Fev/25", won: 388, lost: 7854 },
  { mes: "Mar/25", won: 240, lost: 4063 },
  { mes: "Abr/25", won: 438, lost: 5326 },
  { mes: "Mai/25", won: 287, lost: 5253 },
  { mes: "Jun/25", won: 286, lost: 5382 },
  { mes: "Jul/25", won: 437, lost: 6766 },
  { mes: "Ago/25", won: 584, lost: 8683 },
  { mes: "Set/25", won: 820, lost: 11296 },
  { mes: "Out/25", won: 818, lost: 20830 },
  { mes: "Nov/25", won: 633, lost: 10411 },
  { mes: "Dez/25", won: 709, lost: 9967 },
  { mes: "Jan/26", won: 593, lost: 12940 },
  { mes: "Fev/26", won: 454, lost: 10373 },
  { mes: "Mar/26", won: 415, lost: 15058 },
];

// ============ SETORES (with 2026 metrics) ============
export const setores = [
  { slug: "szs", nome: "SZS (Seazone Services)", pipeline: 14, leadsAbertos: 559, wonTotal: 455, valorTotal: 578515, lostTotal: 6820, cpl: 0, cmql: 0, csql: 0, copp: 0 },
  { slug: "szi", nome: "SZI (Seazone Investimentos)", pipeline: 28, leadsAbertos: 684, wonTotal: 169, valorTotal: 53526714, lostTotal: 13885, cpl: 5.42, cmql: 8.73, csql: 38.21, copp: 112.50 },
  { slug: "parceiros", nome: "Parceiros", pipeline: 7, leadsAbertos: 515, wonTotal: 494, valorTotal: 0, lostTotal: 7162, cpl: 0, cmql: 0, csql: 0, copp: 0 },
  { slug: "marketplace", nome: "Marketplace", pipeline: 44, leadsAbertos: 451, wonTotal: 134, valorTotal: 8678904, lostTotal: 1390, cpl: 0, cmql: 0, csql: 0, copp: 0 },
  { slug: "expansao", nome: "Expansão", pipeline: 13, leadsAbertos: 149, wonTotal: 11, valorTotal: 170000, lostTotal: 547, cpl: 0, cmql: 0, csql: 0, copp: 0 },
];

// ============ BELLE ASSISTANT KNOWLEDGE BASE ============
export const belleKnowledge = {
  definitions: {
    CPL: "Custo por Lead - Total investido dividido pelo número de leads gerados",
    MQL: "Marketing Qualified Lead - Lead qualificado pelo marketing com fit mínimo",
    SQL: "Sales Qualified Lead - Lead qualificado pela pré-venda para abordagem comercial",
    OPP: "Oportunidade - Lead que chegou à etapa de reunião/negociação",
    CPW: "Custo por Won - Total investido dividido pelo número de vendas fechadas",
    CMQL: "Custo por MQL - Total investido dividido pelo número de MQLs",
    COPP: "Custo por Oportunidade - Total investido dividido pelo número de oportunidades",
    CSQL: "Custo por SQL - Total investido dividido pelo número de SQLs",
    CPC: "Custo por Clique - Valor pago por cada clique em anúncios",
    CTR: "Click-Through Rate - Taxa de cliques sobre impressões (%)",
    "Win Rate": "Taxa de conversão de deals para won (ganhos)",
    "No-Show": "Lead que agendou reunião mas não compareceu",
    "Ticket Médio": "Valor médio por deal fechado (won)",
  },
  dataSources: {
    "Pipedrive": "CRM principal - deals, pipeline, atividades, stages",
    "RD Station": "Automação de marketing - conversões, formulários, UTMs",
    "Meetime": "Plataforma de pré-venda - ligações, cadências, prospections",
    "Facebook Ads": "Campanhas Meta - impressões, cliques, gasto, leads",
    "Google Ads": "Campanhas de busca paga",
    "NEKT": "Data warehouse (Amazon Athena) que consolida todas as fontes",
    "Pipefy": "Processos operacionais e fluxos de trabalho",
  },
  insights: [
    "37% dos deals são perdidos por 'Não atende/Não responde' - principal gargalo",
    "Canal Parceiros converte 6,8x mais que Marketing (4,6% vs 0,68%)",
    "MIA (IA) agenda 4,4x mais reuniões que humanos mas tem 60% de no-show em 2026",
    "Win rate caindo: 10,8% (Jan/25) → 2,7% (Mar/26)",
    "Marista 144 Spot tem o melhor CPW: R$ 103,88",
    "Morro das Pedras Spot tem CPW crítico: R$ 11.400",
    "Facebook Ads gera 65%+ das conversões no RD Station",
    "Ticket médio caiu de R$ 167K (2024) para R$ 52K (2026) - mais volume, menor valor",
    "Luana Schaikoski lidera em valor por deal: R$ 320K ticket médio em 2026",
  ],
};

// ============ HELPERS ============
export function formatCurrency(value: number): string {
  if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `R$ ${(value / 1e3).toFixed(1)}K`;
  return `R$ ${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR');
}

// ============ SQUADS - ESTRUTURA REAL (CLAUDE.md) ============

export interface SquadMember {
  nome: string;
  role: "Pre-vendas" | "Closer" | "Misto";
  calls: number;
  whatsapp: number;
  mensagens: number;
  reunioes: number;
  contratos: number;
  dealsWon: number;
  valorTotal: number;
}

export interface SquadEmpreendimento {
  nome: string;
  fonte: string;
  leads: number;
  mql: number;
  sql: number;
  opp: number;
  won: number;
  investimento: number;
  cpw: number;
  conversoes2026: number;
  score: number;
  scoreLabel: "bom" | "medio" | "critico";
}

export interface Squad {
  id: string;
  nome: string;
  tipo: string;
  membros: SquadMember[];
  empreendimentos: SquadEmpreendimento[];
  capacidadeSemanal: string;
  leadsAtribuidos: number;
  leadsAtivos: number;
  ocupacao: number;
  status: "saudavel" | "atencao" | "sobrecarregado";
  metricas: { leads: number; mql: number; sql: number; opp: number; won: number; investimento: number };
  score: number;
  scoreLabel: "bom" | "medio" | "critico";
  alertas: string[];
  previsaoWon: number;
}

function calcEmpScore(leads: number, won: number, cpw: number): number {
  const convRate = leads > 0 ? (won / leads) * 100 : 0;
  const cpwScore = cpw === 0 ? 70 : cpw < 500 ? 90 : cpw < 1500 ? 60 : cpw < 4000 ? 30 : 10;
  const volumeScore = won >= 50 ? 90 : won >= 20 ? 70 : won >= 10 ? 50 : 30;
  return Math.round((convRate * 10 + cpwScore + volumeScore) / 3);
}

function getScoreLabel(score: number): "bom" | "medio" | "critico" {
  return score >= 60 ? "bom" : score >= 40 ? "medio" : "critico";
}

// Empreendimentos do Squad 1 (Hellen + Lua)
const sq1Emps: SquadEmpreendimento[] = [
  { nome: "Ponta das Canas Spot II", fonte: "Facebook Ads + RD Station", leads: 3200, mql: 2100, sql: 580, opp: 210, won: 28, investimento: 113631, cpw: 4058.25, conversoes2026: 5001, score: 0, scoreLabel: "medio" },
  { nome: "Itacaré Spot", fonte: "Facebook Ads (BA/MG)", leads: 1800, mql: 1200, sql: 340, opp: 120, won: 14, investimento: 0, cpw: 0, conversoes2026: 301, score: 0, scoreLabel: "medio" },
  { nome: "Marista 144 Spot", fonte: "Facebook Ads (GO/DF/MT)", leads: 13180, mql: 6934, sql: 1993, opp: 572, won: 219, investimento: 22750, cpw: 103.88, conversoes2026: 40, score: 0, scoreLabel: "bom" },
  { nome: "Jurerê Spot II", fonte: "Facebook Ads (RS/SC/PR)", leads: 309, mql: 167, sql: 78, opp: 29, won: 10, investimento: 82485, cpw: 8248.50, conversoes2026: 1925, score: 0, scoreLabel: "critico" },
  { nome: "Jurerê Spot III", fonte: "Facebook Ads (RS/SC/PR)", leads: 2400, mql: 1600, sql: 420, opp: 150, won: 18, investimento: 73421, cpw: 4079.00, conversoes2026: 2399, score: 0, scoreLabel: "medio" },
  { nome: "Vistas de Anitá 2", fonte: "Facebook Ads (Brasil)", leads: 6906, mql: 5227, sql: 558, opp: 214, won: 15, investimento: 55266, cpw: 3684.40, conversoes2026: 1359, score: 0, scoreLabel: "critico" },
];
sq1Emps.forEach(e => { e.score = calcEmpScore(e.leads, e.won, e.cpw); e.scoreLabel = getScoreLabel(e.score); });

// Empreendimentos do Squad 2 (Jeni + Filipe)
const sq2Emps: SquadEmpreendimento[] = [
  { nome: "Barra Grande Spot", fonte: "Facebook Ads (BA/MG)", leads: 4500, mql: 3000, sql: 800, opp: 280, won: 32, investimento: 158849, cpw: 4964.03, conversoes2026: 4422, score: 0, scoreLabel: "medio" },
  { nome: "Natal Spot", fonte: "Facebook Ads (RN/CE/PB)", leads: 4800, mql: 3200, sql: 850, opp: 300, won: 35, investimento: 146099, cpw: 4174.26, conversoes2026: 4821, score: 0, scoreLabel: "medio" },
  { nome: "Novo Campeche Spot II", fonte: "Facebook Ads (RS/SC/PR)", leads: 1200, mql: 800, sql: 200, opp: 70, won: 8, investimento: 28567, cpw: 3570.88, conversoes2026: 319, score: 0, scoreLabel: "critico" },
  { nome: "Caraguá Spot", fonte: "Facebook Ads (RS/SC/PR/SP)", leads: 323, mql: 203, sql: 98, opp: 84, won: 23, investimento: 0, cpw: 0, conversoes2026: 79, score: 0, scoreLabel: "bom" },
  { nome: "Bonito Spot", fonte: "Facebook Ads (MS)", leads: 1789, mql: 1237, sql: 396, opp: 149, won: 38, investimento: 4197, cpw: 110.45, conversoes2026: 93, score: 0, scoreLabel: "bom" },
];
sq2Emps.forEach(e => { e.score = calcEmpScore(e.leads, e.won, e.cpw); e.scoreLabel = getScoreLabel(e.score); });

// Membros dos Squads (dados reais 2026)
const sq1Members: SquadMember[] = [
  { nome: "Hellen Dias", role: "Pre-vendas", calls: 7141, whatsapp: 123, mensagens: 2196, reunioes: 33, contratos: 0, dealsWon: 0, valorTotal: 0 },
  { nome: "Luana Schaikoski", role: "Closer", calls: 159, whatsapp: 14833, mensagens: 2351, reunioes: 1314, contratos: 120, dealsWon: 25, valorTotal: 8011168 },
];
const sq2Members: SquadMember[] = [
  { nome: "Jeniffer Correa", role: "Pre-vendas", calls: 1929, whatsapp: 432, mensagens: 187, reunioes: 8, contratos: 0, dealsWon: 0, valorTotal: 0 },
  { nome: "Filipe Padoveze", role: "Closer", calls: 125, whatsapp: 1678, mensagens: 1030, reunioes: 229, contratos: 26, dealsWon: 72, valorTotal: 777794 },
];

function buildRealSquad(id: string, nome: string, tipo: string, membros: SquadMember[], emps: SquadEmpreendimento[], capSemanal: string): Squad {
  const m = emps.reduce((acc, e) => ({
    leads: acc.leads + e.leads, mql: acc.mql + e.mql, sql: acc.sql + e.sql,
    opp: acc.opp + e.opp, won: acc.won + e.won, investimento: acc.investimento + e.investimento,
  }), { leads: 0, mql: 0, sql: 0, opp: 0, won: 0, investimento: 0 });

  const avgScore = emps.length > 0 ? Math.round(emps.reduce((s, e) => s + e.score, 0) / emps.length) : 0;
  const capNum = 50 * 4; // ~50 leads/semana * 4 semanas
  const leadsAtivos = Math.round(m.leads * 0.04);
  const ocupacao = Math.min(100, Math.round((leadsAtivos / capNum) * 100));
  const status: Squad["status"] = ocupacao <= 70 ? "saudavel" : ocupacao <= 90 ? "atencao" : "sobrecarregado";

  const alertas: string[] = [];
  if (ocupacao > 90) alertas.push("Squad sobrecarregado - redistribuir leads");
  emps.forEach(e => {
    if (e.cpw > 5000) alertas.push(`${e.nome}: CPW critico (R$ ${formatNumber(Math.round(e.cpw))})`);
    if (e.won < 10 && e.leads > 1000) alertas.push(`${e.nome}: Baixa conversao (${e.won} won de ${formatNumber(e.leads)} leads)`);
  });
  if (m.leads > 0 && (m.won / m.leads) * 100 < 1) alertas.push("Taxa de conversao geral abaixo de 1%");
  const wonTotal = membros.reduce((s, mb) => s + mb.dealsWon, 0);
  if (wonTotal < 20) alertas.push("Volume de fechamento abaixo da meta mensal");

  return {
    id, nome, tipo, membros, empreendimentos: emps, capacidadeSemanal: capSemanal,
    leadsAtribuidos: leadsAtivos, leadsAtivos: Math.round(leadsAtivos * 0.6),
    ocupacao, status, metricas: m,
    score: avgScore, scoreLabel: getScoreLabel(avgScore),
    alertas, previsaoWon: Math.round(m.won * 1.1),
  };
}

export const squads: Squad[] = [
  buildRealSquad("squad-1", "Squad 1 - Hellen + Lua", "Misto (Pre-vendas + Closer)", sq1Members, sq1Emps, "40-60"),
  buildRealSquad("squad-2", "Squad 2 - Jeni + Filipe", "Misto (Pre-vendas + Closer)", sq2Members, sq2Emps, "40-60"),
];

export const empHealthScores = [...sq1Emps, ...sq2Emps].map(e => ({
  nome: e.nome,
  score: e.score,
  scoreLabel: e.scoreLabel,
  conversao: e.leads > 0 ? ((e.won / e.leads) * 100) : 0,
  cpw: e.cpw,
  volume: e.won,
  conversoes2026: e.conversoes2026,
  squad: squads.find(s => s.empreendimentos.some(se => se.nome === e.nome))?.nome.split(" - ")[0] || "N/A",
}));
