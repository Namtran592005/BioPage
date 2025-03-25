import React, { useState, useEffect, useRef } from 'react';
import yourAvatar from './img/Avt/Avatar.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Facebook, Instagram, Music,
  Coffee, Globe, BookOpen, ExternalLink, Heart, Loader2, Sun, Moon, Phone, Mail, MapPin, User, Play, Pause, ChevronLeft, ChevronRight
} from 'lucide-react';
import { FaThreads, FaTiktok } from 'react-icons/fa6';
import { SiZalo, SiTelegram } from "react-icons/si";
import './PersonalLandingPage.css';
import Product1 from "./img/Product/Product1.jpg";
import Product2 from "./img/Product/Product2.jpg";
import Product3 from "./img/Product/Product3.jpg";

import securityCert1 from './img/certs/cert1.png';
import securityCert2 from './img/certs/cert2.png';
import securityCert3 from './img/certs/cert3.png';

// Import music and thumbnails *here*
import music1 from './music/Swim.mp3';
import music2 from './music/Cohenvoithanhxuan.flac';
import music3 from './music/Sunghiepchuong.mp3'
import music4 from './music/Thinkaboutu.mp3'
import thumbnail1 from './music/Swim.jpg';
import thumbnail2 from './music/Cohenvoithanhxuan.jpg';
import thumbnail3 from './music/Sunghiepchuong.jpg';
import thumbnail4 from './music/Thinkaboutu.jpg';


// Playlist array now uses the imported variables
const playlist = [
  {
    title: "Swim",
    file: music1, // Use the imported variable
    thumbnail: thumbnail1 // Use the imported variable
  },
  {
    title: "có hẹn với thanh xuân",
    file: music2,
    thumbnail: thumbnail2
  },
  {
    title: "Think About U",
    file: music4,
    thumbnail: thumbnail4
  },
  {
    title: "Sự nghiệp chướng",
    file: music3,
    thumbnail: thumbnail3
  }
];

const PersonalLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('links');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [visitorCount, setVisitorCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [connectionData, setConnectionData] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('loading');
    const [shapes, setShapes] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio()); // Keep the ref

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(playlist[currentTrackIndex]);


      useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);

        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);

        const incrementVisitorCount = () => {
          const storedCount = localStorage.getItem('visitorCount');
          const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
          setVisitorCount(newCount);
          localStorage.setItem('visitorCount', newCount.toString());
        };
        incrementVisitorCount();

        const generateShapes = () => {
          const numShapes = 30;
          const animations = ['pulse-and-move', 'rotate-and-scale', 'move-up-down', 'rotate-and-move'];
          const newShapes = Array.from({ length: numShapes }, (_, i) => ({
            id: i,
            size: Math.random() * 80 + 20,
            top: Math.random() * 100,
            left: Math.random() * 100,
            animation: animations[Math.floor(Math.random() * animations.length)],
            delay: Math.random() * 5,
            shapeType: Math.random() < 0.5 ? 'circle' : 'rectangle',
          }));
          setShapes(newShapes);
        };
        generateShapes();

        // Set the audio source directly from currentTrack.file
        audioRef.current.src = currentTrack.file;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        if (isPlaying) {
            audioRef.current.play().catch(error => console.warn("Audio play failed:", error));
        }

        return () => {
            clearTimeout(loadingTimeout);
            document.body.classList.remove('dark-mode', 'light-mode');
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [isDarkMode, isPlaying, currentTrack]); // currentTrack is in the dependency array

    const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

       const handleConnectionCheckClick = async () => {
      setIsModalOpen(true);
      setConnectionStatus('loading');
      setConnectionData(null);

      try {
        const ipInfoResponse = await fetch(`https://ipinfo.io/json?token=b8170cac7bafc5`);
        const ipInfoData = await ipInfoResponse.json();
        const responseV4 = await fetch('https://api.ipify.org?format=json');
        const dataV4 = await responseV4.json();
        const ipv4 = dataV4.ip;
        const pingStartTime = Date.now();
        const pingResponse = await fetch(window.location.href, { mode: 'no-cors', cache: 'no-store' });
        const pingEndTime = Date.now();
        const ping = pingEndTime - pingStartTime;
        const dnsResponse = await fetch('https://cloudflare-dns.com/dns-query?name=example.com&type=A', { headers: { 'accept': 'application/dns-json' } });
        const dnsData = await dnsResponse.json();
        const dnsLookupTime = dnsData.Answer ? dnsData.Answer[0].TTL : null;
        const asName = ipInfoData.org ? ipInfoData.org.split(' ')[1] : 'Unknown';
        const asNumber = ipInfoData.org ? ipInfoData.org.split(' ')[0] : 'Unknown';
        const supportsDoH = 'dns' in navigator;
        const usingTLS = window.location.protocol === 'https:';

        const getGeoLocation = () => new Promise((resolve, reject) => {
          navigator.geolocation ? navigator.geolocation.getCurrentPosition(resolve, reject) : reject('Geolocation is not supported by your browser');
        });

        let latitude = null;
        let longitude = null;
        try {
          const position = await getGeoLocation();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch (geoError) { console.warn("Geolocation error:", geoError) }

        setConnectionData({ ip: ipv4, ping, dnsLookupTime, asName, asNumber, supportsDoH, usingTLS, city: ipInfoData.city || 'Unknown', region: ipInfoData.region || 'Unknown', country: ipInfoData.country || 'Unknown', loc: ipInfoData.loc || 'Unknown', latitude, longitude, });
        setConnectionStatus('success');
        setConnectionData(prevData => ({ ...prevData, securityRating: !usingTLS ? 'red' : ping > 200 ? 'yellow' : 'green' }));
      } catch (error) {
        console.error("Error fetching connection data:", error);
        setConnectionStatus('error');
      }
    };

    const closeModal = () => setIsModalOpen(false);

    const socialLinks = [
        { icon: <Facebook size={24} />, url: 'https://facebook.com/namtran5905', label: 'Facebook' },
        { icon: <Instagram size={24} />, url: 'https://instagram.com/namtran5905', label: 'Instagram' },
        { icon: <Github size={24} />, url: 'https://github.com/namtran592005', label: 'GitHub' },
        { icon: <FaThreads size={24} />, url: 'https://threads.net/namtran5905', label: 'Threads' },
        { icon: <SiZalo size={24} />, url: 'https://zaloapp.com/qr/p/1re1dklrzok69?src=qr', label: 'Zalo' },
        { icon: <Heart size={24} />, url: 'https://locket.cam/Namtran5905', label: 'Locket' },
        { icon: <FaTiktok size={24} />, url: 'https://www.tiktok.com/@namtran_5905', label: 'TikTok' },
        { icon: <SiTelegram size={24} />, url: 'https://t.me/namtran5905', label: 'Telegram' },
    ];

    const quickLinks = [
        { icon: <Globe size={24} />, title: 'Website Chính Thức', description: 'Khám phá portfolio và blog của tôi', url: '#' },
        { icon: <Music size={24} />, title: 'Playlist Yêu Thích', description: 'Những bài hát tôi thường nghe', url: '#' },
        { icon: <Coffee size={24} />, title: 'Mua cho tôi một ly cà phê', description: 'Nếu bạn thấy thích', url: 'https://me.momo.vn/lDIWuWsoCaCdUOI2f6UK' },
        { icon: <BookOpen size={24} />, title: 'Blog mới nhất', description: 'Đọc những bài viết gần đây của tôi', url: '#' },
    ];
    const handlePlaceholderLinkClick = (e) => { e.preventDefault(); alert("Liên kết này chưa được thêm vào. Vui lòng thử lại sau!"); };
    const featuredProjects = [];
    const featuredProducts = [
        { title: 'Vega', description: 'Chatbot AI dựa trên API gemini', link: 'https://namtran592005.github.io/VEGA-AI/', image: Product1 },
        { title: 'Utility Tools', description: 'Website cung cấp Tool tiện ích', link: 'https://namtran592005.github.io/Utility-Tools/', image: Product2 },
        { title: 'WealthMeter', description: 'Tính độ Giàu-Nghèo của bạn', link: 'https://namtran592005.github.io/WealthMeter/', image: Product3 }
    ];
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError('');
      try {
        const response = await fetch("https://formspree.io/f/xeoewngj", { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ message }), });

        if (response.ok) {
          setSubmitSuccess(true);
          setMessage('');
        } else {
            const errorData = await response.json();
            setSubmitError(errorData.errors && errorData.errors.length > 0  ? errorData.errors[0] : 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
      } catch (error) {
        setSubmitError('Đã xảy ra lỗi kết nối. Vui lòng kiểm tra kết nối mạng của bạn.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const playNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        setCurrentTrack(playlist[nextIndex]);
         setIsPlaying(true);

    };

    const playPreviousTrack = () => {
        const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(prevIndex);
        setCurrentTrack(playlist[prevIndex]);
        setIsPlaying(true);
    };

     const togglePlay = () => {
        setIsPlaying(!isPlaying);
        const audioElement = audioRef.current;
        if (!isPlaying) {
            audioElement.play().catch(error => console.warn("Audio play failed:", error));
        } else {
            audioElement.pause();
        }
    };


    return (
        <div className={`page-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="geometric-background">
                <div className="shapes">
                    {shapes.map((shape) => (
                        <div key={shape.id} className={shape.shapeType}
                            style={{ width: `${shape.size}px`, height: `${shape.size}px`, top: `${shape.top}vh`, left: `${shape.left}vw`, animation: `${shape.animation} ${Math.random() * 5 + 5}s ease-in-out infinite`, animationDelay: `${shape.delay}s`, }}
                        />
                    ))}
                </div>
            </div>

             <div className="music-player">
                <button onClick={playPreviousTrack} aria-label="Previous Track">
                    <ChevronLeft size={18} />
                </button>
                <button onClick={togglePlay} aria-label="Toggle Music">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={playNextTrack} aria-label="Next Track">
                    <ChevronRight size={18} />
                </button>
                <img src={currentTrack.thumbnail} alt="Music Thumbnail" className="music-thumbnail" />
                <span className="music-info">{currentTrack.title}</span>
            </div>

            {isLoading && (
                <div className="loading-screen">
                    <div className="loading-content">
                        <div className="loading-circle"><div /></div>
                        <div className="loading-text">Đang tải...</div>
                    </div>
                </div>
            )}

            <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle Theme">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <header className="page-header">
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="avatar-container">
                    <img src={yourAvatar} alt="Avatar" className="avatar" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="name">Nam Trần</motion.h1>
                <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="username">@Namtran5905</motion.p>
                <p className="bio">Developer • Part-timer • Chillguy</p>
                <div className="social-links">
                    {socialLinks.map((link) => (<motion.a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={link.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{link.icon}</motion.a>))}
                </div>
            </header>

            <nav className="tab-navigation">
                <ul className="tab-list">
                    <li><motion.button onClick={() => setActiveTab('links')} className={`tab-button ${activeTab === 'links' ? 'active' : ''}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-selected={activeTab === 'links'}>Liên Kết</motion.button></li>
                    <li><motion.button onClick={() => setActiveTab('about')} className={`tab-button ${activeTab === 'about' ? 'active' : ''}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-selected={activeTab === 'about'}>Giới Thiệu</motion.button></li>
                    <li><motion.button onClick={() => setActiveTab('products')} className={`tab-button ${activeTab === 'products' ? 'active' : ''}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-selected={activeTab === 'products'}>Sản Phẩm</motion.button></li>
                    <li><motion.button onClick={() => setActiveTab('contact')} className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-selected={activeTab === 'contact'}>Liên Hệ</motion.button></li>
                </ul>
            </nav>

            <main className="main-content">
                <AnimatePresence mode="wait">
                    {activeTab === 'links' && (
                        <motion.div key="links" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="link-cards">
                            {quickLinks.map((link) => (
                                <motion.a key={link.title} href={link.url} onClick={link.url === '#' ? handlePlaceholderLinkClick : undefined} target={link.url !== '#' ? "_blank" : undefined} rel="noopener noreferrer" className="link-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
            <div className="about-text">
                <p>
                    🌟 Xin chào! Mình là Nam Trần – ghét sự nhàm chán 😆. Làm bán thời gian, thích sáng tạo & khám phá 🎨💡. Đam mê
                    công nghệ, thiết kế, thử nghiệm đủ thứ hay ho 🎭🔧. Yêu du lịch, chill với phim, cà phê & trò chuyện ☕🎬💬. Sống
                    đơn giản: Làm điều vui, học điều cần, tận hưởng từng khoảnh khắc ✨💖.
                </p>
                <div className="personal-info-grid">
                    {/* ... (Thông tin cá nhân giữ nguyên) ... */}
                     <div className="personal-info-group">
                        <Phone size={16} className="info-icon" />
                        <span>09xxxxxx39</span>
                      </div>
                      <div className="personal-info-group">
                        <Mail size={16} className="info-icon" />
                        <span>Sointerestinggg@gmail.com</span>
                      </div>
                      <div className="personal-info-group">
                        <MapPin size={16} className="info-icon" />
                        <span>Trà Vinh, Việt Nam</span>
                      </div>
                      <div className="personal-info-group">
                        <User size={16} className="info-icon" />
                        <span>Độc Thân</span>
                      </div>
                </div>

                <div className="additional-info">
                    <h3 className="add-info">Thông tin khác</h3>
                    <div className="additional-info-grid">
                        <div className="additional-info-group">
                            <span className="info-icon">🧠</span> {/* Emoji */}
                            <span>MBTI:</span>
                            <span>INTJ</span>
                        </div>
                        <div className="additional-info-group">
                            <span className="info-icon">📏</span> {/* Emoji */}
                            <span>Chiều cao:</span>
                            <span>1m62</span>
                        </div>
                        <div className="additional-info-group">
                            <span className="info-icon">⚖️</span> {/* Emoji */}
                            <span>Cân nặng:</span>
                            <span>57kg</span>
                        </div>
                        <div className="additional-info-group">
                           <span className="info-icon">♂️</span>
                            <span>Giới tính:</span>
                            <span>Nam</span>
                        </div>
                        <div className="additional-info-group">
                          <span className="info-icon">🎂</span>
                            <span>Năm sinh:</span>
                            <span>2005</span>
                        </div>
                         <div className="additional-info-group">
                            <span className="info-icon">🔞</span>
                            <span>Tuổi:</span>
                            <span>{new Date().getFullYear() - 2005}</span>
                         </div>
                         <div className="additional-info-group">
                            <span className="info-icon">🤭</span>
                            <span>Nhu cầu:</span>
                            <span>Tìm bạn, Người yêu hoặc FWB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
)}

                    {activeTab === 'projects' && featuredProjects.length > 0 && (
                        <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="project-cards" >
                            {featuredProjects.map((project, index) => (
                                <motion.div key={index} className="project-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <div className="project-card-image-container">
                                        <img src={project.image} alt={project.title} className="project-card-image" />
                                        <div className="project-card-overlay">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                                                <span>Xem Chi Tiết</span><ExternalLink size={18} />
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
                        <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="project-cards">
                            {featuredProducts.map((product, index) => (
                                <motion.div key={index} className="project-card" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <div className="project-card-image-container">
                                        <img src={product.image} alt={product.title} className="project-card-image" />
                                        <div className="project-card-overlay">
                                            <a href={product.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                                                <span>Xem Chi Tiết</span><ExternalLink size={18} />
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
        <h2 className="contact-title">Để lại lời nhắn</h2>
        <p className="contact-description">
            Bạn có thể gửi tin nhắn ẩn danh cho mình qua form dưới đây. Mình rất mong nhận được phản hồi từ bạn!
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
            />
            <motion.button
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Đang gửi...
                    </>
                ) : (
                    "Gửi tin nhắn"
                )}
            </motion.button>

            {submitSuccess && (
                <div className="contact-success-message">
                   ✓ Tin nhắn đã gửi thành công!
                </div>
            )}
            {submitError && (
                <div className="contact-error-message">
                    ⚠ {submitError}
                </div>
            )}
        </motion.form>
    </motion.div>
)}
                </AnimatePresence>
            </main>

            <footer className="page-footer">
                <div className="footer-left">
                    <p><span className="visitor-count">Lượt truy cập: <span>{visitorCount}</span> </span></p>
                </div>
                <div className="footer-center">
                    <p>© {new Date().getFullYear()} Trần Võ Hoàng Nam. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <button className="connection-check-button" onClick={handleConnectionCheckClick}>Kết nối</button>
                    <div className="security-certs">
                        <img src={securityCert1} alt="Security Certificate 1" className="cert-logo" />
                        <img src={securityCert2} alt="Security Certificate 2" className="cert-logo" />
                        <img src={securityCert3} alt="Security Certificate 3" className="cert-logo" />
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeModal}>
                        <motion.div className="modal-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "easeInOut" }} onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-button" onClick={closeModal}>×</button>
                            <h2 className='modal-title'>Thông Tin Kết Nối</h2>
                            <div className="connection-info">
                                {connectionStatus === 'loading' && (<div className="modal-loading"><Loader2 size={24} className="animate-spin" /><p>Đang kiểm tra...</p></div>)}
                                {connectionStatus === 'error' && <p className="modal-error">Lỗi khi lấy dữ liệu.</p>}
                                {connectionStatus === 'success' && connectionData && (
                                    <div className="modal-grid">
                                        <div className="modal-data-group"><label>IPv4: </label><span>{connectionData.ip}</span></div>
                                        <div className="modal-data-group"><label>Ping: </label><span>{connectionData.ping} ms</span></div>
                                        <div className="modal-data-group"><label>DNS Lookup: </label><span>{connectionData.dnsLookupTime}s</span></div>
                                        <div className="modal-data-group"><label>AS Name: </label><span>{connectionData.asName}</span></div>
                                        <div className="modal-data-group"><label>AS Number: </label><span>{connectionData.asNumber}</span></div>
                                        <div className="modal-data-group"><label>DoH: </label><span>{connectionData.supportsDoH ? 'Có' : 'Không'}</span></div>
                                        <div className="modal-data-group"><label>TLS: </label><span>{connectionData.usingTLS ? 'Có' : 'Không'}</span></div>
                                        <div className="modal-data-group"><label>Thành phố: </label><span>{connectionData.city}</span></div>
                                        <div className="modal-data-group"><label>Vùng: </label><span>{connectionData.region}</span></div>
                                        <div className="modal-data-group"> <label>Quốc gia: </label><span>{connectionData.country}</span></div>
                                        {connectionData.latitude && connectionData.longitude ? (
                                            <div className="modal-data-group"><label>Tọa độ (GPS): </label><span>{connectionData.latitude}, {connectionData.longitude}</span></div>
                                        ) : (<div className="modal-data-group"><label>Tọa độ: </label> <span>{connectionData.loc}</span></div>)}
                                        <div className="modal-data-group"><label>Đánh giá: </label><span className={`security-rating ${connectionData.securityRating}`}>{connectionData.securityRating}</span></div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PersonalLandingPage;