"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home", icon: "📊" },
  { href: "/marketing", label: "Marketing", icon: "📣" },
  { href: "/time", label: "Time", icon: "👥" },
  { href: "/mia", label: "MIA (IA)", icon: "🤖" },
  { href: "/squads", label: "Squads", icon: "⚡" },
  { href: "/vendas", label: "Vendas", icon: "💰" },
  { label: "SETORES", divider: true },
  { href: "/setores/szi", label: "SZI", icon: "🏢" },
  { href: "/setores/szs", label: "SZS", icon: "🏠" },
  { href: "/setores/parceiros", label: "Parceiros", icon: "🤝" },
  { href: "/setores/marketplace", label: "Marketplace", icon: "🛒" },
  { href: "/setores/expansao", label: "Expansão", icon: "🚀" },
  { label: "EMPREENDIMENTOS", divider: true, count: 12 },
  { href: "/empreendimentos/ponta-das-canas-spot-ii", label: "Ponta das Canas II", icon: "🏗️" },
  { href: "/empreendimentos/natal-spot", label: "Natal Spot", icon: "🏗️" },
  { href: "/empreendimentos/barra-grande-spot", label: "Barra Grande", icon: "🏗️" },
  { href: "/empreendimentos/jurere-spot-iii", label: "Jurerê III", icon: "🏗️" },
  { href: "/empreendimentos/jurere-spot-ii", label: "Jurerê II", icon: "🏗️" },
  { href: "/empreendimentos/marista-144-spot", label: "Marista 144", icon: "🏗️" },
  { href: "/empreendimentos/vistas-de-anita-2", label: "Vistas de Anitá", icon: "🏗️" },
  { href: "/empreendimentos/caragua-spot", label: "Caraguá", icon: "🏗️" },
  { href: "/empreendimentos/santinho-spot", label: "Santinho", icon: "🏗️" },
  { href: "/empreendimentos/bonito-spot", label: "Bonito", icon: "🏗️" },
  { href: "/empreendimentos/meireles-spot", label: "Meireles", icon: "🏗️" },
  { href: "/empreendimentos/foz-spot", label: "Foz", icon: "🏗️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0F1B2D] overflow-y-auto">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/seazone-logo.png" alt="Seazone" className="w-9 h-9 rounded-lg object-contain" />
          <h1 className="text-lg font-bold text-white">Seazone Saleszone</h1>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item, i) =>
          item.divider ? (
            <div key={i} className="pt-4 pb-1 px-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                {item.label}
              </span>
              {item.count && (
                <span className="text-[9px] font-medium text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-[#F06B5D] text-white font-medium"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        )}
      </nav>
      <div className="p-4 border-t border-white/10 text-[10px] text-gray-500">
        Dados: Jan-Mar/2026 (prioridade)
      </div>
    </aside>
  );
}
