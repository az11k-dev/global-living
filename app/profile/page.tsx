"use client"


import {useCallback, useEffect, useState} from "react";
import {User} from "@/types";
import Image from "next/image";
import {Heart, SquarePen, UserRound} from "lucide-react";


export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/user/me`;
        try {
            const res = await fetch(url, {cache: "no-cache", headers: {"Authorization": `Bearer ${token}`}});
            if (!res.ok) throw new Error("Failed to fetch country details");
            const data: User = await res.json();
            setUser(data);
        } catch (error) {
            console.error(`Error fetching user `, error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchUser();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [fetchUser]);
    if (isLoading) {
        return <div className="p-10 text-center min-h-screen flex items-center justify-center">Loading.</div>;
    }
    if (!user) {
        return <div className="p-10 text-center text-red-600">Oops! No results found.</div>;
    }

    return (
        <div key={user?.id} className={"bg-gray-100 min-h-screen flex  flex-col gap-4 py-[40px] px-[150px] "}>
            <div className={"flex flex-col gap-2"}>
                <h1 className={"text-[30px] font-[600]"}>My Profile</h1>
                <h1 className={"text-[17px] text-gray-600"}>Manage your account information and preferences</h1>
            </div>
            <div className={"flex items-center gap-[20px]  bg-white  rounded-xl shadow-sm  cursor-pointer overflow-hidden border border-gray-100 px-[50px] py-[40px]"}>
                <div>
                    <Image src={user?.image} alt={user?.name} width={140} height={10} className={"rounded-full"}/>
                </div>
                <div className={"flex flex-col gap-3"}>
                    <h1 className={"text-[20px] font-[600]"}>{user?.name}</h1>
                    <h1 className={"text-gray-600"}>{user?.email}</h1>
                    <button className={"text-white bg-[#2563EB] rounded-xl flex justify-center gap-4 p-[10px]"}>
                        <SquarePen/>
                        <h1 className={'font-[600]'}>Edit Profile</h1>
                    </button>
                </div>
            </div>
            <div className={'flex  justify-between  gap-10'}>
                <div className={'bg-white  rounded-xl shadow-sm  cursor-pointer overflow-hidden border border-gray-100 p-[20px] w-full'}>
                    <div className="flex items-center gap-2">
                        <UserRound className={"text-[#2563EB]"}/>
                        <h1 className={"text-[20px] font-[600]"}>Personal Information</h1>
                    </div>
                    <div className={'flex flex-col gap-4'}>
                        <div className={"flex flex-col gap-2 mt-[10px] "}>
                            <label htmlFor="name">Full Name</label>
                            <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.name}</div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="name">Edit Profile</label>
                            <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.email}</div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="name">Country</label>
                            <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.country}</div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="name">City</label>
                            <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.City}</div>
                        </div>
                    </div>
                </div>
                <div className={'bg-white  rounded-xl shadow-sm  cursor-pointer overflow-hidden border border-gray-100 p-[20px] w-full'}>
                    <div className="flex items-center gap-2">
                        <Heart className={'text-[#2563EB]'}/>
                        <h1 className={"text-[20px] font-[600]"}>Preferences</h1>
                    </div>
                    <div className={"flex flex-col gap-2 mt-[10px] "}>
                        <label htmlFor="name">Interested Countries</label>
                        <div
                            className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.interestedCountries}</div>
                    </div>
                    <div className={"flex flex-col gap-2 mt-[10px] "}>
                        <label htmlFor="name">Monthly Budget Range</label>
                        <div className={' border-1 border-gray-400 p-[10px] rounded-xl'}>{user?.monthlyBudget}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}