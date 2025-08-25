import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnalyticsTracker from "@/components/analytics-tracker";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carvalho Móveis - Móveis de Qualidade",
  description: "Transforme sua casa com nossos móveis únicos e duradouros. Qualidade e elegância desde 2020.",
  icons: {
    icon: "/favicon-32x32.png", // <- Adicionado aqui
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <AnalyticsTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
