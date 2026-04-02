# Previsões — Capacidade Preditiva da Belle

## Visão Geral
A Belle realiza projeções futuras baseadas em séries temporais reais (9 meses de dados).

## Tipos de Previsão

### Leads
- Projeção mensal/trimestral de leads gerados
- Base: série temporal leadsRD (Jul/25 - Mar/26)
- Método: regressão exponencial com tendência dos últimos 3 meses

### Vendas (Won)
- Projeção de deals fechados por mês
- Base: série temporal won (Jul/25 - Mar/26)
- Inclui projeção de receita (deals × ticket médio)

### Oportunidades
- Baseado em: leads projetados × taxa histórica Lead→OPP (6,19%)
- Confiança: média (depende de manutenção da taxa)

### Perdas (Lost)
- Projeção de deals perdidos
- Cenários invertidos (otimista = menos perdas)

### Receita
- Projeção de faturamento mensal
- Base: série temporal receita (Jul/25 - Mar/26)
- Alerta: ticket médio em queda (R$ 87K → R$ 53K)

### Metas
- Probabilidade de atingir meta anual
- Ritmo necessário vs ritmo atual
- Gap em deals/mês

## Método de Cálculo
```
projetar(serie, mesesFuturo):
  1. Pega últimos 3 meses da série
  2. Calcula tendência média (variação mês a mês)
  3. Projeta N meses à frente
  4. Gera 3 cenários:
     - Otimista: tendência + 10%
     - Realista: tendência mantida
     - Pessimista: tendência - 10%
  5. Aplica piso mínimo (evita projeções negativas)
```

## Cenários
Toda previsão gera obrigatoriamente:
- Cenário otimista (premissa: ações corretivas implementadas)
- Cenário realista (premissa: nada muda)
- Cenário pessimista (premissa: tendência piora)

## Nível de Confiança
- ALTA: 12+ meses de dados estáveis
- MÉDIA: 3-12 meses de dados (atual)
- BAIXA: < 3 meses ou alta volatilidade

## Simulações
A Belle responde perguntas como:
- "Se aumentar leads em 20%?" → calcula impacto
- "Se melhorar conversão MQL→SQL?" → receita adicional
- "Se redistribuir budget?" → vendas adicionais

## Limitações
- Sazonalidade não modelada (dados insuficientes)
- Premissa: taxas históricas se mantêm
- Não considera fatores externos (economia, concorrência)

## Histórico
- 2026-04-02: v1.0 - Previsão com cenários estáticos
- 2026-04-02: v2.0 - Regressão exponencial com tendência real
- 2026-04-02: v3.0 - Detecção de intenção futura como primeiro check
