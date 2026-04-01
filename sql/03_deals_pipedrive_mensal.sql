-- =============================================
-- DEALS WON E LOST POR MES (PIPEDRIVE)
-- Fonte: pipedrive_v2_deal_flow (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

-- Deals Won por mes
SELECT
    DATE_FORMAT(log_time, '%Y-%m') as mes,
    COUNT(DISTINCT item_id) as deals_won
FROM "nekt_trusted"."pipedrive_v2_deal_flow"
WHERE field_key = 'status'
    AND new_value = 'won'
    AND log_time >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(log_time, '%Y-%m')
ORDER BY mes;

-- Deals Lost por mes
SELECT
    DATE_FORMAT(log_time, '%Y-%m') as mes,
    COUNT(DISTINCT item_id) as deals_lost
FROM "nekt_trusted"."pipedrive_v2_deal_flow"
WHERE field_key = 'status'
    AND new_value = 'lost'
    AND log_time >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(log_time, '%Y-%m')
ORDER BY mes;
