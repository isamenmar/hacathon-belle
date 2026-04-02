# Contexto de Interface — Belle

## Visão Geral
A Belle identifica automaticamente a página em que o usuário está e adapta as respostas.

## Mapeamento de Páginas

### / (Home)
- Cards: Deals Won, Valor Total, Win Rate, Ticket Médio, Leads Abertos
- Gráficos: Deals Won por Mês, Funil de Vendas, Won vs Lost, Leads por Setor
- Tabelas: Motivos de Perda, Métricas Comerciais, Conversão por Canal, Métricas por Setor

### /marketing
- Cards: Investimento FB, Impressões, Cliques, CPL, CPW
- Gráficos: Leads Gerados por Trimestre, Top Empreendimentos por Leads
- Tabelas: Campanhas Facebook Ads, Funil MKT vs PARC

### /time
- Cards: Total Atividades, Reuniões, Contratos, Analistas Ativos (2026)
- Gráficos: Top 10 por Volume, Radar de Canal
- Tabelas: Ranking de Atividades, Top Vendedores por Valor

### /mia
- Cards: Atividades, Reuniões, No-Shows, Efetivas, Contratos (2026)
- Gráficos: Distribuição de Atividades, MIA vs Humano
- Cards análise: Pontos Fortes, Melhorias, Recomendações, Impacto

### /squads
- Cards: Squads Ativos, Membros, Leads, Won, Alertas
- Cards de Squad: Funil, ocupação, score, membros, empreendimentos, alertas
- Gráficos: Conversão, Radar, Volume, Ocupação
- Tabelas: Score de Saúde, Rankings

### /vendas
- Cards: Valor Vendido, Número Vendas, Ticket Médio, Vendedores (2026)
- Gráficos: Vendas por Empreendimento/Mês/Vendedor/Squad
- Tabelas: Detalhamento de Vendas, Ranking Vendedores

### /setores/[slug]
- Cards: Won, Lost, Valor, Leads Abertos, Pipeline (2026)
- Gráficos: Won vs Lost, Empreendimentos por Won
- Tabela: Funil por Empreendimento

### /empreendimentos/[slug]
- Cards: Leads, MQL, OPP, Won, CPW
- Gráficos: Funil de Vendas, Taxas de Conversão
- Cards: Investimento, Leads Gerados 2026, Facebook Ads, Squad

## Comportamento
1. Detecta pathname via usePathname()
2. Busca contexto no mapa pageContext
3. Adapta respostas para "O que é isso?" / "Explica esse gráfico"
4. Se ambíguo: lista elementos da página e pergunta qual

## Histórico
- 2026-04-02: Mapeamento de 8 tipos de página
