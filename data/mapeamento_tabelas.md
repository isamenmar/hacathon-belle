# Mapeamento de Tabelas - NEKT Data Warehouse

**Data**: 01/04/2026
**Analista**: Belle (Agente IA)

---

## Arquitetura de Dados

O data warehouse opera no Amazon Athena via NEKT com as seguintes camadas:

| Camada | Database | Descricao |
|--------|----------|-----------|
| Trusted | nekt_trusted | Dados brutos confiáveis (principal) |
| Silver | nekt_silver | Dados refinados e limpos |
| Gold | nekt_gold | KPIs e indicadores prontos |
| Service | nekt_service | Servicos internos |
| Claude | nekt_claude | Camada de IA |

---

## Tabelas Principais para Vendas e Marketing

### Pipedrive (Deals e Pipeline)

| Tabela | Registros | Periodo | Uso |
|--------|-----------|---------|-----|
| pipedrive_v2_deal_flow | 1.163.949 | Jul/2019 - Mar/2025 | Atividades e mudancas de status |
| pipedrive_deal_flow | - | 2024+ | Deal flow (formato antigo nested) |
| deals_comissionamento | - | - | Comissionamento |

### Meetime (Pre-venda)

| Tabela | Registros | Periodo | Setor |
|--------|-----------|---------|-------|
| meetime_szs_leads | 10.755 | Dez/2023 - Out/2024 | SZS |
| meetime_szs_calls | 39.942 | Dez/2023 - Out/2024 | SZS |
| meetime_szs_prospections | ~20.435 | - | SZS |
| meetime_szs_cadences | - | - | SZS |
| meetime_szs_users | - | - | SZS |
| meetime_szi_leads | - | - | SZI |
| meetime_szi_calls | - | - | SZI |
| meetime_szi_prospections | - | - | SZI |
| meetime_parceiros_leads | - | - | Parceiros |
| meetime_parceiros_calls | - | - | Parceiros |

### Facebook Ads

| Tabela | Uso |
|--------|-----|
| facebook_ads_szi_adsinsights | Metricas de performance (impressoes, cliques, gasto) |
| facebook_ads_szs_campaigns | Campanhas ativas SZS (277 campanhas) |
| facebook_ads_si_ads | Anuncios SI |
| facebook_ads_si_activities | Atividades SI |
| facebook_ads_szf_ads | Anuncios SZF |
| facebook_ads_szp_ads | Anuncios SZP |
| facebook_ads_b2b_ads | Anuncios B2B |

### Google Ads

| Tabela | Uso |
|--------|-----|
| google_ads_campaigns | Campanhas Google |
| google_ads_campaigns_2 | Campanhas Google (v2) |
| google_ads_ad_performance_report | Performance detalhada de anuncios |

### Dataset Consolidado

| Tabela | Uso |
|--------|-----|
| dataset_szi | Funil completo por empreendimento/canal/dia (lead, mql, sql, opp, won, investimento) |
| leads_abertos | Snapshot de leads abertos por setor |

### Pipefy (Processos)

| Tabela | Uso |
|--------|-----|
| pipefy_all_cards_304378165_transformada | Cards transformados |
| pipefy_szs_all_cards_303675622_* | Cards SZS |
| pipefy_szs_all_cards_303756524 | Cards SZS |
| + 20 outras tabelas pipefy | Diversos pipes/processos |

### Outras Fontes Relevantes

| Tabela | Uso |
|--------|-----|
| google_sheets_metas_szs | Metas SZS |
| google_sheets_metas_szi | Metas SZI |
| google_sheets_metas_q2_2025 | Metas Q2 2025 |
| fireflies_transcripts | Transcricoes de reunioes |
| blip_webhook_message | Mensagens do chatbot |
| convenia_employees | Funcionarios |
