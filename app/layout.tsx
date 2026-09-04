import type { Metadata } from "next";
import { Inter, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-gujarati",
  display: "swap",
});

export const metadata: Metadata = {
  title: "રાધે હાર્ડવેર (Radhe Hardware) — ખેડૂતનો સાચો સાથી | Farm Irrigation & PVC Pipes Lalpur",
  description:
    "રાધે હાર્ડવેર લાલપુર, તા. કપડવંજ. સ્પ્રિંકલર અને મીની સ્પ્રિંકલર ફુલ સેટઅપ, સ્વર્ણિમ™ એગ્રીકલ્ચર ISI:4985 PVC પાઈપો, બોલ વાલ્વ, સેન્ટર ફિલ્ટર અને તમામ સ્પેરપાર્ટ્સ. હોલસેલ અને રિટેલ.",
  keywords: [
    "Radhe Hardware",
    "રાધે હાર્ડવેર",
    "Sprinklers Lalpur",
    "Kapadwanj Irrigation",
    "Swarnim PVC Pipes",
    "Farm Irrigation Gujarat",
    "Mini Sprinklers",
    "Agri PVC Pipes IS 4985",
  ],
  authors: [{ name: "Radhe Hardware" }],
  openGraph: {
    title: "રાધે હાર્ડવેર (Radhe Hardware) — ખેડૂતનો સાચો સાથી",
    description:
      "કૃષિ કામ માટેનો દરેક મટીરીયલ એક જ જગ્યાએ! સ્પ્રિંકલર સેટઅપ, સ્વર્ણિમ™ સબસિડી માન્ય PVC પાઈપો, અને તમામ સ્પેરપાર્ટ્સ.",
    locale: "gu_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className={`${inter.variable} ${notoGujarati.variable}`}>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-[#5433eb] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
