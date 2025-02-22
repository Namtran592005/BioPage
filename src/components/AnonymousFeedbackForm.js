import React, { useState } from 'react';
import { Send } from 'lucide-react';

const AnonymousFeedbackForm = () => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitMessageClass, setSubmitMessageClass] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setSubmitMessage('Vui lòng nhập nội dung tin nhắn.');
            setSubmitMessageClass('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitMessageClass('');

        try {
            const response = await fetch('https://formspree.io/f/xvgzyqev', { // Thay bằng endpoint của Formspree
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }), // Chỉ gửi tin nhắn
            });

            if (response.ok) {
                setSubmitMessage('Cảm ơn bạn đã gửi phản hồi!');
                setSubmitMessageClass('success');
                setMessage('');
            } else {
               const errorData = await response.json();
                setSubmitMessage(errorData.error || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
                setSubmitMessageClass('error');
            }
        } catch (error) {
            console.error("Lỗi khi gửi phản hồi:", error);
            setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            setSubmitMessageClass('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="anonymous-feedback-form" onSubmit={handleSubmit}>
            <h3>Phản Hồi Ẩn Danh</h3>
            <div className="form-group">
                <label htmlFor="anonymous-message">Tin nhắn:</label>
                <textarea
                    id="anonymous-message"
                    name="message"
                    className="form-control"
                    value={message}
                    onChange={handleChange}
                    placeholder="Nhập nội dung phản hồi của bạn (ẩn danh)"
                    aria-label="Tin nhắn ẩn danh"
                    rows="5"
                />
            </div>
            <button key="submit-button-2" type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : <>Gửi <Send size={16} /></>}
            </button>
            {submitMessage && <p className={`submit-message ${submitMessageClass}`}>{submitMessage}</p>}
        </form>
    );
};

export default AnonymousFeedbackForm;