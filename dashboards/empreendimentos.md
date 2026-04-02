# Dashboard de Empreendimentos

## Pagina: /empreendimentos/[slug]

### Fontes de Dados (multi-fonte com fallback)
1. funnelByEmpreendimento: funil completo historico (15 empreendimentos)
2. allEmpreendimentos2026: conversoes RD Station 2026 (25 empreendimentos)
3. squads: dados dos squads comerciais (11 empreendimentos)
4. facebookCampaigns2026: campanhas FB (12 campanhas)
5. rdTop2026: top conversoes RD (12 empreendimentos)

### Logica de Fallback
Se empreendimento nao esta em funnelByEmpreendimento:
- Mostra aviso "Dados parciais (2026)"
- Busca em allEmpreendimentos2026, squads, rdTop2026, facebookCampaigns2026
- Exibe o que estiver disponivel

### 25 Empreendimentos Ativos (2026)
Ponta das Canas (5.011), Natal (4.842), Barra Grande (4.430), Jurere III (2.404), Jurere II (1.935), Foz (1.525), Vistas Anita II (1.362), Rosa Sul (1.323), Cachoeira Beach (1.248), Meireles (1.082), Ilha Campeche II (924), Ingleses (565), Itacare (330), NC2 (324), Santinho (168), Bonito II (94), Caragua (80), Bonito (80), Urubici II (35), Marista 144 (24), Batel (17), Santo Antonio (15), Japaratinga (15), Salvador (10), Morro das Pedras (10)

## Historico
- 2026-04-02: Fallback multi-fonte implementado
