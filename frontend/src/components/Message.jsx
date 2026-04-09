import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${message?.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full">
          <img
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
            alt="user"
          />
        </div>
      </div>

      <div
        className={`chat-bubble ${
          message?.senderId === authUser?._id
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
