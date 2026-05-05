import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Archetipo Workshop",
  description: "Next.js + Supabase + Prisma + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={cn("font-sans", inter.variable)}>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
