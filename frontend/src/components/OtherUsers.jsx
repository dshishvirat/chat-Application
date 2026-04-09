import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUsers = () => {
   
    useGetOtherUsers();

    const { otherUsers, onlineUsers } = useSelector(store => store.user);

    if (!otherUsers) return;

  
    const sortedUsers = [...otherUsers].sort((a, b) => {
        const aOnline = onlineUsers?.includes(a._id);
        const bOnline = onlineUsers?.includes(b._id);

        return bOnline - aOnline;
    });

    return (
        <div className='overflow-auto flex-1'>
            {
                sortedUsers.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            }
        </div>
    )
}

export default OtherUsers;