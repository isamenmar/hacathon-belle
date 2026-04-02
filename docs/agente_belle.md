# Agente Belle — Documentação Completa

## Versão Atual: 5.0

## Visão Geral
Belle é a assistente virtual sênior de vendas e marketing da Seazone Saleszone. Opera como chat flutuante no dashboard, com capacidade preditiva, contexto de página e explicação de termos.

## Capacidades

### 1. Explicação de Termos (24 termos)
Lead, MQL, SQL, OPP, Deal, Won, Lost, Pipeline, Follow-up, No-Show, Squad, Empreendimento, MIA, CPL, CMQL, CSQL, COPP, CPW, CPC, CTR, Win Rate, Ticket Médio, CAC, ROI

### 2. Explicação de Interface
- Cards: o que cada número significa, período, como ler badges
- Gráficos: eixos, cores, tendências, insights
- Tabelas: colunas, ordenação, padrões
- Funil: explicação didática das 5 etapas

### 3. Contexto de Página
Detecta automaticamente em qual página o usuário está (8 tipos mapeados) e adapta respostas para perguntas vagas.

### 4. Análise com Transparência
Para cada resposta informa: origem do dado, cálculo usado, período considerado, responsável.

### 5. Previsões Reais (v3.0)
- Leads, oportunidades, vendas, perdas, receita
- Método: regressão exponencial sobre séries temporais (9 meses)
- 3 cenários: otimista, realista, pessimista
- Nível de confiança: alta/média/baixa
- Simulações: "Se aumentar leads em 20%?"

### 6. Detecção de Intenção Futura
Palavras como "próximo", "previsão", "se continuarmos" são detectadas ANTES de qualquer handler descritivo. Garante que perguntas preditivas NUNCA retornam dados passados.

### 7. Análise de Metas
- Probabilidade de atingir meta
- Ritmo necessário vs atual
- Gap em deals/mês
- Ações para corrigir

### 8. Squads e Responsáveis
- "Quem cuida do Marista 144?" → squad + membros
- "Como está o Squad 1?" → métricas + alertas

## Regras de Resposta
1. SEMPRE informar origem do dado
2. SEMPRE informar período
3. NUNCA inventar dados
4. Se não souber: informar e sugerir onde encontrar
5. Perguntas de futuro → OBRIGATORIAMENTE projeção
6. Linguagem profissional com acentuação correta

## Implementação
- Componente: BelleChat.tsx (client component)
- Detecção: usePathname() para contexto de página
- Dados: importados de @/data (17+ exports)
- Projeções: função projetar() com séries temporais
- Interface: chat flutuante 400x560px, botão coral 56px

## Histórico de Versões
- v1.0 (2026-04-01): Chat básico com definições e pipeline
- v1.1 (2026-04-02): Adicionado squads e vendas
- v2.0 (2026-04-02): Analista sênior com transparência
- v3.0 (2026-04-02): Previsão real com tendência
- v4.0 (2026-04-02): Contexto de página + explicação de UI
- v5.0 (2026-04-02): Detecção de intenção futura + glossário completo + leads (não RD Station)
