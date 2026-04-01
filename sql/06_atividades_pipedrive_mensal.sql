-- =============================================
-- ATIVIDADES PIPEDRIVE POR TIPO E MES
-- Fonte: pipedrive_v2_deal_flow (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

SELECT
    DATE_FORMAT(add_time, '%Y-%m') as mes,
    type as tipo_atividade,
    COUNT(*) as total,
    SUM(CASE WHEN done = true THEN 1 ELSE 0 END) as realizadas,
    ROUND(100.0 * SUM(CASE WHEN done = true THEN 1 ELSE 0 END) / COUNT(*), 1) as taxa_conclusao
FROM "nekt_trusted"."pipedrive_v2_deal_flow"
WHERE type IS NOT NULL
    AND type != ''
    AND add_time >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(add_time, '%Y-%m'), type
ORDER BY mes, total DESC;
