-- =============================================
-- PIPEDRIVE V2 DEALS: ANALISE COMPLETA
-- Fonte: pipedrive_v2_deals (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- Total: 195.327 deals
-- =============================================

-- 1. Overview por status
SELECT
    status,
    COUNT(*) as total_deals,
    ROUND(AVG(CAST(value AS DOUBLE)), 2) as avg_deal_value,
    ROUND(SUM(CAST(value AS DOUBLE)), 2) as total_value
FROM "nekt_trusted"."pipedrive_v2_deals"
GROUP BY status;

-- 2. Won por mes com valor
SELECT
    DATE_FORMAT(won_time, '%Y-%m') as mes,
    COUNT(*) as deals_won,
    ROUND(SUM(CAST(value AS DOUBLE)), 2) as valor_total,
    ROUND(AVG(CAST(value AS DOUBLE)), 2) as ticket_medio
FROM "nekt_trusted"."pipedrive_v2_deals"
WHERE status = 'won' AND won_time >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(won_time, '%Y-%m')
ORDER BY mes;

-- 3. Top motivos de perda
SELECT
    lost_reason,
    COUNT(*) as total,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as pct
FROM "nekt_trusted"."pipedrive_v2_deals"
WHERE status = 'lost'
    AND lost_reason IS NOT NULL AND lost_reason != ''
GROUP BY lost_reason
ORDER BY total DESC
LIMIT 20;

-- 4. Top vendedores por deals won (com nome)
SELECT
    u.name as vendedor,
    COUNT(*) as deals_won,
    ROUND(SUM(CAST(d.value AS DOUBLE)), 0) as valor_total,
    ROUND(AVG(CAST(d.value AS DOUBLE)), 0) as ticket_medio
FROM "nekt_trusted"."pipedrive_v2_deals" d
JOIN "nekt_trusted"."pipedrive_v2_users" u ON d.owner_id = u.id
WHERE d.status = 'won' AND d.won_time >= TIMESTAMP '2024-01-01'
GROUP BY u.name
ORDER BY deals_won DESC
LIMIT 20;

-- 5. Deals por pipeline
SELECT
    pipeline_id, status,
    COUNT(*) as total,
    ROUND(SUM(CAST(value AS DOUBLE)), 0) as valor_total
FROM "nekt_trusted"."pipedrive_v2_deals"
GROUP BY pipeline_id, status
ORDER BY pipeline_id, total DESC;
