"use client";

import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    "👋 Xin chào! Bạn cần giúp gì về phòng trọ?",
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = `👤 ${input}`;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/achatbot", { message: input });
      setMessages((prev) => [...prev, `🤖 ${res.data.reply}`]);
    } catch (err: any) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        "❌ Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white border rounded-xl shadow-lg w-[300px] p-3 space-y-2 text-black">
      <div className="h-[200px] overflow-y-auto text-sm">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1 whitespace-pre-line">
            {msg}
          </div>
        ))}
        {loading && (
          <div className="italic text-gray-500">🤖 Đang trả lời...</div>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          className="border p-1 rounded flex-1 text-xs"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
