'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";

function Navbar() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const darkMode = document.documentElement.classList.contains('dark');
        setIsDark(darkMode);

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const links = [
        {href: "/", label: "Home"},
        {href: "/about", label: "About"},
        {href: "/projects", label: "Projects"},
        {href: "/contact", label: "Contact"},
    ];

    return (
        <nav
            className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${isDark ? 'bg-gray-950/80 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <div className="mx-auto max-w-5xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-emerald-400 to-teal-400' : 'from-emerald-600 to-teal-600'}`}
                    >
                        {'<Akhtar/>'}
                    </Link>
                    <div className="flex gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-all duration-300 font-medium ${
                                    pathname === link.href
                                        ? isDark
                                            ? 'text-emerald-400'
                                            : 'text-emerald-600'
                                        : isDark
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar