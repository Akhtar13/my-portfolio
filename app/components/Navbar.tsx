import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="border-b">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" className="font-semibold">
                    Akhtar
                </Link>

                <nav className="flex gap-4 text-sm">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="hover:underline">
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
