
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function Chatbox() {
    useEffect(() => {
		createChat({
			 webhookUrl: 'https://librarychat.app.n8n.cloud/webhook/681dcab2-8547-46a7-8053-7e5d09df9a1b/chat',
           
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
