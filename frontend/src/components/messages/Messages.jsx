import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading ? (
        messages.map((message, index) => (
          <div key={message._id || index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <span className="loading loading-spinner" />
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center">Mesaj göndererek konuşmayı başlatın</p>
      )}
    </div>
  );
};

export default Messages;
