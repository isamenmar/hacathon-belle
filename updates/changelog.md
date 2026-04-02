# Changelog - Belle Analytics

---

### 2026-04-02 - Consistencia de Dados (Times + Empreendimentos)
- **Tipo**: Correcao + Melhoria
- **Descricao**: Times com dados exclusivos 2026 (24 analistas). Empreendimentos com fallback multi-fonte (25 ativos).
- **Impacto**: Elimina dados misturados de periodos anteriores. Todos empreendimentos agora carregam.
- **Paginas afetadas**: /time, /empreendimentos/[slug]
- **Metricas afetadas**: teamPerformers2026, topSellers2026, allEmpreendimentos2026

---

### 2026-04-02 - Pagina de Vendas + Campanhas com Tipo/Plataforma
- **Tipo**: Feature
- **Descricao**: Pagina /vendas com 26 vendas 2026, filtros por squad, graficos e ranking. Campanhas FB com plataforma e tipo de criativo.
- **Impacto**: Visibilidade completa de vendas por empreendimento, vendedor e squad.
- **Paginas afetadas**: /vendas, /marketing
- **Metricas afetadas**: vendas2026, facebookCampaigns2026

---

### 2026-04-02 - Estrutura Completa de Squads Comerciais
- **Tipo**: Feature
- **Descricao**: Squad 1 (Hellen+Lua) e Squad 2 (Jeni+Filipe) com 11 empreendimentos, score de saude, alertas, rankings.
- **Impacto**: Organizacao operacional com metricas de ocupacao e previsao.
- **Paginas afetadas**: /squads
- **Metricas afetadas**: squads, empHealthScores

---

### 2026-04-02 - Redesign Completo + Identidade Visual Seazone
- **Tipo**: Melhoria
- **Descricao**: Fundo branco, cores Seazone (coral #F06B5D, navy #0F1B2D). Sidebar navy, cards claros.
- **Impacto**: Identidade visual profissional consistente.
- **Paginas afetadas**: Todas
- **Metricas afetadas**: Nenhuma (visual)

---

### 2026-04-02 - Assistente Virtual Belle (Chat)
- **Tipo**: Feature
- **Descricao**: Chat flutuante com respostas sobre pipeline, squads, vendas, campanhas, gargalos, previsoes, definicoes.
- **Impacto**: Acesso rapido a insights sem navegar.
- **Paginas afetadas**: Todas (componente global)
- **Metricas afetadas**: Nenhuma (interface)

---

### 2026-04-01 - Analise V3 Consolidada (pipedrive-5Slo + RD Station)
- **Tipo**: Feature
- **Descricao**: Integracao de pipedrive_v2_consolidated_deal_flow (2.5M registros) + rd_station_contact_events (284K). MIA como 3o performer.
- **Impacto**: R$ 1.09B em deals won mapeados. 37% de lost por "nao atende" identificado.
- **Paginas afetadas**: /, /mia, /marketing
- **Metricas afetadas**: pipelineOverview, miaData, lostReasons

---

### 2026-04-01 - Site Dashboard Inicial
- **Tipo**: Feature
- **Descricao**: Dashboard completo com Next.js 16, Tailwind v4, Recharts 3. 6 paginas iniciais.
- **Impacto**: Primeira versao do site com dados de NEKT.
- **Paginas afetadas**: Todas
- **Metricas afetadas**: Todas
