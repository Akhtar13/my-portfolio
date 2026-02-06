'use client';

import type {ReactNode} from 'react';

import React, {useState, useEffect, useRef} from 'react';
import {Moon, Sun, Code, Zap, Layers, Mail, Github, Linkedin, ExternalLink, Menu, X, ChevronDown} from 'lucide-react';
import {motion, useScroll, useTransform, useSpring, useInView, AnimatePresence} from 'framer-motion';

type StaggerContainerProps = {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
};

// Stagger Children Container
const StaggerContainer = ({children, className = "", staggerDelay = 0.1}: StaggerContainerProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {once: false, margin: "-50px"});

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

type StaggerItemProps = {
    children: ReactNode;
    className?: string;
};

// Individual Stagger Item
const StaggerItem = ({children, className = ""}: StaggerItemProps) => {
    return (
        <motion.div
            variants={{
                hidden: {opacity: 0, y: 20},
                visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

type Project = {
    title: string;
    description: string;
    stack: string[];
    link: string;
    details: string;
    images: string[];
};

// Project Modal Component
const ProjectModal = ({project, onClose, isDark}: {project: Project | null, onClose: () => void, isDark: boolean}) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{scale: 0.9, opacity: 0, y: 20}}
                    animate={{scale: 1, opacity: 1, y: 0}}
                    exit={{scale: 0.9, opacity: 0, y: 20}}
                    onClick={(e) => e.stopPropagation()}
                    className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 ${isDark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {project.title}
                            </h2>
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Technology Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className={`rounded-full px-4 py-2 text-sm font-medium ${isDark ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Project Details
                            </h3>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                                {project.details}
                            </p>
                        </div>

                        {/* Screenshots */}
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Screenshots
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-video rounded-xl overflow-hidden border ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}
                                    >
                                        <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {/* Placeholder - replace with actual images */}
                                            <span className="text-sm">Screenshot {i + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to action */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'}`}
                            >
                                View Live Project
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

function OnePagePortfolio() {
    const [isDark, setIsDark] = useState(true);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [activeSection, setActiveSection] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const sections = ['home', 'about', 'projects', 'contact'];
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Track active section based on scroll position
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const newIndex = sections.indexOf(sectionId);
                    if (newIndex !== -1 && newIndex !== activeSection) {
                        setActiveSection(newIndex);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    // Snap scroll functionality
    useEffect(() => {
        let isThrottled = false;

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling || isThrottled) return;

            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, 100);

            const direction = e.deltaY > 0 ? 1 : -1;
            const newSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));

            if (newSection !== activeSection) {
                setIsScrolling(true);
                scrollToSection(sections[newSection]);

                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrolling(false);
                }, 1000);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const newSection = Math.min(sections.length - 1, activeSection + 1);
                if (newSection !== activeSection) {
                    setIsScrolling(true);
                    scrollToSection(sections[newSection]);
                    setTimeout(() => setIsScrolling(false), 1000);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const newSection = Math.max(0, activeSection - 1);
                if (newSection !== activeSection) {
                    setIsScrolling(true);
                    scrollToSection(sections[newSection]);
                    setTimeout(() => setIsScrolling(false), 1000);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, {passive: true});
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [activeSection, isScrolling, sections]);

    // Touch support for mobile
    useEffect(() => {
        let touchStart = 0;
        let touchEnd = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStart = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEnd = e.changedTouches[0].clientY;
            const distance = touchStart - touchEnd;

            if (Math.abs(distance) > 50 && !isScrolling) {
                const direction = distance > 0 ? 1 : -1;
                const newSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));

                if (newSection !== activeSection) {
                    setIsScrolling(true);
                    scrollToSection(sections[newSection]);
                    setTimeout(() => setIsScrolling(false), 1000);
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart, {passive: true});
        window.addEventListener('touchend', handleTouchEnd, {passive: true});

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeSection, isScrolling, sections]);

    const skills = [
        {name: 'Laravel & PHP (Backend)', icon: Zap, level: 90},
        {name: 'Backend Architecture & Business Logic', icon: Layers, level: 85},
        {name: 'Payments & Checkout Systems', icon: Code, level: 80},
        {name: 'Frontend Integration (Blade / Next.js )', icon: Code, level: 60},
        {name: 'Node.js (NestJS)', icon: Zap, level: 55}
    ];

    const projects: Project[] = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack marketplace with Next.js and Laravel backend, featuring real-time inventory management and secure payment processing.',
            stack: ['Next.js', 'Laravel', 'MySQL', 'Tailwind'],
            link: '#',
            details: 'Built a comprehensive e-commerce solution handling 10,000+ daily transactions. Implemented complex inventory management, multi-vendor support, and integrated with Stripe and PayPal for payment processing. The system includes real-time stock updates, automated order fulfillment, and advanced analytics dashboard for vendors.',
            images: ['', '', '', '']
        },
        {
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard with real-time data visualization, user management, and customizable reporting features.',
            stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
            link: '#',
            details: 'Developed a multi-tenant SaaS platform serving 500+ businesses. Features include real-time analytics, custom report generation, role-based access control, and API integrations with popular business tools. Built with scalability in mind, handling millions of data points efficiently.',
            images: ['', '', '', '']
        },
        {
            title: 'Corporate Website',
            description: 'Modern corporate website with CMS integration, blog functionality, and multilingual support.',
            stack: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
            link: '#',
            details: 'Created a high-performance corporate website with headless CMS architecture. Implemented advanced SEO optimization, achieving 95+ Lighthouse scores. Features include dynamic content management, multi-language support for 5 languages, and integrated blog platform with rich media support.',
            images: ['', '', '', '']
        },
        {
            title: 'Mobile App Backend',
            description: 'RESTful API backend for mobile applications with authentication, push notifications, and cloud storage.',
            stack: ['Laravel', 'Redis', 'AWS', 'Docker'],
            link: '#',
            details: 'Architected a robust API backend serving iOS and Android applications with 100,000+ active users. Implemented JWT authentication, real-time push notifications, file upload/management with S3, and optimized database queries for sub-100ms response times. Deployed on AWS with auto-scaling capabilities.',
            images: ['', '', '', '']
        }
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        const newIndex = sections.indexOf(sectionId);

        if (element && newIndex !== -1) {
            setActiveSection(newIndex);
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
            setMenuOpen(false);
        }
    };

    const scrollToNext = () => {
        const nextSection = Math.min(sections.length - 1, activeSection + 1);
        scrollToSection(sections[nextSection]);
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'} overflow-x-hidden`}>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left z-[100]"
                style={{scaleX}}
            />

            {/* Section Indicators */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
                {sections.map((section, index) => (
                    <motion.button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        whileHover={{scale: 1.5}}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            activeSection === index
                                ? isDark ? 'bg-emerald-400 w-4 h-4' : 'bg-emerald-600 w-4 h-4'
                                : isDark ? 'bg-white/30' : 'bg-gray-400'
                        }`}
                        aria-label={`Go to ${section}`}
                    />
                ))}
            </div>

            {/* Animated Background Gradient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${isDark ? 'bg-emerald-600' : 'bg-emerald-400'}`}
                    animate={{
                        left: `${mousePosition.x - 192}px`,
                        top: `${mousePosition.y - 192}px`,
                    }}
                    transition={{type: "spring", damping: 50, stiffness: 150, mass: 0.5}}
                />
                <motion.div
                    className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-teal-600' : 'bg-teal-400'}`}
                    animate={{scale: [1, 1.2, 1], rotate: [0, 90, 0]}}
                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                />
                <motion.div
                    className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-green-600' : 'bg-green-400'}`}
                    animate={{scale: [1, 1.3, 1], x: [0, 100, 0]}}
                    transition={{duration: 25, repeat: Infinity, ease: "linear"}}
                />
            </div>

            {/* Navigation Bar */}
            <motion.nav
                initial={{y: -100}}
                animate={{y: 0}}
                transition={{duration: 0.5}}
                className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${isDark ? 'bg-gray-950/80 border-white/10' : 'bg-white/80 border-gray-200'}`}
            >
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.h1
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.2}}
                            className={`text-xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                        >
                            Akhtar
                        </motion.h1>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {sections.map((section, i) => (
                                <motion.button
                                    key={section}
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1 * i}}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize font-medium transition-colors duration-300 relative ${
                                        activeSection === i
                                            ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                            : isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'
                                    }`}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    {section}
                                    {activeSection === i && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                                            transition={{type: "spring", stiffness: 380, damping: 30}}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Theme Toggle & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{scale: 1.1, rotate: 180}}
                                whileTap={{scale: 0.9}}
                                onClick={() => setIsDark(!isDark)}
                                className={`p-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-black/10 text-emerald-600'}`}
                            >
                                {isDark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                            </motion.button>

                            <motion.button
                                whileTap={{scale: 0.9}}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`md:hidden p-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-black/10 text-emerald-600'}`}
                            >
                                {menuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: "auto", opacity: 1}}
                                exit={{height: 0, opacity: 0}}
                                transition={{duration: 0.3}}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="mt-4 pb-4 space-y-2">
                                    {sections.map((section, i) => (
                                        <motion.button
                                            key={section}
                                            whileHover={{x: 5}}
                                            onClick={() => scrollToSection(section)}
                                            className={`block w-full text-left px-4 py-2 rounded-lg capitalize font-medium transition-colors duration-300 ${
                                                activeSection === i
                                                    ? isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                                                    : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {section}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* Project Modal - FIX #3 */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    isDark={isDark}
                />
            )}

            {/* Scroll Container */}
            <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
                {/* Hero Section */}
                <section id="home" className="snap-start snap-always h-screen relative z-10 flex items-center">
                    <div className="max-w-6xl mx-auto px-4 w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <StaggerContainer className="space-y-8">
                                <div className="space-y-4">
                                    <StaggerItem>
                                        <p className={`text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-semibold tracking-wide`}>
                                            Hi, I'm Akhtar
                                        </p>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <h1 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                                            Web Developer
                                        </h1>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-lg`}>
                                            I specialize in building robust backend systems with Laravel, focusing on
                                            complex business logic, payments, multi-tenant architecture, and scalable
                                            APIs.
                                            I'm also comfortable working with NestJS and Next.js to support frontend
                                            integration and deliver end-to-end solutions.
                                        </p>
                                    </StaggerItem>
                                </div>

                                <StaggerItem>
                                    <div className="flex gap-4">
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                            onClick={() => scrollToSection('projects')}
                                            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'}`}
                                        >
                                            View Projects
                                        </motion.button>
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                            onClick={() => scrollToSection('contact')}
                                            className={`px-8 py-4 rounded-full font-semibold backdrop-blur-md transition-all duration-300 ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-gray-900 border border-black/10'}`}
                                        >
                                            Contact Me
                                        </motion.button>
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>

                            {/* Right Content - Glassy Card */}
                            <motion.div
                                initial={{opacity: 0, scale: 0.8, rotateY: -20}}
                                animate={{opacity: 1, scale: 1, rotateY: 0}}
                                transition={{duration: 0.8, delay: 0.2}}
                                className={`relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/5 border-white/10 shadow-2xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:border-emerald-600/40 hover:-translate-y-2' : 'bg-white/70 border-white/40 shadow-2xl shadow-emerald-400/20 hover:shadow-emerald-400/40 hover:border-emerald-400/60 hover:-translate-y-2'}`}
                                style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden', perspective: 1000}}
                            >
                                <motion.div
                                    animate={{scale: [1, 1.2, 1]}}
                                    transition={{duration: 3, repeat: Infinity}}
                                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-60"
                                />

                                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Core Expertise
                                </h3>

                                <div className="space-y-6">
                                    {skills.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{opacity: 0, x: -20}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: 0.4 + i * 0.1}}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <skill.icon
                                                    className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}/>
                                                <span
                                                    className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {skill.name}
                                                </span>
                                                <span
                                                    className={`ml-auto ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div
                                                className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                                <motion.div
                                                    initial={{width: 0}}
                                                    animate={{width: `${skill.level}%`}}
                                                    transition={{duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut"}}
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1}}
                                    className={`mt-8 pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                >
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        {[
                                            {value: '3+', label: 'Years Exp'},
                                            {value: '20+', label: 'Production Deployments'},
                                            {value: '10+', label: 'Scalable Architectures'}
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{delay: 1.2 + i * 0.1}}
                                            >
                                                <div
                                                    className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                    {stat.value}
                                                </div>
                                                <div
                                                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Down Indicator */}
                    {activeSection === 0 && (
                        <motion.button
                            onClick={scrollToNext}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 1.5}}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                        >
                            <motion.div
                                animate={{y: [0, 10, 0]}}
                                transition={{duration: 1.5, repeat: Infinity}}
                                className={`flex flex-col items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                            >
                                <span className="text-sm font-medium">Scroll Down</span>
                                <ChevronDown className="w-6 h-6"/>
                            </motion.div>
                        </motion.button>
                    )}
                </section>

                {/* About Section */}
                <section id="about" className="snap-start snap-always h-screen relative z-10 flex items-center">
                    <div className="max-w-6xl mx-auto px-4 w-full">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false, margin: "-100px"}}
                            className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            About Me
                        </motion.h2>

                        <StaggerContainer className="grid lg:grid-cols-2 gap-12">
                            <StaggerItem>
                                <div
                                    className={`backdrop-blur-xl rounded-3xl p-8 border h-full transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/5 border-white/10 hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-1' : 'bg-white/70 border-white/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-400/20 hover:-translate-y-1'}`}
                                    style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}
                                >
                                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        My Journey
                                    </h3>
                                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        With over 3 years of experience in web development, I specialize in building and
                                        maintaining backend-heavy systems using Laravel.
                                    </p>
                                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        My work focuses on complex business logic, payment and checkout flows,
                                        multi-tenant architectures, and scalable APIs that power real production
                                        applications.
                                    </p>
                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        I've worked on long-running products where reliability, data integrity, and
                                        clean system design matter more than surface-level features. I'm also
                                        comfortable working with modern frontend stacks to ship complete, end-to-end
                                        solutions when needed.
                                    </p>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div
                                    className={`backdrop-blur-xl rounded-3xl p-8 border h-full transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/5 border-white/10 hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-1' : 'bg-white/70 border-white/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-400/20 hover:-translate-y-1'}`}
                                    style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}
                                >
                                    <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            'Laravel',
                                            'PHP',
                                            'MySQL',
                                            'PostgreSQL',
                                            'Node.js (NestJS)',
                                            'Next.js',
                                            'React',
                                            'TypeScript',
                                            'Docker',
                                            'AWS',
                                            'Git',
                                            'Tailwind CSS'
                                        ].map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{opacity: 0, scale: 0}}
                                                whileInView={{opacity: 1, scale: 1}}
                                                viewport={{once: false}}
                                                transition={{delay: i * 0.05}}
                                                whileHover={{scale: 1.1}}
                                                className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 ${isDark ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </section>

                {/* Projects Section - FIX #3: Added modal functionality */}
                <section id="projects"
                         className="snap-start snap-always h-screen relative z-10 flex items-center overflow-y-auto scrollbar-hide">
                    <div className="max-w-6xl mx-auto px-4 w-full py-20">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false, margin: "-100px"}}
                            className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Featured Projects
                        </motion.h2>

                        <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.15}>
                            {projects.map((project, i) => (
                                <StaggerItem key={i}>
                                    <div
                                        className={`group backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-600/50 shadow-lg shadow-emerald-600/10 hover:shadow-2xl hover:shadow-emerald-600/30 hover:-translate-y-2' : 'bg-white/70 border-white/40 hover:bg-white/90 hover:border-emerald-400/70 shadow-lg shadow-emerald-400/10 hover:shadow-2xl hover:shadow-emerald-400/30 hover:-translate-y-2'}`}
                                        style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}
                                    >
                                        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {project.title}
                                        </h3>
                                        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.stack.map((tech, techIndex) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{opacity: 0, scale: 0}}
                                                    whileInView={{opacity: 1, scale: 1}}
                                                    viewport={{once: false}}
                                                    transition={{delay: techIndex * 0.05}}
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                        <motion.button
                                            whileHover={{x: 5}}
                                            onClick={() => setSelectedProject(project)}
                                            className={`inline-flex items-center gap-2 text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                                        >
                                            View Details
                                            <ExternalLink className="w-4 h-4"/>
                                        </motion.button>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="snap-start snap-always h-screen relative z-10 flex items-center">
                    <div className="max-w-4xl mx-auto px-4 w-full">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false, margin: "-100px"}}
                            className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Get In Touch
                        </motion.h2>

                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: false, margin: "-100px"}}
                            transition={{duration: 0.5}}
                            className={`backdrop-blur-xl rounded-3xl p-8 md:p-12 border transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/5 border-white/10 shadow-2xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:border-emerald-600/40 hover:-translate-y-1' : 'bg-white/70 border-white/40 shadow-2xl shadow-emerald-400/20 hover:shadow-emerald-400/40 hover:border-emerald-400/60 hover:-translate-y-1'}`}
                            style={{transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}
                        >
                            <p className={`text-center text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                I'm open to working on backend-heavy web applications, scalable systems, and long-term
                                product development where reliability and clean architecture matter.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <motion.a
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    href="mailto:your.email@example.com"
                                    className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'}`}
                                >
                                    <Mail className="w-5 h-5"/>
                                    Email Me
                                </motion.a>
                            </div>

                            <div className="flex justify-center gap-6">
                                {[
                                    {icon: Github, href: 'https://github.com'},
                                    {icon: Linkedin, href: 'https://linkedin.com'}
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 ${isDark ? 'bg-white/10 text-emerald-400 hover:bg-white/20' : 'bg-black/5 text-emerald-600 hover:bg-black/10'}`}
                                    >
                                        <social.icon className="w-6 h-6"/>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Footer */}
                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: false}}
                            className="mt-12 text-center"
                        >
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                © 2026 Akhtar. Built with Next.js & Tailwind CSS
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

export default OnePagePortfolio