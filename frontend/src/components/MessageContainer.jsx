import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser ? (
        <div
          className="flex-1 flex flex-col h-full backdrop-blur-lg"
          style={{ background: "rgba(51, 65, 85, 0.75)" }}
        >
          <div className="flex items-center gap-2 bg-slate-900/80 text-white px-4 py-2">
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="sm:hidden text-xl"
            >
              ←
            </button>

            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user" />
              </div>
            </div>

            <p className="font-semibold">{selectedUser?.fullName}</p>
          </div>

          <Messages />

          <SendInput />
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 flex-col justify-center items-center">
          <h1 className="text-3xl text-white font-bold">
            Hi, {authUser?.fullName} 👋
          </h1>
          <p className="text-white">Select a user to start chat</p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
