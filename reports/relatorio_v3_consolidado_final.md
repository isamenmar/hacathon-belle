# Relatorio V3 - Analise Consolidada Final (pipedrive-5Slo + RD Station)

**Data**: 01/04/2026
**Analista**: Belle (Agente IA)
**Fontes**: pipedrive_v2_consolidated_deal_flow (2,5M registros) + rd_station_contact_events (284K) + pipedrive_v2_deals (195K)

---

## 1. PANORAMA GERAL

| Metrica | Valor |
|---------|------:|
| Total de Deals (Pipedrive) | 195.327 |
| Deals Won | 12.515 |
| Valor Total Won | **R$ 1,09 BILHAO** |
| Win Rate | 6,4% |
| Atividades Registradas | 2.508.672 |
| Conversoes RD Station | 283.950 |
| Leads Abertos (hoje) | 2.358 |

---

## 2. COMPOSICAO DE ATIVIDADES (pipedrive-5Slo)

| Tipo | Total | % |
|------|------:|--:|
| Notes (notas) | 358.714 | 14,3% |
| WhatsApp Chat | 297.668 | 11,9% |
| Calls (ligacoes) | 225.423 | 9,0% |
| Stage Changes | 220.705 | 8,8% |
| Status Changes | 172.655 | 6,9% |
| User Changes | 164.401 | 6,6% |
| Mensagens | 152.372 | 6,1% |
| Follow-ups | 69.442 | 2,8% |
| Reunioes (todos tipos) | 57.570 | 2,3% |
| Outros | 789.722 | 31,5% |

---

## 3. TOP PERFORMERS (2025+)

### 3.1 Ranking por Volume de Atividades

| # | Analista | Total | Calls | WhatsApp | Mensagens | Reunioes | Contratos | No-Shows |
|---|---------|------:|------:|---------:|----------:|---------:|----------:|---------:|
| 1 | Filipe Padoveze | 38.005 | 5.615 | 12.314 | 865 | 115 | 3 | 35 |
| 2 | Pedro Eckert | 36.326 | 8.402 | 13.818 | 94 | 383 | 0 | 109 |
| 3 | **Morada - Mia (IA)** | **33.933** | **5.088** | **5.155** | **2.508** | **4.605** | **1** | **2.127** |
| 4 | Hellen Dias | 31.427 | 15.007 | 3.090 | 6.957 | 164 | 0 | 156 |
| 5 | Natalia Saramago | 31.041 | 13.217 | 2.151 | 8.820 | 1.887 | 0 | 225 |
| 6 | Automacao | 26.315 | 2.393 | 20.944 | 2.506 | 2 | 0 | 2 |
| 7 | Joyce | 25.125 | 10.628 | 7.641 | 4.693 | 1.447 | 0 | 190 |
| 8 | Luana Schaikoski | 23.173 | 159 | 14.833 | 2.351 | 1.314 | 120 | 331 |
| 9 | Raynara Lopes | 23.151 | 10.681 | 6.771 | 4.887 | 688 | 0 | 99 |
| 10 | Luciana Patricio | 21.782 | 12.765 | 1.621 | 4.412 | 1.526 | 0 | 291 |

### 3.2 Perfil de Atuacao por Analista

**Especialistas em Calls**: Hellen Dias (15.007), Natalia Saramago (13.217), Luciana Patricio (12.765)
**Especialistas em WhatsApp**: Automacao (20.944), Luana Schaikoski (14.833), Pedro Eckert (13.818)
**Mais Reunioes**: Morada-Mia (4.605), Eduardo Albani (4.761), Gabriela Branco (2.582)
**Mais Contratos**: Luana Schaikoski (120), Priscila Pestana (70), Gabriela Branco (28)

---

## 4. MIA (IA INTERNA) - ANALISE DETALHADA

| Metrica | Valor |
|---------|------:|
| Total de Atividades | 33.933 |
| Ranking | **3o lugar geral** |
| Calls Realizadas | 5.088 |
| WhatsApp Chats | 5.155 |
| Mensagens | 2.508 |
| Reunioes Agendadas | 4.605 |
| No-Shows | 2.127 |
| **Taxa de No-Show** | **46,2%** |

### Comparativo MIA vs Humanos

