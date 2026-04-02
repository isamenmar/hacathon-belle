"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home", icon: "📊" },
  { href: "/marketing", label: "Marketing", icon: "📣" },
  { href: "/time", label: "Time", icon: "👥" },
  { href: "/mia", label: "MIA (IA)", icon: "🤖" },
  { href: "/squads", label: "Squads", icon: "⚡" },
  { label: "SETORES", divider: true },
  { href: "/setores/szi", label: "SZI", icon: "🏢" },
  { href: "/setores/szs", label: "SZS", icon: "🏠" },
  { href: "/setores/parceiros", label: "Parceiros", icon: "🤝" },
  { href: "/setores/marketplace", label: "Marketplace", icon: "🛒" },
  { href: "/setores/expansao", label: "Expansão", icon: "🚀" },
  { label: "EMPREENDIMENTOS", divider: true },
  { href: "/empreendimentos/marista-144-spot", label: "Marista 144", icon: "🏗️" },
  { href: "/empreendimentos/urubici-spot-ii", label: "Urubici II", icon: "🏗️" },
  { href: "/empreendimentos/vistas-de-anita-2", label: "Vistas de Anitá", icon: "🏗️" },
  { href: "/empreendimentos/santinho-spot", label: "Santinho", icon: "🏗️" },
  { href: "/empreendimentos/batel-spot", label: "Batel", icon: "🏗️" },
  { href: "/empreendimentos/caragua-spot", label: "Caraguá", icon: "🏗️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0F1B2D] overflow-y-auto">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F06B5D] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SZ</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Belle Analytics</h1>
            <p className="text-[10px] text-gray-400">Seazone Investimentos</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item, i) =>
          item.divider ? (
            <div key={i} className="pt-4 pb-1 px-3">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                {item.label}
              </span>
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
