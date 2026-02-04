import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
    title: "Akhtar | Web Developer",
    description: "Portfolio of Akhtar — Next.js, Laravel, and product-focused web development.",
    metadataBase: new URL("https://your-domain.com"),
    openGraph: {
        title: "Akhtar | Web Developer",
        description: "Projects, case studies, and contact.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen transition-colors duration-500">
        {/*<Navbar />*/}
        <main>{children}</main>
        {/*<Footer />*/}
        </body>
        </html>
    );
}