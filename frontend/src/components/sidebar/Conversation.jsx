import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../contexts/SocketContext";
import { MdVerified } from "react-icons/md";


const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);



  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-slate-500 rounded p-2 py-1 cursor-pointer ${isSelected && "bg-slate-700"
          }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row gap-3 justify-between">
            <p className="font-bold flex justify-evenly items-center text-blue-200">
              {conversation.username}{" "}
              {conversation.username == "FurkanGulabi" ? (
                <div className="badge text-red-400 ml-2">Admin</div>
              ) : null}
              {conversation.isVerified ? conversation.username == "FurkanGulabi" ? null : <MdVerified className="ml-1" /> : null}
            </p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
