import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BelleChat from "@/components/BelleChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belle | Seazone Analytics",
  description: "Análise de Vendas e Marketing - Seazone Investimentos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
            {children}
          </main>
        </div>
        <BelleChat />
      </body>
    </html>
  );
}
