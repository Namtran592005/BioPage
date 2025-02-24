import React, { useState, useEffect } from 'react';
import yourAvatar from './img/Avt/Avatar.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Facebook, Instagram, Music,
  Coffee, Globe, BookOpen, ExternalLink, MessageCircle, Heart, Loader2, Sun, Moon,
} from 'lucide-react';
import { FaThreads } from 'react-icons/fa6';
import { SiZalo } from "react-icons/si";
import './PersonalLandingPage.css';
import Product1 from "./img/Product/Product1.jpg";

import securityCert1 from './img/certs/cert1.png';
import securityCert2 from './img/certs/cert2.png';
import securityCert3 from './img/certs/cert3.png';

const PersonalLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('links');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [visitorCount, setVisitorCount] = useState(0);
    const [ipv4, setIpv4] = useState('');
    const [ipv6, setIpv6] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [connectionData, setConnectionData] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('loading');

    useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);

        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);

        const incrementVisitorCount = () => {
            const storedCount = localStorage.getItem('visitorCount');
            let newCount;
            if (storedCount) {
                newCount = parseInt(storedCount, 10) + 1;
            } else {
                newCount = 1;
            }
            setVisitorCount(newCount);
            localStorage.setItem('visitorCount', newCount.toString());
        };

        incrementVisitorCount();

        const getIPs = async () => {
            try {
                const responseV4 = await fetch('https://api.ipify.org?format=json');
                const dataV4 = await responseV4.json();
                setIpv4(dataV4.ip);

                const responseV6 = await fetch('https://api6.ipify.org?format=json');
                const dataV6 = await responseV6.json();
                setIpv6(dataV6.ip);

            } catch (error) {
                console.error("Error fetching IP addresses:", error);
                setIpv4('Error');
                setIpv6('Error');
            }
        };

        getIPs();

        return () => {
            clearTimeout(loadingTimeout);
            document.body.classList.remove('dark-mode', 'light-mode');
        };
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleConnectionCheckClick = async () => {
        setIsModalOpen(true);
        setConnectionStatus('loading');
        setConnectionData(null);

        try {
            const pingStartTime = Date.now();
            const pingResponse = await fetch('https://www.google.com', { mode: 'no-cors' });
            const pingEndTime = Date.now();
            const ping = pingEndTime - pingStartTime;

            const dnsResponse = await fetch('https://cloudflare-dns.com/dns-query?name=example.com&type=A', {
                headers: { 'accept': 'application/dns-json' }
            });
            const dnsData = await dnsResponse.json();
            const dnsLookupTime = dnsData.Answer ? dnsData.Answer[0].TTL : null;

            const ipInfoResponse = await fetch(`https://ipinfo.io/${ipv4}/json?token=b8170cac7bafc5`);
            const ipInfoData = await ipInfoResponse.json();
            const asName = ipInfoData.org ? ipInfoData.org.split(' ')[1] : 'Unknown';
            const asNumber = ipInfoData.org ? ipInfoData.org.split(' ')[0] : 'Unknown';

          const supportsDoH = 'dns' in navigator;

          const usingTLS = window.location.protocol === 'https:';

          const vpnStatus = 'Unknown';


            setConnectionData({
                ip: ipv4,
                ping,
                dnsLookupTime,
                asName,
                asNumber,
                supportsDoH,
                usingTLS,
                vpnStatus,
            });

            let securityRating = 'green';
            if (!usingTLS) {
              securityRating = 'red';
            } else if (ping > 500) {
              securityRating = 'yellow';
            } else if(vpnStatus === 'Unknown'){
                securityRating = 'orange'
            }

            setConnectionStatus('success');
             setConnectionData(prevData => ({ ...prevData, securityRating }));

        } catch (error) {
            console.error("Error fetching connection data:", error);
            setConnectionStatus('error');
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
      };

    const socialLinks = [
        { icon: <Facebook size={24} />, url: 'https://facebook.com/namtran5905', label: 'Facebook' },
        { icon: <Instagram size={24} />, url: 'https://instagram.com/namtran5905', label: 'Instagram' },
        { icon: <Github size={24} />, url: 'https://github.com/namtran592005', label: 'GitHub' },
        { icon: <FaThreads size={24} />, url: 'https://threads.net/namtran5905', label: 'Threads' },
        { icon: <SiZalo size={24} />, url: 'https://zaloapp.com/qr/p/1re1dklrzok69?src=qr', label: 'Zalo' },
        { icon: <Heart size={24} />, url: 'https://locket.cam/Namtran5905', label: 'Locket' }
    ];

    const quickLinks = [
        { icon: <Globe size={24} />, title: 'Website Chính Thức', description: 'Khám phá portfolio và blog của tôi', url: '#' },
        { icon: <Music size={24} />, title: 'Playlist Yêu Thích', description: 'Những bài hát tôi thường nghe', url: '#' },
        { icon: <Coffee size={24} />, title: 'Mua cho tôi một ly cà phê', description: 'Nếu bạn thấy thích', url: 'https://me.momo.vn/lDIWuWsoCaCdUOI2f6UK' },
        { icon: <BookOpen size={24} />, title: 'Blog mới nhất', description: 'Đọc những bài viết gần đây của tôi', url: '#' },
    ];

    const handlePlaceholderLinkClick = (e) => {
        e.preventDefault();
        alert("Liên kết này chưa được thêm vào. Vui lòng thử lại sau!");
    };

    const featuredProjects = [
        // { title: 'Dự Án 1', description: 'Mô tả dự án 1', link: '#', image: 'https://placehold.co/600x400' },
        // { title: 'Dự Án 2', description: 'Mô tả dự án 2', link: '#', image: 'https://placehold.co/600x400' }
    ];

    const featuredProducts = [
        { title: 'Vega', description: 'Chatbot AI dựa trên API gemini', link: 'https://namtran592005.github.io/VEGA-AI/', image: Product1 },
        // { title: 'Sản Phẩm 2', description: 'Mô tả sản phẩm 2', link: '#', image: 'https://placehold.co/600x400' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError('');

        try {
            const response = await fetch("https://formspree.io/f/xeoewngj", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setMessage('');
            } else {
                const errorData = await response.json();
                setSubmitError(errorData.error || 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } catch (error) {
            setSubmitError('Đã xảy ra lỗi kết nối. Vui lòng kiểm tra kết nối mạng của bạn.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-text">ĐANG TẢI</div>
            </div>
        );
    }

    return (
        <div className={`page-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="geometric-bg"></div>
            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle Theme">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <header className="page-header">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="avatar-container"
                >
                    <img
                        src={yourAvatar}
                        alt="Avatar"
                        className="avatar"
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
                <div className="social-links">
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={link.label}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>
            </header>

            <nav className="tab-navigation">
                <ul className="tab-list">
                    <li>
                        <motion.button
                            onClick={() => setActiveTab('links')}
                            className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-selected={activeTab === 'links'}
                        >
                            Liên Kết
                        </motion.button>
                    </li>
                    <li>
                        <motion.button
                            onClick={() => setActiveTab('about')}
                            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-selected={activeTab === 'about'}
                        >
                            Giới Thiệu
                        </motion.button>
                    </li>
                    <li>
                        {/* Projects tab (optional) */}
                    </li>
                    <li>
                        <motion.button
                            onClick={() => setActiveTab('products')}
                            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-selected={activeTab === 'products'}
                        >
                            Sản Phẩm
                        </motion.button>
                    </li>
                    <li>
                        <motion.button
                            onClick={() => setActiveTab('contact')}
                            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-selected={activeTab === 'contact'}
                        >
                            Liên Hệ
                        </motion.button>
                    </li>
                </ul>
            </nav>

            <main className="main-content">
                <AnimatePresence mode="wait">
                    {activeTab === 'links' && (
                        <motion.div
                            key="links"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="link-cards"
                        >
                            {quickLinks.map((link) => (
                                <motion.a
                                    key={link.title}
                                    href={link.url}
                                    onClick={link.url === '#' ? handlePlaceholderLinkClick : undefined}
                                    target={link.url !== '#' ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="link-card"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="link-card-icon">{link.icon}</div>
                                    <div className="link-card-text">
                                        <h3 className="link-card-title">{link.title}</h3>
                                        <p className="link-card-description">{link.description}</p>
                                    </div>
                                    <ExternalLink size={20} className="link-card-external-link" />
                                </motion.a>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="about-section"
                        >
                            <div className="about-content">
                                <h2 className="about-title">Về mình</h2>
                                <p className="about-text">
                                    Xin chào! Mình là Nam Trần là một người bình thường và làm việc bán thời gian.
                                    Mình khá thích về công nghệ, thiết kế và việc tạo ra những sản phẩm có này nọ vui vui trong thời gian rãnh rỗi.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="project-cards"
                        >
                            {featuredProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="project-card"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="project-card-image-container">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-card-image"
                                        />
                                        <div className="project-card-overlay">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-card-link"
                                            >
                                                <span>Xem Chi Tiết</span>
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="project-card-content">
                                        <h3 className="project-card-title">{project.title}</h3>
                                        <p className="project-card-description">{project.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="project-cards"
                        >
                            {featuredProducts.map((product, index) => (
                                <motion.div
                                    key={index}
                                    className="project-card"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="project-card-image-container">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="project-card-image"
                                        />
                                        <div className="project-card-overlay">
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-card-link"
                                            >
                                                <span>Xem Chi Tiết</span>
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="project-card-content">
                                        <h3 className="project-card-title">{product.title}</h3>
                                        <p className="project-card-description">{product.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'contact' && (
                         <motion.div
                            key="contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="contact-section"
                        >
                            <h2 className="contact-title">Liên Hệ</h2>
                            <p className="contact-description">
                                Bạn có thể gửi tin nhắn ẩn danh cho mình thông qua form bên dưới.
                            </p>
                            <motion.form
                                onSubmit={handleSubmit}
                                className="contact-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn của bạn..."
                                    required
                                    className="contact-textarea"
                                ></textarea>

                                <motion.button
                                    type="submit"
                                    className="contact-submit-button"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={16} className="animate-spin mr-2" />ㅤĐang gửi...</>
                                    ) : (
                                        "Gửi Tin Nhắn"
                                    )}
                                </motion.button>
                                    {submitSuccess && (
                                        <div className="contact-success-message">
                                            Tin nhắn của bạn đã được gửi thành công!
                                        </div>
                                    )}
                                    {submitError && (
                                        <div className="contact-error-message">
                                            {submitError}
                                        </div>
                                    )}
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="page-footer">
                <div className="footer-left">
                    <p>
                        IPv4: <span>{ipv4 || 'Loading...'}</span> |  <span className="visitor-count">Lượt truy cập: <span>{visitorCount}</span> </span>
                    </p>
                    <p>IPv6: <span>{ipv6 || 'Loading...'}</span></p>
                </div>
                <div className="footer-center">
                    <p>© {new Date().getFullYear()} Trần Võ Hoàng Nam. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <button className="connection-check-button" onClick={handleConnectionCheckClick}>
                        Check Connection
                    </button>
                    <div className="security-certs">
                        <img src={securityCert1} alt="Security Certificate 1" className="cert-logo" />
                        <img src={securityCert2} alt="Security Certificate 2" className="cert-logo" />
                        <img src={securityCert3} alt="Security Certificate 3" className="cert-logo" />
                    </div>
                </div>
            </footer>

             <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                <motion.div
                  className="modal-content"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close-button" onClick={closeModal}>
                    ×
                  </button>
                  <h2>Connection Details</h2>
                  <div className="connection-info">
                    {connectionStatus === 'loading' && <p>Loading...</p>}
                    {connectionStatus === 'error' && <p>Error fetching data.</p>}
                    {connectionStatus === 'success' && connectionData && (
                      <>
                        <p>IP Address: {connectionData.ip}</p>
                        <p>Ping: {connectionData.ping} ms</p>
                        <p>DNS Lookup Time: {connectionData.dnsLookupTime} ms</p>
                        <p>AS Name: {connectionData.asName}</p>
                        <p>AS Number: {connectionData.asNumber}</p>
                        <p>Supports DoH: {connectionData.supportsDoH ? 'Yes' : 'No'}</p>
                        <p>Using TLS: {connectionData.usingTLS ? 'Yes' : 'No'}</p>
                         <p>VPN/WARP: {connectionData.vpnStatus}</p>
                        <p>Security Rating: <span className={`security-rating ${connectionData.securityRating}`}>{connectionData.securityRating}</span></p>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>

            <div className="leaves-container"></div>
        </div>
    );
};

export default PersonalLandingPage;