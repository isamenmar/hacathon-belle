# Changelog — Seazone Saleszone

## [2026-04-02] — RD Station → Leads
- **Tipo:** Correção
- **Descrição:** Renomeado "Conversões RD Station" para "Leads Gerados" em todo o site
- **Impacto:** Nomenclatura alinhada com linguagem comercial
- **Páginas:** Todas

---

## [2026-04-02] — Belle com Contexto de Página
- **Tipo:** Feature
- **Descrição:** Belle identifica automaticamente gráficos, cards e tabelas da página atual
- **Impacto:** Perguntas vagas como "O que é isso?" agora funcionam
- **Páginas:** Todas (8 tipos de página mapeados)

---

## [2026-04-02] — Belle Explica Termos, Cards, Gráficos e Tabelas
- **Tipo:** Feature
- **Descrição:** 24 termos com definição completa + handlers para explicar elementos visuais
- **Impacto:** Qualquer pessoa entende o dashboard
- **Páginas:** Todas (via chat Belle)

---

## [2026-04-02] — Logo Seazone + Nome "Seazone Saleszone"
- **Tipo:** Melhoria
- **Descrição:** Logo oficial Seazone na sidebar, nome alterado de "Belle Analytics"
- **Impacto:** Identidade visual alinhada com marca

---

## [2026-04-02] — Belle Preditiva Completa (Leads, OPP, Lost, Receita)
- **Tipo:** Feature
- **Descrição:** Séries temporais (9 meses) + função projetar() + handlers para cada métrica
- **Impacto:** Previsões reais com tendência, cenários e confiança

---

## [2026-04-02] — Detecção de Intenção Futura
- **Tipo:** Correção Crítica
- **Descrição:** Belle SEMPRE projeta futuro quando detecta intenção. Nunca retorna dados passados.
- **Impacto:** Elimina respostas descritivas em perguntas preditivas

---

## [2026-04-02] — Previsão REAL com Tendência
- **Tipo:** Correção Crítica
- **Descrição:** Regressão exponencial sobre Q1/2026 substitui cenários estáticos
- **Impacto:** Projeções baseadas em dados, não estimativas genéricas

---

## [2026-04-02] — Padronização Completa do Português
- **Tipo:** Correção
- **Descrição:** Acentuação corrigida em todos os textos (sênior, ações, não, únicos, etc.)
- **Impacto:** Credibilidade profissional do sistema

---

## [2026-04-02] — Contexto Temporal em Todos os Cards
- **Tipo:** Feature
- **Descrição:** 30+ KpiCards com período explícito (Histórico/2026/Snapshot)
- **Impacto:** Zero ambiguidade sobre período dos dados
- **Métricas:** Todos os cards de todas as páginas

---

## [2026-04-02] — Belle Analista Sênior (v2.0)
- **Tipo:** Feature
- **Descrição:** Respostas com origem do dado, cálculo, período e responsável
- **Impacto:** Transparência total sobre cada métrica

---

## [2026-04-02] — Documentação Completa do Sistema
- **Tipo:** Documentação
- **Descrição:** 9 arquivos: squads, métricas, health_score, belle, data_lineage, dashboards
- **Impacto:** Sistema documentado e rastreável

---

## [2026-04-02] — Empreendimentos com Fallback Multi-Fonte
- **Tipo:** Correção
- **Descrição:** Página busca em 4 fontes (funil, RD Station 2026, squads, Facebook Ads)
- **Impacto:** Todos os 25 empreendimentos carregam com dados
- **Páginas:** /empreendimentos/[slug]

---

## [2026-04-02] — Consistência de Dados (Times 2026 + Empreendimentos)
- **Tipo:** Correção
- **Descrição:** Times com dados exclusivos 2026 (24 analistas). 25 empreendimentos ativos.
- **Impacto:** Elimina mistura de períodos
- **Páginas:** /time, sidebar

---

## [2026-04-02] — Página de Vendas + Campanhas com Tipo/Plataforma
- **Tipo:** Feature
- **Descrição:** /vendas com 26 vendas 2026, filtros por squad. Campanhas com plataforma e tipo.
- **Impacto:** Visibilidade de vendas e análise de criativos
- **Páginas:** /vendas, /marketing

---

## [2026-04-02] — Estrutura Completa de Squads Comerciais
- **Tipo:** Feature
- **Descrição:** Squad 1 (Hellen+Lua) e Squad 2 (Jeni+Filipe) com 11 empreendimentos
- **Impacto:** Organização operacional com score, alertas, rankings
- **Páginas:** /squads

---

## [2026-04-02] — Redesign Completo + Identidade Visual Seazone
- **Tipo:** Melhoria
- **Descrição:** Tema claro, cores Seazone (coral/navy), sidebar navy, cards profissionais
- **Impacto:** Visual profissional e consistente
- **Páginas:** Todas

---

## [2026-04-02] — Assistente Virtual Belle (Chat)
- **Tipo:** Feature
- **Descrição:** Chat flutuante com respostas sobre pipeline, squads, vendas, campanhas
- **Impacto:** Acesso rápido a insights sem navegar
- **Páginas:** Todas (componente global)

---

## [2026-04-01] — Análise V3 (pipedrive-5Slo + RD Station)
- **Tipo:** Feature
- **Descrição:** 2,5M registros consolidados. MIA como 3º performer. Win rate caindo.
- **Impacto:** R$ 1,09B em deals won mapeados

---

## [2026-04-01] — Análise V2 (RD Station + Pipedrive Deals)
- **Tipo:** Feature
- **Descrição:** 283K conversões RD Station + 195K deals Pipedrive
- **Impacto:** 37% de lost por "não atende" identificado

---

## [2026-04-01] — Site Dashboard Inicial
- **Tipo:** Feature
- **Descrição:** Next.js 16 + Tailwind v4 + Recharts 3. 6 páginas com dados reais.
- **Impacto:** Primeira versão do dashboard

---

## [2026-04-01] — Análise Completa de Vendas e Marketing (v1.0)
- **Tipo:** Feature
- **Descrição:** Queries SQL, relatórios, insights sobre funil, equipe, campanhas
- **Impacto:** Base de dados mapeada com 200+ tabelas NEKT
