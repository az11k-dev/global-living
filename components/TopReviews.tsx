import React from "react";
import Image from "next/image";
import img from "@/public/images/logo.png";
import { ExpandableText } from './ExpandableText';

const data = [
    {
        id: 1,
        fullName: "John Smith",
        description: "Bu yerda faqatgina bir necha so'z bor, shuning uchun 'Ko'proq o'qish' tugmasini ko'rsatishga hojat yo'q.",
        rating: 2,
        image: img,
        position: "teacher",
    },
    {
        id: 2,
        fullName:"Ricardo Alex",
        description: "Bu sharh juda uzun matnga ega. Next.js - bu ajoyib freymvork bo'lib, serverda renderlash va statik sayt generatsiyasi imkoniyatlarini taqdim etadi, bu esa veb-ilovalarni tez va samarali qilishga yordam beradi. Biz bu matnni 100 belgidan oshirib yozishimiz kerak, shunda u dastlab qisqartirilgan holda ko'rinadi. Foydalanuvchi tugmani bosganda, mana bu to'liq jumlalar hammasi ochiladi.",
        rating: 1,
        image: img,
        position: "maneger",
    },
    {
        id: 3,
        fullName: "Wild Wilson",
        description: "Ushbu mahsulot haqiqatan ham mening kutganimdan oshib ketdi. Dizayni zamonaviy va foydalanish qulay. Tavsiya qilaman!",
        rating: 9.9,
        image: img,
        position: "director",
    },
]

export default function TopReviews() {
    return (
        <div className={"pt-[30px]"}>
            <div className={" p-[30px] bg-white rounded-xl shadow-sm   cursor-pointer overflow-hidden  h-full"}>
                <h1 className={"text-[20px] font-[700]"}>
                    Top Reviews
                </h1>
                {data.map((item, index) => (
                    <div key={index} className={"flex flex-col gap-4 border-b   border-gray-300  "}>
                        <div className={"flex items-center justify-between mt-[20px]"}>
                            <div className={"flex items-center gap-4"}>
                                <Image
                                    src={item.image}
                                    alt="logo"
                                    width={50}
                                    className={"rounded-full"}/>
                                <div className={"flex flex-col justify-center"}>
                                    <h1 className={"text-[16px] font-[600]"}>{item.fullName}</h1>
                                    <h1 className={"text-gray-600"}>{item.position}</h1>
                                </div>
                            </div>
                            <div className={"flex items-center justify-center gap-2"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-yellow-400"
                                >
                                    <path fillRule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                          clipRule="evenodd"/>
                                </svg>
                                <h1 className={"text-[18px]"}>{item.rating}</h1>
                            </div>
                        </div>
                        <ExpandableText text={item.description} maxLength={150} />
                    </div>
                ))}
            </div>
        </div>

    )
}