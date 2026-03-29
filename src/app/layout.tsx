import type { Metadata } from "next";
import { 
  Outfit, Inter, Crimson_Pro, Playfair_Display, Montserrat, 
  Space_Grotesk, Bebas_Neue, Caveat, Prata, Courier_Prime,
  Cormorant_Garamond, Inconsolata 
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: 'swap' });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: 'swap' });
const crimson = Crimson_Pro({ variable: "--font-crimson", subsets: ["latin"], weight: ["400"], display: 'swap' });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: 'swap' });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: 'swap' });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: ["400"], display: 'swap' });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: 'swap' });
const prata = Prata({ variable: "--font-prata", subsets: ["latin"], weight: ["400"], display: 'swap' });
const courier = Courier_Prime({ variable: "--font-courier", subsets: ["latin"], weight: ["400"], display: 'swap' });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400"], display: 'swap' });
const inconsolata = Inconsolata({ variable: "--font-inconsolata", subsets: ["latin"], weight: ["300", "400"], display: 'swap' });

export const metadata: Metadata = {
  title: "stick to the plan.",
  description: "Explore, Conecte e Apoie a nossa Missão.",
  icons: {
    icon: '/cloud.png',
  },
  openGraph: {
    title: "stick to the plan.",
    description: "Explore, Conecte e Apoie a nossa Missão.",
    images: [{ url: '/cloud.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "stick to the plan.",
    description: "Explore, Conecte e Apoie a nossa Missão.",
    images: ['/cloud.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${outfit.variable} ${inter.variable} ${crimson.variable} ${playfair.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${bebas.variable} ${caveat.variable} ${prata.variable} ${courier.variable} ${cormorant.variable} ${inconsolata.variable}`}>
      <head>
        {/* @ts-ignore */}
        <link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
        {/* @ts-ignore */}
        <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
