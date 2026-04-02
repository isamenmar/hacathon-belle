"use client";
import { useState } from "react";
import KpiCard from "@/components/KpiCard";
import ChartWrapper from "@/components/ChartWrapper";
import { vendas2026, topSellers2026, squads, formatCurrency, formatNumber, CHART_COLORS } from "@/data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell
} from "recharts";

const ts = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 };

const totalValor = vendas2026.reduce((s, v) => s + v.valor, 0);
const totalDeals = vendas2026.length;
const ticketMedio = totalDeals > 0 ? Math.round(totalValor / totalDeals) : 0;

// Agrupar por empreendimento
const byEmp = Object.entries(
  vendas2026.reduce((acc, v) => {
    acc[v.empreendimento] = (acc[v.empreendimento] || 0) + v.valor;
    return acc;
  }, {} as Record<string, number>)
).map(([nome, valor]) => ({ nome, valor })).sort((a, b) => b.valor - a.valor);

// Agrupar por vendedor
const byVendedor = Object.entries(
  vendas2026.reduce((acc, v) => {
    if (!acc[v.vendedor]) acc[v.vendedor] = { valor: 0, deals: 0 };
    acc[v.vendedor].valor += v.valor;
    acc[v.vendedor].deals += 1;
    return acc;
  }, {} as Record<string, { valor: number; deals: number }>)
).map(([nome, d]) => ({ nome, ...d, ticket: d.deals > 0 ? Math.round(d.valor / d.deals) : 0 })).sort((a, b) => b.valor - a.valor);

// Agrupar por mês
const byMes = Object.entries(
  vendas2026.reduce((acc, v) => {
    if (!acc[v.mes]) acc[v.mes] = { valor: 0, deals: 0 };
    acc[v.mes].valor += v.valor;
    acc[v.mes].deals += 1;
    return acc;
  }, {} as Record<string, { valor: number; deals: number }>)
).map(([mes, d]) => ({ mes, ...d })).sort((a, b) => a.mes.localeCompare(b.mes));

// Agrupar por squad
const bySquad = Object.entries(
  vendas2026.reduce((acc, v) => {
    const sq = v.squad || "Sem squad";
    if (!acc[sq]) acc[sq] = { valor: 0, deals: 0 };
    acc[sq].valor += v.valor;
    acc[sq].deals += 1;
    return acc;
  }, {} as Record<string, { valor: number; deals: number }>)
).map(([squad, d]) => ({ squad, ...d }));

type FilterKey = "todos" | "squad-1" | "squad-2";

export default function VendasPage() {
  const [filter, setFilter] = useState<FilterKey>("todos");

  const filtered = filter === "todos" ? vendas2026 :
    filter === "squad-1" ? vendas2026.filter(v => v.squad === "Squad 1") :
    vendas2026.filter(v => v.squad === "Squad 2");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1B2D]">Vendas</h1>
          <p className="text-sm text-gray-500 mt-1">Performance comercial | Jan-Mar 2026</p>
        </div>
        <div className="flex gap-2">
          {(["todos", "squad-1", "squad-2"] as FilterKey[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filter === f ? "bg-[#F06B5D] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f === "todos" ? "Todos" : f === "squad-1" ? "Squad 1" : "Squad 2"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Valor Total Vendido" value={formatCurrency(totalValor)} highlight />
        <KpiCard label="Nº de Vendas" value={String(totalDeals)} />
        <KpiCard label="Ticket Médio" value={formatCurrency(ticketMedio)} />
        <KpiCard label="Vendedores Ativos" value={String(byVendedor.length)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Vendas por Empreendimento" subtitle="Valor total (R$)">
          <ResponsiveContainer>
            <BarChart data={byEmp.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="nome" type="category" tick={{ fill: "#6b7280", fontSize: 9 }} width={140} />
              <Tooltip contentStyle={ts} formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="valor" fill="#F06B5D" radius={[0, 4, 4, 0]} name="Valor (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Evolução Mensal" subtitle="Valor e deals por mês">
          <ResponsiveContainer>
            <BarChart data={byMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip contentStyle={ts} formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="valor" fill="#0F1B2D" name="Valor (R$)" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartWrapper title="Vendas por Vendedor" subtitle="Valor total (R$)">
          <ResponsiveContainer>
            <BarChart data={byVendedor.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis dataKey="nome" type="category" tick={{ fill: "#6b7280", fontSize: 9 }} width={130} />
              <Tooltip contentStyle={ts} formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="valor" fill="#F06B5D" radius={[0, 4, 4, 0]} name="Valor (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Vendas por Squad" subtitle="Distribuição de valor">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={bySquad} dataKey="valor" nameKey="squad" cx="50%" cy="50%" outerRadius={90}
                label={({ name, value }) => `${name}: ${formatCurrency(Number(value))}`}>
                {bySquad.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={ts} formatter={(v) => formatCurrency(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Tabela detalhada */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">
          Detalhamento de Vendas {filter !== "todos" ? `(${filter === "squad-1" ? "Squad 1" : "Squad 2"})` : "(Todas)"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">Empreendimento</th>
                <th className="text-left py-2 px-3">Vendedor</th>
                <th className="text-left py-2 px-3">Squad</th>
                <th className="text-right py-2 px-3">Valor</th>
                <th className="text-center py-2 px-3">Mês</th>
                <th className="text-center py-2 px-3">Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {filtered.sort((a, b) => b.valor - a.valor).map((v, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-[#0F1B2D]">{v.empreendimento}</td>
                  <td className="py-2 px-3 text-gray-600">{v.vendedor}</td>
                  <td className="py-2 px-3">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${v.squad === "Squad 1" ? "bg-blue-100 text-blue-700" : v.squad === "Squad 2" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {v.squad}
                    </span>
                  </td>
                  <td className="text-right py-2 px-3 text-[#F06B5D] font-medium">{v.valor > 0 ? formatCurrency(v.valor) : "-"}</td>
                  <td className="text-center py-2 px-3 text-gray-600">{v.mes}</td>
                  <td className="text-center py-2 px-3 text-gray-500">#{v.pipeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ranking de vendedores */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F1B2D] mb-3">Ranking de Vendedores (2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">Vendedor</th>
                <th className="text-right py-2 px-3">Deals Won</th>
                <th className="text-right py-2 px-3">Valor Total</th>
                <th className="text-right py-2 px-3">Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {topSellers2026.filter(s => s.valorTotal > 0).sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 12).map((s, i) => (
                <tr key={s.nome} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-400 font-bold">{i + 1}</td>
                  <td className="py-2 px-3 font-medium text-[#0F1B2D]">{s.nome}</td>
                  <td className="text-right py-2 px-3 text-gray-600">{s.dealsWon}</td>
                  <td className="text-right py-2 px-3 text-green-600 font-medium">{formatCurrency(s.valorTotal)}</td>
                  <td className="text-right py-2 px-3 text-[#F06B5D]">{formatCurrency(s.ticketMedio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
