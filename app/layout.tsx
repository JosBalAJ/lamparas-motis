import type { Metadata } from "next";
import { Merriweather, Montserrat } from "next/font/google";
import './globals.css';
import { title } from "process";

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['400', '600', '700']
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700']
});

export const metadata = {
  title: 'Lámparas Motis | Iluminación Artesanal',
  description: 'Piezas únicas. Materiales nobles. Luz con historia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${merriweather.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}