-- =============================================
-- PERFORMANCE DE ANALISTAS - MEETIME SZS
-- Fonte: meetime_szs_calls (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

SELECT
    user_name,
    COUNT(*) as total_calls,
    SUM(CASE WHEN status = 'CONNECTED' THEN 1 ELSE 0 END) as calls_connected,
    ROUND(AVG(CASE WHEN status = 'CONNECTED' AND connected_duration_seconds > 0
        THEN CAST(connected_duration_seconds AS DOUBLE) END), 0) as avg_duration_sec,
    SUM(CASE WHEN output = 'MEANINGFUL' THEN 1 ELSE 0 END) as meaningful_calls,
    SUM(CASE WHEN output = 'NOT_MEANINGFUL' THEN 1 ELSE 0 END) as not_meaningful,
    SUM(CASE WHEN output = 'NO_CONTACT' THEN 1 ELSE 0 END) as no_contact,
    SUM(CASE WHEN output = 'CLIENT_BUSY' THEN 1 ELSE 0 END) as client_busy,
    ROUND(100.0 * SUM(CASE WHEN status = 'CONNECTED' THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as connect_rate_pct,
    ROUND(100.0 * SUM(CASE WHEN output = 'MEANINGFUL' THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as meaningful_rate_pct
FROM "nekt_trusted"."meetime_szs_calls"
WHERE date >= TIMESTAMP '2024-01-01'
GROUP BY user_name
ORDER BY total_calls DESC;
