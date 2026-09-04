import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Noto_Sans_Armenian } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-armenian",
  subsets: ["armenian"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const mirageExpanded = localFont({
  src: "../fonts/Mirage-Expanded.otf",
  variable: "--font-mirage",
  display: "swap",
  weight: "400",
});

const braindRepublic = localFont({
  src: "../fonts/BraindRepublic-Regular.otf",
  variable: "--font-braind-republic",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Restormania",
  description:
    "Restormania — բաց պատմություն ռեստորանային բիզնեսի մասին։ Kamancha և Pideh նախագծերի տունը։",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hy"
      className={`${notoArmenian.variable} ${montserrat.variable} ${bebasNeue.variable} ${mirageExpanded.variable} ${braindRepublic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
