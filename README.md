# Belle - Agente de IA | Analista de Vendas e Marketing

## Sobre

Belle e um agente de Inteligencia Artificial especializado em analise avancada de vendas e marketing da Seazone Investimentos. Este repositorio contem todas as analises, queries SQL, dashboards e insights gerados automaticamente.

## Estrutura do Repositorio

```
/sql          - Queries SQL utilizadas para extrair dados do NEKT (Athena)
/dashboards   - Dashboards e visualizacoes
/insights     - Analises e insights estrategicos
/reports      - Relatorios executivos consolidados
/data         - Dados de referencia e mapeamento de tabelas
```

## Fontes de Dados

| Fonte | Descricao | Periodo |
|-------|-----------|---------|
| Pipedrive | Deals, pipeline, atividades | Jul/2019 - Mar/2025 |
| Meetime SZS | Leads, calls, prospections pre-venda | Dez/2023 - Out/2024 |
| Facebook Ads (SZI) | Campanhas, impressoes, cliques, gasto | Jun/2023 - Mar/2026 |
| Google Ads | Campanhas de busca | 2019 - atual |
| Dataset SZI | Funil completo por empreendimento | 2025 |
| Pipefy | Processos operacionais | Ativo |

## Metricas Principais

- **Funil**: Leads > MQL > SQL > Oportunidades > Won/Lost
- **Comerciais**: CPL, CMQL, COPP, CPW por empreendimento
- **Marketing**: ROI por campanha, plataforma e criativo
- **Equipe**: Performance por analista (ligacoes, reunioes, conversao)

## Tecnologia

- **Data Warehouse**: Amazon Athena via NEKT
- **Databases**: nekt_trusted (principal)
- **Agente IA**: Belle (Claude Opus)
