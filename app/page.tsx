'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Code, Zap, Layers } from 'lucide-react';

export default function HomePage() {
    const [isDark, setIsDark] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const skills = [
        { name: 'Next.js & React', icon: Code, level: 95 },
        { name: 'Laravel & PHP', icon: Zap, level: 90 },
        { name: 'Performance & UX', icon: Layers, level: 85 }
    ];

    const featured = [
        {
            slug: 'project-1',
            title: 'E-Commerce Platform',
            description: 'Full-stack marketplace with Next.js and Laravel backend',
            stack: ['Next.js', 'Laravel', 'MySQL', 'Tailwind']
        },
        {
            slug: 'project-2',
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard with real-time data visualization',
            stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js']
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Animated Background Gradient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${isDark ? 'bg-emerald-600' : 'bg-emerald-400'}`}
                    style={{
                        left: `${mousePosition.x - 192}px`,
                        top: `${mousePosition.y - 192}px`,
                        transition: 'left 0.3s, top 0.3s'
                    }}
                />
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-teal-600' : 'bg-teal-400'}`} />
                <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-green-600' : 'bg-green-400'}`} />
            </div>

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className={`p-3 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-black/10 text-emerald-600'} hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fadeIn">
                        <div className="space-y-4">
                            <p className={`text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-semibold tracking-wide`}>
                                Hi, I'm Akhtar
                            </p>
                            <h1 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                                Web Developer
                            </h1>
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-lg`}>
                                I build scalable web products with Next.js and Laravel — focused on performance, maintainability, and clean UX.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href="/projects"
                                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'}`}
                            >
                                View Projects
                            </a>
                            <a
                                href="/contact"
                                className={`px-8 py-4 rounded-full font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-gray-900 border border-black/10'}`}
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Glassy Card */}
                    <div className={`relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 shadow-2xl shadow-emerald-600/20' : 'bg-white/70 border-white/40 shadow-2xl shadow-emerald-400/20'}`}>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-60 animate-pulse" />

                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Core Expertise
                        </h3>

                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <skill.icon className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {skill.name}
                    </span>
                                        <span className={`ml-auto ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {skill.level}%
                    </span>
                                    </div>
                                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-8 pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>3+</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp</div>
                                </div>
                                <div>
                                    <div className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>50+</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
                                </div>
                                <div>
                                    <div className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>20+</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Projects Section */}
                <div className="mt-20 space-y-8">
                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Featured Projects
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {featured.map((p) => (
                            <a
                                href="/projects"
                                key={p.slug}
                                className={`group rounded-2xl backdrop-blur-xl p-6 border transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-lg shadow-emerald-600/10' : 'bg-white/70 border-white/40 hover:bg-white/90 shadow-lg shadow-emerald-400/10'}`}
                            >
                                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {p.title}
                                </h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {p.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {p.stack.map((s) => (
                                        <span
                                            key={s}
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
                                        >
                      {s}
                    </span>
                                    ))}
                                </div>
                                <span className={`inline-flex items-center text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'} group-hover:gap-2 transition-all`}>
                  See details
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-20">
                    <p className={`text-center mb-8 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Technologies I work with
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'PostgreSQL', 'Node.js'].map((tech, i) => (
                            <div
                                key={i}
                                className={`px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer ${isDark ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white/50 border border-gray-200 text-gray-700 hover:bg-white/80'}`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
        </div>
    );
}