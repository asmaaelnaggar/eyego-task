"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); 
    } else {
      setIsAuth(true); 
    }
  }, [router]);

  if (!isAuth) return null; 

  return <>{children}</>;
}