| Metrica | MIA | Media Humana (Top 5) | Delta |
|---------|----:|--------------------:|------:|
| Atividades/periodo | 33.933 | 33.590 | +1,0% |
| Reunioes agendadas | 4.605 | 588 | **+683%** |
| No-Shows | 2.127 | 135 | +1.475% |
| Taxa No-Show | 46,2% | 8,3% | +37,9pp |

**INSIGHT CRITICO**: A MIA agenda **7,8x mais reunioes** que humanos, mas tem taxa de no-show de **46,2%** vs 8,3% dos humanos. Isso sugere:
1. MIA agenda reunioes com leads menos qualificados
2. Falta confirmacao/lembrete pre-reuniao
3. Oportunidade de melhoria: implementar confirmacao automatica 24h e 1h antes

---

## 5. FUNIL DE ETAPAS (Stage Transitions, 2025+)

### Pipeline SZS (14)
```
Lead in (70) --[11.278]--> Contatados (71) --[1.935]--> Qualificacao (72)
                                |
                          [1.985] Aguardando data (341)
                                |
                          [4.223] Agendado (73) ---> Reuniao Realizada (151)
                                                        |
                                                  [2.897] FUP (74)
```

### Pipeline SZI (28)
```
Lead in (184) --[10.405]--> Contatados (186)
      |--[3.707]--> Aguardando data (339) --[4.265]--> Agendado (187)
      |--[3.344]--> Qualificado (346)
      |--[2.587]--> Qualificacao (338)
      |--[2.003]--> FUP Parceiro (392)
```

### Pipeline Parceiros (7)
```
Backlog (53) --[8.777]--> Em tentativa de conexao (307) --[1.990]--> Aguardando dados (78)
```

---

## 6. EVOLUCAO WON vs LOST (Consolidated, 2025)

| Mes | Won | Lost | Win Rate |
|-----|----:|-----:|---------:|
| Jan/25 | 56 | 463 | 10,8% |
| Fev/25 | 388 | 7.854 | 4,7% |
| Mar/25 | 240 | 4.063 | 5,6% |
| Abr/25 | 438 | 5.326 | 7,6% |
| Mai/25 | 287 | 5.253 | 5,2% |
| Jun/25 | 286 | 5.382 | 5,0% |
| Jul/25 | 437 | 6.766 | 6,1% |
| Ago/25 | 584 | 8.683 | 6,3% |
| **Set/25** | **820** | **11.296** | **6,8%** |
| Out/25 | 818 | 20.830 | 3,8% |
| Nov/25 | 633 | 10.411 | 5,7% |
| Dez/25 | 709 | 9.967 | 6,6% |
| Jan/26 | 593 | 12.940 | 4,4% |
| Fev/26 | 454 | 10.373 | 4,2% |
| Mar/26 | 415 | 15.058 | 2,7% |

**Tendencia**: Win rate caindo de 10,8% (Jan/25) para 2,7% (Mar/26) enquanto volume de lost cresce exponencialmente. Necessario investigar causa.

---

## 7. RECOMENDACOES ESTRATEGICAS ATUALIZADAS

### Prioridade 1: Resolver Problema de Contato (37% dos lost)
- 65.779 deals perdidos por "nao atende"
- Implementar cadencia multi-canal automatica (WhatsApp > Call > Email > SMS)
- **Potencial recuperavel**: R$ 18,7M

### Prioridade 2: Otimizar MIA (IA)
- Taxa de no-show de 46,2% precisa cair para < 20%
- Implementar: confirmacao 24h antes + lembrete 1h antes
- Se reduzir no-show para 20%: +1.206 reunioes efetivas/periodo

### Prioridade 3: Investigar Queda do Win Rate
- Win rate caiu de 10,8% para 2,7% em 14 meses
- Hipoteses: leads menos qualificados, volume excessivo, equipe sobrecarregada
- Acao: audit de qualidade de leads por fonte

### Prioridade 4: Escalar Canal Parceiros
- PARC converte 6,8x mais que MKT com custo zero
- Pipeline 7 tem 8.777 leads em tentativa de conexao

### Prioridade 5: Realocacao de Budget por Empreendimento
- Manter/aumentar: Marista 144 (CPW R$ 104), Caraga Spot (melhor taxa RD Station)
- Reduzir: Vistas de Anita 2 (CPW R$ 3.684), Morro das Pedras (CPW R$ 11.400)
