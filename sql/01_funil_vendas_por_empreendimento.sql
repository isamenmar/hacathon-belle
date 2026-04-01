-- =============================================
-- FUNIL DE VENDAS POR EMPREENDIMENTO
-- Fonte: dataset_szi (nekt_trusted)
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

-- Funil consolidado por empreendimento
SELECT
    empreendimento,
    ROUND(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0) as total_leads,
    ROUND(SUM(TRY_CAST(REPLACE(mql, ',', '.') AS DOUBLE)), 0) as total_mql,
    ROUND(SUM(TRY_CAST(REPLACE(sql, ',', '.') AS DOUBLE)), 0) as total_sql,
    ROUND(SUM(TRY_CAST(REPLACE(opp, ',', '.') AS DOUBLE)), 0) as total_opp,
    ROUND(SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)), 0) as total_won,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)), 0) as total_investimento,
    -- Taxas de conversao
    ROUND(100.0 * SUM(TRY_CAST(REPLACE(mql, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0), 1) as tx_lead_mql,
    ROUND(100.0 * SUM(TRY_CAST(REPLACE(sql, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(mql, ',', '.') AS DOUBLE)), 0), 1) as tx_mql_sql,
    ROUND(100.0 * SUM(TRY_CAST(REPLACE(opp, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(sql, ',', '.') AS DOUBLE)), 0), 1) as tx_sql_opp,
    ROUND(100.0 * SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(opp, ',', '.') AS DOUBLE)), 0), 1) as tx_opp_won,
    -- Metricas de custo
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(lead, ',', '.') AS DOUBLE)), 0), 2) as cpl,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(mql, ',', '.') AS DOUBLE)), 0), 2) as cmql,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(opp, ',', '.') AS DOUBLE)), 0), 2) as copp,
    ROUND(SUM(TRY_CAST(REPLACE(investimento, ',', '.') AS DOUBLE)) / NULLIF(SUM(TRY_CAST(REPLACE(won, ',', '.') AS DOUBLE)), 0), 2) as cpw
FROM "nekt_trusted"."dataset_szi"
GROUP BY empreendimento
ORDER BY total_leads DESC;
