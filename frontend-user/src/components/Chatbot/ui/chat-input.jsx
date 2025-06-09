import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

export default function ChatInput({ userMessage, setUserMessage, handleSendMessage }) {
  return (
    <div className="flex space-x-2 items-center mt-auto bg-[#EEEEEE] rounded-b-md py-1 border border-gray-200">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center w-full"
      >
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex items-center h-10 text-sm text-black justify-center w-full space-x-2 px-2 outline-none"
        />
        <button className="p-2 flex bg-none cursor-pointer" onClick={handleSendMessage}>
          <img src="/icon/Send.svg" alt="Send" />
        </button>
        {/* <button className="p-2 bg-[#062D76] text-white inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2">
          Send
        </button> */}
      </form>
    </div>
  );
}