import React from "react";
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-400 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
    </div>
  );
};

export default Sidebar;
