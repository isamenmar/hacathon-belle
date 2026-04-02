# Pipeline Health Score

## Definicao
Score de 0-100 que representa a saude e eficiencia do funil comercial.

## Calculo

O score e calculado com base em 3 fatores:

### 1. Taxa de Conversao (peso 33%)
- Lead-to-Won rate * 10
- Quanto maior a conversao, maior o score

### 2. Custo por Venda - CPW (peso 33%)
- CPW = 0 (sem investimento): 70 pontos
- CPW < R$ 500: 90 pontos (excelente)
- CPW R$ 500-1.500: 60 pontos (bom)
- CPW R$ 1.500-4.000: 30 pontos (regular)
- CPW > R$ 4.000: 10 pontos (critico)

### 3. Volume de Vendas (peso 33%)
- Won >= 50: 90 pontos
- Won 20-49: 70 pontos
- Won 10-19: 50 pontos
- Won < 10: 30 pontos

### Formula Final
Score = (ConversaoScore + CPWScore + VolumeScore) / 3

## Classificacao

| Score | Label | Indicador |
|-------|-------|-----------|
| 60-100 | Bom | Verde |
| 40-59 | Medio | Amarelo |
| 0-39 | Critico | Vermelho |

## Score por Squad
Calculado como media dos scores dos empreendimentos do squad.

## Ocupacao do Squad
- Leads atribuidos / Capacidade estimada * 100
- Saudavel: <= 70%
- Atencao: 71-90%
- Sobrecarregado: > 90%

## Historico de Alteracoes
- 2026-04-02: Definicao inicial do score
