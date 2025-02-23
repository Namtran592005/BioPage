import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import yourAvatar from './img/Avt/Avatar.png';
import ProjectOne from './img/Project/ProjectOne.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github, Facebook, Instagram, Music, ShoppingBag,
    Coffee, Globe, BookOpen, ExternalLink, MessageCircle, Heart,
    Sun, Moon, // Thêm Sun, Moon
    Send, User, Mail, // Thêm icon cho form
} from 'lucide-react';
import { FaThreads } from 'react-icons/fa6';
import { SiZalo } from "react-icons/si";
import './PersonalLandingPage.css';

// Lazy-load các component (tối ưu hóa hiệu suất)
const LinkCards = lazy(() => import('./LinkCards'));
const AboutSection = lazy(() => import('./AboutSection'));
const ProjectCards = lazy(() => import('./ProjectCards'));
const ProductCards = lazy(() => import('./ProductCards'));
const ContactForm = lazy(()=> import('./ContactForm')); // Lazy load ContactForm
const AnonymousFeedbackForm = lazy(() => import('./AnonymousFeedbackForm'));

const PersonalLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('links');
    const [cursorVariant, setCursorVariant] = useState("default"); // For custom cursor
    const [darkMode, setDarkMode] = useState(true); // Dark mode state
    const mainContentRef = useRef(null);
    const backgroundRef = useRef(null);

       // --- Dark Mode Toggle ---
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Thêm class 'dark' vào root
        } else {
            document.documentElement.classList.remove('dark'); // Xóa class 'dark'
        }
    }, [darkMode]);


    // --- Interactive Background Setup (Particles) ---
    useEffect(() => {
       const canvas = backgroundRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (x, y) => {
            return {
                x,
                y,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
            };
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < (window.innerWidth < 768 ? 30 : 50) ; i++) { // Ít hạt hơn trên mobile
                particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = darkMode ? `rgba(255, 255, 255, ${particle.opacity})` : `rgba(0, 0, 0, ${particle.opacity})`; // Màu hạt
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            });
        };

        const animate = () => {
            drawParticles();
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        initParticles();
        animate();

        const handleMouseMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (window.innerWidth < 768 ? 50 : 100)) { // Bán kính tương tác nhỏ hơn trên mobile
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = ((window.innerWidth < 768 ? 50 : 100) - distance) / (window.innerWidth < 768 ? 50 : 100);
                    particle.speedX -= forceDirectionX * force * 0.5;
                    particle.speedY -= forceDirectionY * force * 0.5;
                }
            });
        };


        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
             canvas.removeEventListener('mousemove', handleMouseMove);

        };
    }, [darkMode]); // Thêm darkMode vào dependency array

    // --- Loading and Scroll Effects ---
    useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeTab]);

       // --- Data (Links, Projects, Products) ---
    const socialLinks = [
        { icon: <Facebook size={24} />, url: 'https://facebook.com/namtran5905', label: 'Facebook' },
        { icon: <Instagram size={24} />, url: 'https://instagram.com/namtran5905', label: 'Instagram' },
        { icon: <Github size={24} />, url: 'https://github.com/namtran592005', label: 'GitHub' },
        { icon: <FaThreads size={24} />, url: 'https://threads.net/namtran5905', label: 'Threads' },
        { icon: <SiZalo size={24} />, url: 'https://zaloapp.com/qr/p/1re1dklrzok69?src=qr', label: 'Zalo' },
        { icon: <Heart size={24} />, url: 'https://locket.cam/Namtran5905', label: 'Locket' }
    ];

    const quickLinks = [
        //{ icon: <Globe size={24} />, title: 'Website Chính Thức', description: 'Khám phá portfolio và blog của tôi', url: '#',  },
        //{ icon: <ShoppingBag size={24} />, title: 'Shop Online', description: 'Ghé thăm cửa hàng trực tuyến của tôi', url: '#', },
        //{ icon: <Music size={24} />, title: 'Playlist Yêu Thích', description: 'Những bài hát tôi thường nghe', url: './MusicPlayerApp', },
        { icon: <Coffee size={24} />, title: 'Mua cho tôi một ly cà phê', description: 'Nếu bạn thấy thích', url: 'https://me.momo.vn/lDIWuWsoCaCdUOI2f6UK', },
        //{ icon: <BookOpen size={24} />, title: 'Blog mới nhất', description: 'Đọc những bài viết gần đây của tôi', url: '#', },
    ];

    const featuredProjects = [
        //{ title: 'Dự Án 1', description: 'Mô tả dự án 1', link: '#', image: 'https://placehold.co/600x400' },
        //{ title: 'Dự Án 2', description: 'Mô tả dự án 2', link: '#', image: 'https://placehold.co/600x400' }
    ];

    const featuredProducts = [
        { title: 'AI chatbot Vega', description: 'VEGA là một trợ lý AI được phát triển bởi Mình, dựa trên mô hình ngôn ngữ Gemini Pro và Gemini Pro Vision của Google. Mục đích của VEGA là cung cấp thông tin, hỗ trợ và trò chuyện với người một cách thân thiện và hữu ích', link: 'https://namtran592005.github.io/VEGA-AI/', image: [ProjectOne] },
        //{ title: 'Sản Phẩm 2', description: 'Mô tả sản phẩm 2', link: '#', image: 'https://placehold.co/600x400' }
    ];

    // --- Framer Motion Variants ---
    const socialLinksVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const socialLinkVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
    };

    const tabButtonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } },
        active: { scale: 1.1, transition: { duration: 0.2 } }
    };

      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    // --- Main Component Return ---
    if (isLoading) {
        return (
            <div className="loading-screen" role="status">
                <span className="sr-only">Đang tải</span>
                <div className="loading-text">ĐANG TẢI</div>
            </div>
        );
    }

    return (
        <div className={`page-container ${cursorVariant === "link" ? "link-cursor" : ""} ${darkMode ? "dark" : ""}`}>
            <canvas ref={backgroundRef} className="background-canvas" />

            {/* Dark Mode Toggle */}
            <button
                className="dark-mode-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
            >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <header className="page-header">
                {/* ... (Avatar, Name, Username, Bio - Giữ nguyên) ... */}
                 <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="avatar-container"
                    aria-hidden="true"
                >
                    <img
                        src={yourAvatar}
                        alt="Ảnh đại diện của Nam Trần"
                        className="avatar"
                        width={128}
                        height={128}
                        loading="lazy"
                    />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="name"
                >
                    Nam Trần
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="username"
                >
                    @Namtran5905
                </motion.p>
                <p className="bio">
                    Developer • Part-timer • Chillguy
                </p>
                <motion.div
                    className="social-links"
                    role="group"
                    aria-label="Liên kết mạng xã hội"
                    variants={socialLinksVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={link.label}
                            variants={socialLinkVariants}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </header>

            <nav className="tab-navigation">
                 <ul className="tab-list" role="tablist">
                    <li role="presentation">
                        <motion.button
                            onClick={() => setActiveTab('links')}
                            className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
                            variants={tabButtonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeTab === 'links' ? "active" : "initial"}
                            role="tab"
                            aria-selected={activeTab === 'links'}
                            aria-controls="links-panel"
                            id="links-tab"
                        >
                            Liên Kết
                        </motion.button>
                    </li>
                    <li role="presentation">
                        <motion.button
                            onClick={() => setActiveTab('about')}
                            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
                             variants={tabButtonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeTab === 'about' ? "active" : "initial"}
                            role="tab"
                            aria-selected={activeTab === 'about'}
                            aria-controls="about-panel"
                            id="about-tab"
                        >
                            Giới Thiệu
                        </motion.button>
                    </li>
                    <li role="presentation">
                        <motion.button
                            onClick={() => setActiveTab('projects')}
                            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                            variants={tabButtonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeTab === 'projects' ? "active" : "initial"}
                            role="tab"
                            aria-selected={activeTab === 'projects'}
                            aria-controls="projects-panel"
                            id="projects-tab"
                        >
                            Dự Án
                        </motion.button>
                    </li>
                    <li role="presentation">
                         <motion.button
                            onClick={() => setActiveTab('products')}
                            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                            variants={tabButtonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeTab === 'products' ? "active" : "initial"}
                            role="tab"
                            aria-selected={activeTab === 'products'}
                            aria-controls="products-panel"
                            id="products-tab"
                        >
                            Sản Phẩm
                        </motion.button>
                    </li>
                     {/* Contact Tab */}
                     <li role="presentation">
                        <motion.button
                            onClick={() => setActiveTab('contact')}
                            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                            variants={tabButtonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={activeTab === 'contact' ? 'active' : 'initial'}
                            role="tab"
                            aria-selected={activeTab === 'contact'}
                            aria-controls="contact-panel"
                            id="contact-tab"
                        >
                            Liên Hệ
                        </motion.button>
                    </li>
                </ul>
            </nav>

            <main className="main-content" ref={mainContentRef}>
                <AnimatePresence mode="wait">
                    {/* --- Links Section --- */}
                    {activeTab === 'links' && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <LinkCards quickLinks={quickLinks} setCursorVariant={setCursorVariant} />
                        </Suspense>
                    )}

                      {/* --- About Section --- */}
                    {activeTab === 'about' && (
                         <Suspense fallback={<div>Loading...</div>}>
                            <AboutSection />
                        </Suspense>
                    )}

                      {/* --- Projects Section --- */}
                    {activeTab === 'projects' && (
                       <Suspense fallback={<div>Loading...</div>}>
                           <ProjectCards featuredProjects={featuredProjects} />
                       </Suspense>
                    )}

                       {/* --- Products Section --- */}
                    {activeTab === 'products' && (
                         <Suspense fallback={<div>Loading...</div>}>
                            <ProductCards featuredProducts={featuredProducts} />
                        </Suspense>
                    )}
                      {/* --- Contact Section --- */}
                    {activeTab === 'contact' && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <div className="contact-section">
                                <div className='form-container'>
                                    <ContactForm />
                                    <AnonymousFeedbackForm />
                                </div>
                            </div>
                        </Suspense>
                    )}
                </AnimatePresence>
            </main>

            <footer className="page-footer">
                <p>© {new Date().getFullYear()} Trần Võ Hoàng Nam. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PersonalLandingPage;