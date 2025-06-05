"use client";
import { useState, useRef, useEffect } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import { clsx } from "clsx";
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";
import { chatCompletion } from "@/actions";

export default function Chatbot() {
  const chatContainerRef = useRef(null);
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Xin chào,tôi có thể giúp gì cho bạn?" },
  ]);

  // Scroll to the bottom when messages changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    console.log("USER MESSAGE", userMessage);

    if (!userMessage) return;

    // Create new message object
    const newMessage = { role: "user", content: userMessage };
    console.log("NEW MESSAGE", newMessage);

    // Update the message state
    setMessages((prevMessage) => [...prevMessage, newMessage]);

    // set loading to true and clear input text
    setLoading(true);
    setUserMessage("");

    // Request to OPENAI
    try {
      // copy of messages
      const chatMessages = messages.slice(1);
      console.log("CHAT MESSAGES", chatMessages);

       const userId = localStorage.getItem("id"); 

      // Call the chat completion API
      const res = await chatCompletion([...chatMessages, newMessage], userId);

      setMessages((prevMessages) => [...prevMessages, res]);
    } catch (error) {
      console.log("API Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TbMessageChatbot
        size={64}
        onClick={() => setShowChat(!showChat)}
        className={clsx(
          "text-[#062D76] fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer hover:text-blue-400 z-50",
          {
            'animate-bounce': !showChat
          },
        )}
      />

      {showChat && (
        <div className="fixed right-12 bottom-[calc(4rem+1.5rem)] border hover:cursor-pointer pb-1  shadow-md shadow-white h-[474px] w-[500px] bg-white rounded-md z-50">
          <div className="flex flex-col h-full">
            {/* CHAT HEADER  */}
            <div className="bg-[#062D76] text-white flex items-center justify-between p-3 rounded-t-md">
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
              <p>ReadHub</p>
            </div>

            {/* CHAT CONTAINER  */}
            <div
              ref={chatContainerRef}
              className="flex flex-col flex-1 items-center p-3 mt-5 overflow-y-auto"
            >
              {messages &&
                messages.map((m, i) => {
                  return m.role === "assistant" ? (
                    <BotMessage {...m} key={i} />
                  ) : (
                    <UserMessage {...m} key={i} />
                  );
                })}

              {loading && (
                <div className="text-center text-gray-500 mt-2">loading...</div>
              )}
            </div>

            {/* MESSAGE INPUT  */}
            <ChatInput
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
}