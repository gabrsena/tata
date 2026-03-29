import type { Metadata } from "next";
import { 
  Outfit, Inter, Crimson_Pro, Playfair_Display, Montserrat, 
  Space_Grotesk, Bebas_Neue, Caveat, Prata, Courier_Prime,
  Cormorant_Garamond, Inconsolata 
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const crimson = Crimson_Pro({ variable: "--font-crimson", subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: ["400"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const prata = Prata({ variable: "--font-prata", subsets: ["latin"], weight: ["400"] });
const courier = Courier_Prime({ variable: "--font-courier", subsets: ["latin"], weight: ["400"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400"] });
const inconsolata = Inconsolata({ variable: "--font-inconsolata", subsets: ["latin"], weight: ["300", "400"] });

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
      <body>{children}</body>
    </html>
  );
}
