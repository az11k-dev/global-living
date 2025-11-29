import Image from "next/image";
import {Search, User} from "lucide-react";
import Link from "next/link";

const navItems = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Countries",
        link: "/countries",
    },
    {
        id: 3,
        name: "Cities",
        link: "/cities",
    },
    {
        id: 4,
        name: "AI Center",
        link: "/ai-center",
    }
]

export default function Navbar() {
    return (
        <nav className="h-20 w-full flex items-center justify-between px-24 fixed z-999 bg-white">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href={"/"}>
                    <Image
                        src="/images/second-logo.jpg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-lg cursor-pointer"
                    />
                </Link>
                <h1 className="text-xl font-bold text-black">
                    Global <span className={"text-blue-500"}>Living</span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-5 text-base text-gray-500 font-medium">
                {navItems.map(item => (
                    <Link href={item?.link}
                          key={item.id}
                          className="cursor-pointer transition-colors hover:text-blue-500"
                    >
                        {item?.name}
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">
                <div className="bg-gray-50 h-10 border border-gray-200 rounded-3xl px-3 flex items-center">
                    <Search size={20} className="text-gray-500"/>
                    <input
                        className="outline-none px-2 text-blue-500 bg-transparent"
                        placeholder="Search country or city..."
                        type="text"
                    />
                </div>

                <User className="cursor-pointer text-gray-500"/>

                <button
                    className="text-white rounded-3xl bg-blue-500 px-5 py-2 hover:bg-blue-600 transition cursor-pointer">
                    Sign Up
                </button>
            </div>
        </nav>
    );
}