-- =============================================
-- FUNIL DE VENDAS POR CANAL (MKT vs PARC)
-- Fonte: dataset_szi (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

SELECT
    canal,
    ROUND(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0) as total_leads,
    ROUND(SUM(TRY_CAST(REPLACE(mql, ',', '.') AS DOUBLE)), 0) as total_mql,
    ROUND(SUM(TRY_CAST(REPLACE(sql, ',', '.') AS DOUBLE)), 0) as total_sql,
    ROUND(SUM(TRY_CAST(REPLACE(opp, ',', '.') AS DOUBLE)), 0) as total_opp,
    ROUND(SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)), 0) as total_won,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)), 0) as total_investimento,
    -- Taxas de conversao
    ROUND(100.0 * SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0), 2) as tx_lead_won_pct,
    -- CPL e CPW
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0), 2) as cpl,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)), 0), 2) as cpw
FROM "nekt_trusted"."dataset_szi"
GROUP BY canal
ORDER BY total_leads DESC;
