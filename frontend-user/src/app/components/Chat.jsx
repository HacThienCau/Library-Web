
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function Chatbox() {
    useEffect(() => {
		createChat({
			
            webhookUrl: 'https://wynly.app.n8n.cloud/webhook/85e2be91-db1e-4aa1-bcc6-75152219bda5/chat',
            initialMessages: [
                'Xin chào! 👋',
                'Tôi là trợ lý ảo. Tôi có thể giúp gì cho bạn hôm nay?'
            ],
            i18n: {
                en: {
                    title: 'Welcome! 👋',
                    subtitle: "Bắt đầu cuộc trò chuyện. Chúng tôi luôn sẵn sàng hỗ trợ 24/7.",
                    footer: '',
                    getStarted: 'Bắt đầu cuộc trò chuyện mới',
                    inputPlaceholder: 'Nhập câu hỏi của bạn...',
                },
            },
            language: 'vi', // sử dụng tiếng Việt làm mặc định
            
		});
	}, []);

	return (<div></div>);
}
