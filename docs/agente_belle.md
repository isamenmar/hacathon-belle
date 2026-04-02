# Agente Belle - Documentacao

## Visao Geral
Belle e a assistente virtual de vendas e marketing da Seazone. Opera como chat flutuante no dashboard.

## Capacidades

### Definicoes
Responde sobre: CPL, MQL, SQL, OPP, CPW, CMQL, COPP, CSQL, CPC, CTR, Win Rate, No-Show, Ticket Medio

### Fontes de Dados
Explica origem de cada dado: Pipedrive, RD Station, Meetime, Facebook Ads, NEKT

### Analises
- Gargalos do funil
- Motivos de perda (37% "nao atende")
- Performance de campanhas
- Comparacao entre squads
- Ranking de empreendimentos
- Previsoes/forecast

### Topicos Disponiveis
- Pipeline e visao geral
- Squads ("Qual squad esta pior?")
- Vendas ("Como estao as vendas?")
- Campanhas Facebook Ads
- Setores (SZI, SZS, Parceiros)
- Empreendimentos (melhor/pior CPW)
- MIA (IA interna)
- Previsoes e tendencias
- Motivos de perda

## Implementacao
- Componente: BelleChat.tsx
- Logica: keyword matching com generateResponse()
- Dados: importados de @/data (todas as fontes)
- Interface: chat flutuante com botao coral (#F06B5D)

## Versao Atual: 1.3
- v1.0: Chat basico com definicoes e pipeline
- v1.1: Adicionado squads e vendas
- v1.2: Avatar SVG + topicos expandidos
- v1.3: Dados 2026 atualizados

## Historico de Alteracoes
- 2026-04-02: Criacao inicial + squads + vendas + avatar
