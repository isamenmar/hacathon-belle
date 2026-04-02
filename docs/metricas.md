# Definicao de Metricas

## Funil de Vendas

| Metrica | Definicao | Calculo |
|---------|-----------|---------|
| Leads | Contatos que entraram no funil | COUNT de registros no RD Station/Meetime |
| MQL | Marketing Qualified Lead | Lead com fit minimo aprovado pelo marketing |
| SQL | Sales Qualified Lead | Lead qualificado pela pre-venda para abordagem |
| OPP | Oportunidade | Lead que chegou a etapa de reuniao/negociacao |
| Won | Venda fechada | Deal com status "won" no Pipedrive |
| Lost | Perda | Deal com status "lost" no Pipedrive |

## Metricas de Custo

| Metrica | Definicao | Formula |
|---------|-----------|---------|
| CPL | Custo por Lead | Investimento / Leads |
| CMQL | Custo por MQL | Investimento / MQLs |
| CSQL | Custo por SQL | Investimento / SQLs |
| COPP | Custo por Oportunidade | Investimento / Oportunidades |
| CPW | Custo por Venda | Investimento / Won |
| CPC | Custo por Clique | Gasto Ads / Cliques |

## Metricas de Performance

| Metrica | Definicao |
|---------|-----------|
| Win Rate | Won / (Won + Lost) * 100 |
| Taxa de Conversao | Etapa seguinte / Etapa anterior * 100 |
| Ticket Medio | Valor Total Won / Nr Deals Won |
| No-Show Rate | No-shows / Reunioes Agendadas * 100 |
| Taxa de Conclusao | Atividades concluidas / Total atividades * 100 |
| CTR | Cliques / Impressoes * 100 |

## Fontes de Dados

| Fonte | Dados | Tabela NEKT |
|-------|-------|-------------|
| Pipedrive | Deals, pipeline, atividades | pipedrive_v2_deals, pipedrive_v2_consolidated_deal_flow |
| RD Station | Conversoes, formularios, UTMs | rd_station_contact_events |
| Meetime | Ligacoes, cadencias, prospections | meetime_szs_calls, meetime_szs_leads |
| Facebook Ads | Campanhas, impressoes, gasto | facebook_ads_szi_adsinsights |
| Dataset SZI | Funil por empreendimento | dataset_szi |

## Historico de Alteracoes
- 2026-04-02: Documentacao inicial de metricas
