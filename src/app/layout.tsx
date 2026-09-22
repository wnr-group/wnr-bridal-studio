import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoStrip from "@/components/layout/PromoStrip";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getProducts } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";
import { getSetting } from "@/lib/services/settings";
import { SITE_URL, SITE_NAME } from "@/lib/config/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WNR Bridal Studio — Handcrafted Elegance",
    template: "%s | WNR Bridal Studio",
  },
  description:
    "Premium Indian bridal wear — Lehengas, Sarees, and Bespoke Couture. Handcrafted with Aari, Zardosi, and Mirror embroidery.",
  openGraph: {
    title: "WNR Bridal Studio — Handcrafted Elegance",
    description:
      "Premium Indian bridal wear — Lehengas, Sarees, and Bespoke Couture. Handcrafted with Aari, Zardosi, and Mirror embroidery.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WNR Bridal Studio — Handcrafted Elegance",
    description:
      "Premium Indian bridal wear — Lehengas, Sarees, and Bespoke Couture. Handcrafted with Aari, Zardosi, and Mirror embroidery.",
  },
};

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, categories, promoText] = await Promise.all([
    getProducts(),
    getCategories(),
    getSetting("promo_strip_text"),
  ]);

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: "115 D, First Floor, TIDEL Park, No.4, Rajiv Gandhi Salai, Taramani",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600113",
    addressCountry: "IN",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/app-logo.png`,
        email: "admin@wnrtech.com",
        telephone: "+91 44 4556 6778",
        description:
          "Premium Indian bridal wear — Lehengas, Sarees, and Bespoke Couture. Handcrafted with Aari, Zardosi, and Mirror embroidery.",
        address: postalAddress,
      },
      {
        "@type": ["Store", "LocalBusiness"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        image: `${SITE_URL}/opengraph-image.png`,
        url: SITE_URL,
        email: "admin@wnrtech.com",
        telephone: "+91 44 4556 6778",
        priceRange: "₹₹₹",
        description:
          "Premium Indian bridal wear — Lehengas, Sarees, and Bespoke Couture. Handcrafted with Aari, Zardosi, and Mirror embroidery.",
        address: postalAddress,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <PromoStrip defaultText={promoText ?? undefined} />
        <Header products={products} categories={categories} />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer categories={categories} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
