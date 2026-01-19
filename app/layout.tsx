import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
    title: "Akhtar | Web Developer",
    description: "Portfolio of Akhtar — Next.js, Laravel, and product-focused web development.",
    metadataBase: new URL("https://your-domain.com"), // update later
    openGraph: {
        title: "Akhtar | Web Developer",
        description: "Projects, case studies, and contact.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-white text-zinc-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
