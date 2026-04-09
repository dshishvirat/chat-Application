import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <div className="h-screen w-full flex flex-col sm:flex-row overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage;