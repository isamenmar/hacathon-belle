-- =============================================
-- PIPEDRIVE CONSOLIDATED DEAL FLOW (pipedrive-5Slo)
-- Fonte: pipedrive_v2_consolidated_deal_flow (nekt_trusted)
-- Source: pipedrive-5Slo
-- Registros: 2.508.672
-- Autor: Belle (Agente IA)
-- Data: 2026-04-01
-- =============================================

-- 1. Atividades por owner (2025+)
SELECT
    owner_name,
    COUNT(*) as total_atividades,
    SUM(CASE WHEN type = 'call' THEN 1 ELSE 0 END) as calls,
    SUM(CASE WHEN type = 'whatsapp_chat' THEN 1 ELSE 0 END) as whatsapp,
    SUM(CASE WHEN type = 'mensagem' THEN 1 ELSE 0 END) as mensagens,
    SUM(CASE WHEN type IN ('reuniao','reuniao_avaliacao','reuniao_apresentacao_contr') THEN 1 ELSE 0 END) as reunioes,
    SUM(CASE WHEN type = 'contrato' THEN 1 ELSE 0 END) as contratos,
    SUM(CASE WHEN type = 'no_show' THEN 1 ELSE 0 END) as no_shows
FROM "nekt_trusted"."pipedrive_v2_consolidated_deal_flow"
WHERE type IS NOT NULL AND type != ''
    AND add_time >= TIMESTAMP '2025-01-01'
    AND owner_name IS NOT NULL AND owner_name != ''
GROUP BY owner_name
ORDER BY total_atividades DESC;

-- 2. Status changes por mes (won/lost/open)
SELECT
    DATE_FORMAT(log_time, '%Y-%m') as mes,
    new_value as status,
    COUNT(DISTINCT item_id) as total_deals
FROM "nekt_trusted"."pipedrive_v2_consolidated_deal_flow"
WHERE field_key = 'status'
    AND new_value IN ('won', 'lost', 'open')
    AND log_time >= TIMESTAMP '2024-01-01'
GROUP BY DATE_FORMAT(log_time, '%Y-%m'), new_value
ORDER BY mes, total_deals DESC;

-- 3. Stage transitions (funil de etapas)
SELECT
    s_from.name as stage_from,
    s_to.name as stage_to,
    s_from.pipeline_id,
    COUNT(*) as total_transicoes
FROM "nekt_trusted"."pipedrive_v2_consolidated_deal_flow" df
JOIN "nekt_trusted"."pipedrive_v2_stages" s_from ON CAST(df.old_value AS BIGINT) = s_from.id
JOIN "nekt_trusted"."pipedrive_v2_stages" s_to ON CAST(df.new_value AS BIGINT) = s_to.id
WHERE df.field_key = 'stage_id'
    AND df.log_time >= TIMESTAMP '2025-01-01'
GROUP BY s_from.name, s_to.name, s_from.pipeline_id
ORDER BY total_transicoes DESC
LIMIT 30;

-- 4. MIA (IA interna) performance
SELECT
    DATE_FORMAT(add_time, '%Y-%m') as mes,
    type,
    COUNT(*) as total,
    SUM(CASE WHEN done = true THEN 1 ELSE 0 END) as done
FROM "nekt_trusted"."pipedrive_v2_consolidated_deal_flow"
WHERE owner_name = 'Morada - Mia'
    AND type IS NOT NULL AND type != ''
    AND add_time >= TIMESTAMP '2025-01-01'
GROUP BY DATE_FORMAT(add_time, '%Y-%m'), type
ORDER BY mes, total DESC;
