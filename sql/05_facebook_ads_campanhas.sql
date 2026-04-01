-- =============================================
-- CAMPANHAS FACEBOOK ADS (SZI) - PERFORMANCE
-- Fonte: facebook_ads_szi_adsinsights (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

SELECT
    campaign_name,
    SUM(CAST(impressions AS BIGINT)) as total_impressions,
    SUM(CAST(clicks AS BIGINT)) as total_clicks,
    SUM(CAST(reach AS BIGINT)) as total_reach,
    ROUND(SUM(CAST(spend AS DOUBLE)), 2) as total_spend_brl,
    ROUND(AVG(CAST(cpc AS DOUBLE)), 2) as avg_cpc_brl,
    ROUND(AVG(CAST(ctr AS DOUBLE)), 2) as avg_ctr_pct,
    ROUND(AVG(CAST(cpm AS DOUBLE)), 2) as avg_cpm_brl,
    MIN(date_start) as first_date,
    MAX(date_stop) as last_date,
    -- Metricas derivadas
    ROUND(SUM(CAST(spend AS DOUBLE)) / NULLIF(SUM(CAST(clicks AS BIGINT)), 0), 2) as cost_per_click,
    ROUND(1000.0 * SUM(CAST(spend AS DOUBLE)) / NULLIF(SUM(CAST(impressions AS BIGINT)), 0), 2) as cpm_calc
FROM "nekt_trusted"."facebook_ads_szi_adsinsights"
GROUP BY campaign_name
ORDER BY total_spend_brl DESC
LIMIT 30;
