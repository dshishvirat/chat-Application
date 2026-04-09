import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `https://chatapp-backend-qgs2.onrender.com/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      dispatch(setMessages([...messages, res.data.newMessage]));
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-2">
      <div className="flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type message..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
        />
        <button type="submit" className="p-2 bg-blue-500 rounded-lg">
          <IoSend />
        </button>
      </div>
    </form>
  )
}

export default SendInput;