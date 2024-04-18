import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import { message } from "antd";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handlSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      message.error("Arama terimi en az 3 hane olmalı");
    }
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      message.error("Kullanıcı bulunamadı");
    }
  };

  return (
    <form onSubmit={handlSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Ara"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-gray-400 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
