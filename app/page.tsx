'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Code, Zap, Layers, Mail, Github, Linkedin, ExternalLink, Menu, X } from 'lucide-react';

export default function OnePagePortfolio() {
    const [isDark, setIsDark] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const skills = [
        { name: 'Next.js & React', icon: Code, level: 95 },
        { name: 'Laravel & PHP', icon: Zap, level: 90 },
        { name: 'Performance & UX', icon: Layers, level: 85 }
    ];

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack marketplace with Next.js and Laravel backend, featuring real-time inventory management and secure payment processing.',
            stack: ['Next.js', 'Laravel', 'MySQL', 'Tailwind'],
            link: '#'
        },
        {
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard with real-time data visualization, user management, and customizable reporting features.',
            stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
            link: '#'
        },
        {
            title: 'Corporate Website',
            description: 'Modern corporate website with CMS integration, blog functionality, and multilingual support.',
            stack: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
            link: '#'
        },
        {
            title: 'Mobile App Backend',
            description: 'RESTful API backend for mobile applications with authentication, push notifications, and cloud storage.',
            stack: ['Laravel', 'Redis', 'AWS', 'Docker'],
            link: '#'
        }
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

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

            {/* Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${isDark ? 'bg-gray-950/80 border-white/10' : 'bg-white/80 border-gray-200'}`}>
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className={`text-xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            Akhtar
                        </h1>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {['home', 'about', 'projects', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize font-medium transition-colors duration-300 ${
                                        activeSection === section
                                            ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                            : isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                                    }`}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>

                        {/* Theme Toggle & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`p-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-black/10 text-emerald-600'} hover:scale-110 transition-transform duration-300`}
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`md:hidden p-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-black/10 text-emerald-600'}`}
                            >
                                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-2">
                            {['home', 'about', 'projects', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`block w-full text-left px-4 py-2 rounded-lg capitalize font-medium transition-colors duration-300 ${
                                        activeSection === section
                                            ? isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                                            : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative z-10 min-h-screen flex items-center pt-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
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
                                <button
                                    onClick={() => scrollToSection('projects')}
                                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'}`}
                                >
                                    View Projects
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className={`px-8 py-4 rounded-full font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-gray-900 border border-black/10'}`}
                                >
                                    Contact Me
                                </button>
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
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        About Me
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className={`backdrop-blur-xl rounded-3xl p-8 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/40'}`}>
                            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                My Journey
                            </h3>
                            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                With over 3 years of experience in web development, I specialize in creating high-performance, user-centric applications. My passion lies in transforming complex problems into elegant, scalable solutions.
                            </p>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                I've worked with startups and established companies, delivering projects that prioritize both technical excellence and exceptional user experience.
                            </p>
                        </div>

                        <div className={`backdrop-blur-xl rounded-3xl p-8 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/40'}`}>
                            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'PostgreSQL', 'Node.js', 'TypeScript', 'Git', 'Docker', 'AWS'].map((tech, i) => (
                                    <span
                                        key={i}
                                        className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDark ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative z-10 min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Featured Projects
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className={`group backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-lg shadow-emerald-600/10' : 'bg-white/70 border-white/40 hover:bg-white/90 shadow-lg shadow-emerald-400/10'}`}
                            >
                                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {project.title}
                                </h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.link}
                                    className={`inline-flex items-center gap-2 text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'} group-hover:gap-3 transition-all`}
                                >
                                    View Project
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative z-10 min-h-screen flex items-center py-20">
                <div className="max-w-4xl mx-auto px-4 w-full">
                    <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Get In Touch
                    </h2>

                    <div className={`backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl shadow-emerald-600/20' : 'bg-white/70 border-white/40 shadow-2xl shadow-emerald-400/20'}`}>
                        <p className={`text-center text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <a
                                href="mailto:your.email@example.com"
                                className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'}`}
                            >
                                <Mail className="w-5 h-5" />
                                Email Me
                            </a>
                        </div>

                        <div className="flex justify-center gap-6">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-emerald-400 hover:bg-white/20' : 'bg-black/5 text-emerald-600 hover:bg-black/10'}`}
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-emerald-400 hover:bg-white/20' : 'bg-black/5 text-emerald-600 hover:bg-black/10'}`}
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`relative z-10 py-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="max-w-6xl mx-auto px-4">
                    <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        © 2026 Akhtar. Built with Next.js & Tailwind CSS
                    </p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}