'use client'
import { useUserStore } from '@/store/useUser.Store';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const Provider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const { setUserDetail} = useUserStore()
    console.log("user", user);

    const verifyUser = async () => {
      const res = await fetch("/api/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
        }),
      });
      const data = await res.json();
      console.log("data", data.user);
      setUserDetail(data.user)
      
    };

    useEffect(() => {
      user && verifyUser();
    }, [user]);

  return (
    <div>{children}</div>
  )
}

export default Provider