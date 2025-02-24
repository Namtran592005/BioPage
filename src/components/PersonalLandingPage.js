// PersonalLandingPage.js
import React, { useState, useEffect } from 'react';
import yourAvatar from './img/Avt/Avatar.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Facebook, Instagram, Music,  //ShoppingBag,  //Removed ShoppingBag
  Coffee, Globe, BookOpen, ExternalLink, MessageCircle, Heart, Loader2, Sun, Moon, // Added Sun, Moon
} from 'lucide-react';
// Import icons from react-icons
import { FaThreads } from 'react-icons/fa6'; // Import from the correct subpath (Font Awesome 6)
import { SiZalo } from "react-icons/si";
import './PersonalLandingPage.css';
import Product1 from "./img/Product/Product1.jpg";

const PersonalLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('links');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true); //  Dark mode by default

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setIsLoading(false), 2000);
     // Apply the theme to the body element
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    return () => {
        clearTimeout(loadingTimeout)
        document.body.classList.remove('dark-mode', 'light-mode');
    };
  }, [isDarkMode]); // Dependency array includes isDarkMode

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode); // Toggle the mode
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
    //{ icon: <ShoppingBag size={24} />, title: 'Shop Online', description: 'Ghé thăm cửa hàng trực tuyến của tôi', url: '#' },
    { icon: <Music size={24} />, title: 'Playlist Yêu Thích', description: 'Những bài hát tôi thường nghe', url: '#' },
    { icon: <Coffee size={24} />, title: 'Mua cho tôi một ly cà phê', description: 'Nếu bạn thấy thích', url: 'https://me.momo.vn/lDIWuWsoCaCdUOI2f6UK' },
    { icon: <BookOpen size={24} />, title: 'Blog mới nhất', description: 'Đọc những bài viết gần đây của tôi', url: '#' },
  ];

    // Function to handle clicks on placeholder links
    const handlePlaceholderLinkClick = (e) => {
      e.preventDefault(); // Prevent the default link behavior
      alert("Liên kết này chưa được thêm vào. Vui lòng thử lại sau!"); // Display the message
    };

  const featuredProjects = [
    //{ title: 'Dự Án 1', description: 'Mô tả dự án 1', link: '#', image: 'https://placehold.co/600x400' },
    //{ title: 'Dự Án 2', description: 'Mô tả dự án 2', link: '#', image: 'https://placehold.co/600x400' }
  ];

  // NEW: Featured Products
  const featuredProducts = [
    { title: 'Vega', description: 'Chatbot AI dựa trên API gemini', link: 'https://namtran592005.github.io/VEGA-AI/', image: Product1 },
    //{ title: 'Sản Phẩm 2', description: 'Mô tả sản phẩm 2', link: '#', image: 'https://placehold.co/600x400' }
  ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false); // Reset success message
        setSubmitError(''); // Reset error message

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
                setMessage(''); // Clear the message input
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
        {/* Theme Toggle Button */}
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
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
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
            {/*<motion.button
              onClick={() => setActiveTab('projects')}
              className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-selected={activeTab === 'projects'}
            >
              Dự Án
            </motion.button>*/}
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
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                    onClick={link.url === '#' ? handlePlaceholderLinkClick : undefined} //  Add this line
                  target={link.url !== '#' ? "_blank" : undefined}  // Open in new tab if not placeholder
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

                    <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="contact-success-message"
                      >
                        Tin nhắn của bạn đã được gửi thành công!
                      </motion.div>
                    )}
                    </AnimatePresence>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="contact-error-message"
                        >
                            {submitError}
                        </motion.div>
                    )}

                </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="page-footer">
        <p>© {new Date().getFullYear()} Trần Võ Hoàng Nam. All rights reserved.</p>
      </footer>
        <div className="leaves-container"></div>
    </div>
  );
};

export default PersonalLandingPage;