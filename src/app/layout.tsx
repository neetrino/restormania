import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Noto_Sans_Armenian } from "next/font/google";
import localFont from "next/font/local";
import { LocaleProvider } from "@/i18n/LocaleProvider";
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

function isLocalhostUrl(value: string): boolean {
  try {
    const { hostname } = new URL(value);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/**
 * Absolute origin for OG/Twitter images.
 * Never emit localhost in production builds — crawlers cannot fetch it.
 * Same pattern as Kamancha.
 */
function resolveMetadataBase(): URL {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.APP_URL?.trim();
  if (appUrl && !isLocalhostUrl(appUrl)) {
    return new URL(appUrl);
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return new URL(
      productionHost.startsWith("http")
        ? productionHost
        : `https://${productionHost}`,
    );
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return new URL(
      vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`,
    );
  }

  if (appUrl) {
    return new URL(appUrl);
  }

  return new URL("http://localhost:3000");
}

/**
 * Explicit public PNG (not App Router `/opengraph-image?hash`).
 * Prefer absolute R2 CDN URL so Telegram/WhatsApp/Facebook fetch the image
 * without relying on hashed app routes — same as Kamancha / ToonExpo.
 */
const SHARE_IMAGE_PATH = "/assets/og-share.png";
const SHARE_IMAGE_WIDTH = 1200;
const SHARE_IMAGE_HEIGHT = 630;

function resolveShareImageUrl(): string {
  const r2Base =
    process.env.R2_PUBLIC_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_STATIC_ASSET_BASE_URL?.replace(/\/$/, "");
  if (r2Base) {
    return `${r2Base}${SHARE_IMAGE_PATH}`;
  }

  return SHARE_IMAGE_PATH;
}

const shareImageUrl = resolveShareImageUrl();

const SITE_DESCRIPTION =
  "Restormania — բաց պատմություն ռեստորանային բիզնեսի մասին։ Kamancha և Pideh նախագծերի տունը։";

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: "Restormania",
    template: "%s · Restormania",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Restormania",
    title: "Restormania",
    description: SITE_DESCRIPTION,
    locale: "hy_AM",
    url: "/",
    images: [
      {
        url: shareImageUrl,
        width: SHARE_IMAGE_WIDTH,
        height: SHARE_IMAGE_HEIGHT,
        alt: "Restormania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restormania",
    description: SITE_DESCRIPTION,
    images: [shareImageUrl],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hy"
      className={`${notoArmenian.variable} ${montserrat.variable} ${bebasNeue.variable} ${mirageExpanded.variable} ${braindRepublic.variable}`}
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
