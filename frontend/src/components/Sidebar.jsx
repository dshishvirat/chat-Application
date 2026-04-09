import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers, selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div
      className={`${selectedUser ? "hidden sm:flex" : "flex"} 
      w-full sm:w-[300px] h-full border-r border-white/10 p-4 flex-col backdrop-blur-lg`}
      style={{ background: "rgba(51, 65, 85, 0.75)" }}
    >
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md flex-1 min-w-0"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-700 text-white px-3">
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      <div className="divider px-3"></div>

      <OtherUsers />

      <div className="mt-4">
        <button onClick={logoutHandler} className="btn btn-sm w-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;