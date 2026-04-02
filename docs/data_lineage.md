# Data Lineage - Rastreabilidade dos Dados

## Fluxo de Dados

```
Facebook Ads / Google Ads
    ↓
RD Station (conversoes, formularios)
    ↓
Meetime (pre-venda: calls, cadencias)
    ↓
Pipedrive (deals, pipeline, atividades)
    ↓
NEKT (data warehouse - Amazon Athena)
    ↓
Belle Analytics (dashboard)
```

## Fontes e Tabelas

### Pipedrive (source: pipedrive-5Slo)
- `pipedrive_v2_consolidated_deal_flow`: 2.508.672 registros
- `pipedrive_v2_deals`: 195.327 deals
- `pipedrive_v2_users`: usuarios/vendedores
- `pipedrive_v2_stages`: etapas do funil
- `pipedrive_v2_pipelines`: pipelines (SZI=#28, SZS=#14, Parceiros=#7)

### RD Station
- `rd_station_contact_events`: 283.950 eventos de conversao
- Campos-chave: cf_empreendimento, traffic_source, cf_utm_criativo

### Meetime
- `meetime_szs_calls`: 39.942 ligacoes
- `meetime_szs_leads`: 10.755 leads
- `meetime_szs_prospections`: status de prospeccao

### Facebook Ads
- `facebook_ads_szi_adsinsights`: metricas por campanha (impressoes, cliques, gasto)
- `facebook_ads_szs_campaigns`: campanhas SZS ativas

### Dataset Consolidado
- `dataset_szi`: funil por empreendimento/canal/dia

## Periodo dos Dados

| Fonte | Periodo |
|-------|---------|
| Pipedrive deals | Jul/2019 - Abr/2026 |
| Pipedrive activities | Jun/2019 - Abr/2026 |
| RD Station | Jan/2024 - Abr/2026 |
| Meetime | Dez/2023 - Out/2024 |
| Facebook Ads SZI | Jun/2023 - Mar/2026 |

## Prioridade Temporal
O sistema prioriza dados de 2026 (Jan-Mar). Dados anteriores sao usados para comparacao.

## Historico de Alteracoes
- 2026-04-02: Mapeamento inicial de data lineage
