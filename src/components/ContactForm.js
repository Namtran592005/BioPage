import React, { useState } from 'react';
import { User, Mail, Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitMessageClass, setSubmitMessageClass] = useState(''); // Thêm class

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitMessageClass('');

        try {
            const response = await fetch('https://formspree.io/f/xgvoqzgz', { // Thay bằng endpoint của Formspree
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitMessage('Tin nhắn đã được gửi thành công!');
                setSubmitMessageClass('success'); // Thêm class
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                setSubmitMessage(errorData.error || 'Có lỗi xảy ra. Vui lòng thử lại sau.'); // Hiện lỗi từ Formspree
                setSubmitMessageClass('error'); // Thêm class
            }
        } catch (error) {
            console.error("Lỗi khi gửi form:", error);
            setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
            setSubmitMessageClass('error'); // Thêm class
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Liên Hệ</h3>
            <div className="form-group">
                <label htmlFor="name">Tên của bạn:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên của bạn"
                    aria-label="Tên"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email của bạn:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Nhập email của bạn"
                    aria-label="Email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Tin nhắn:</label>
                <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Nhập tin nhắn của bạn"
                    aria-label="Tin nhắn"
                />
            </div>
            <button key="submit-button" type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : <>Gửi <Send size={16} /></>}

            </button>
            {submitMessage && <p className={`submit-message ${submitMessageClass}`}>{submitMessage}</p>}
        </form>
    );
};

export default ContactForm;