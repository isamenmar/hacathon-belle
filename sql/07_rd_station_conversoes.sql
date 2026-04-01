-- =============================================
-- RD STATION: CONVERSOES E FUNIL DE MARKETING
-- Fonte: rd_station_contact_events (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- Registros: 283.950 eventos
-- =============================================

-- 1. Conversoes por mes
SELECT
    DATE_FORMAT(event_timestamp, '%Y-%m') as mes,
    event_type,
    COUNT(*) as total_eventos,
    COUNT(DISTINCT contact_uuid) as contatos_unicos
FROM "nekt_trusted"."rd_station_contact_events"
WHERE event_timestamp >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(event_timestamp, '%Y-%m'), event_type
ORDER BY mes, total_eventos DESC;

-- 2. Conversoes por empreendimento
SELECT
    payload.cf_empreendimento as empreendimento,
    COUNT(*) as total_conversoes,
    COUNT(DISTINCT contact_uuid) as contatos_unicos
FROM "nekt_trusted"."rd_station_contact_events"
WHERE event_type = 'CONVERSION'
    AND payload.cf_empreendimento IS NOT NULL
    AND payload.cf_empreendimento != ''
GROUP BY payload.cf_empreendimento
ORDER BY total_conversoes DESC;

-- 3. Conversoes por fonte de trafego
SELECT
    payload.traffic_source as source,
    payload.traffic_medium as medium,
    COUNT(*) as total_conversoes,
    COUNT(DISTINCT contact_uuid) as contatos_unicos
FROM "nekt_trusted"."rd_station_contact_events"
WHERE event_type = 'CONVERSION'
    AND event_timestamp >= TIMESTAMP '2024-01-01'
GROUP BY payload.traffic_source, payload.traffic_medium
ORDER BY total_conversoes DESC;

-- 4. Conversoes por criativo (top criativos)
SELECT
    payload.cf_empreendimento as empreendimento,
    payload.cf_utm_criativo as criativo,
    COUNT(*) as total_conversoes,
    COUNT(DISTINCT contact_uuid) as contatos_unicos
FROM "nekt_trusted"."rd_station_contact_events"
WHERE event_type = 'CONVERSION'
    AND payload.cf_empreendimento IS NOT NULL
    AND payload.cf_utm_criativo IS NOT NULL
    AND payload.cf_utm_criativo != ''
    AND event_timestamp >= TIMESTAMP '2025-01-01'
GROUP BY payload.cf_empreendimento, payload.cf_utm_criativo
ORDER BY total_conversoes DESC
LIMIT 30;

-- 5. Conversoes por vertical (SZS, SZI, Marketplace)
SELECT
    DATE_FORMAT(event_timestamp, '%Y-%m') as mes,
    CASE
        WHEN event_identifier LIKE 'SZS%' OR event_identifier LIKE '%SZS%' THEN 'SZS'
        WHEN event_identifier LIKE 'SZI%' OR event_identifier LIKE '%SZI%' THEN 'SZI'
        WHEN event_identifier LIKE 'marketplace%' THEN 'Marketplace'
        WHEN event_identifier LIKE 'merlin%' OR event_identifier LIKE 'szs-merlin%' THEN 'SZS (Merlin)'
        WHEN event_identifier LIKE 'site-%' OR event_identifier LIKE '/institucional%' THEN 'Site'
        ELSE 'Outros'
    END as vertical,
    COUNT(*) as total_conversoes,
    COUNT(DISTINCT contact_uuid) as contatos_unicos
FROM "nekt_trusted"."rd_station_contact_events"
WHERE event_type = 'CONVERSION'
    AND event_timestamp >= TIMESTAMP '2025-01-01'
GROUP BY 1, 2
ORDER BY mes, total_conversoes DESC;
