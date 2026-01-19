'use client';

import {Github, Linkedin, Mail, Twitter} from "lucide-react";
import {useState, useEffect} from "react";

export default function Footer() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Initial check
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        const observer = new MutationObserver((mutations: MutationRecord[]) => {
            checkDarkMode();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const socials = [
        {icon: Github, href: "https://github.com/yourusername", label: "GitHub"},
        {icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn"},
        {icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter"},
        {icon: Mail, href: "mailto:your@email.com", label: "Email"}
    ];

    return (
        <footer
            className={`mt-20 border-t backdrop-blur-xl transition-colors duration-500 ${isDark ? 'bg-gray-950/80 border-white/10' : 'bg-white/80 border-gray-200'}`}>
            <div className="mx-auto max-w-5xl px-4 py-12">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex gap-4">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-emerald-400 hover:bg-white/20' : 'bg-black/5 text-emerald-600 hover:bg-black/10'}`}
                            >
                                <social.icon className="w-5 h-5"/>
                            </a>
                        ))}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        © {new Date().getFullYear()} Akhtar. Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}