import Image from "next/image";
import ai2 from "@/public/images/ai2.png"
import React from "react";
import {ArrowRight, Lightbulb, Check, X, Bot} from "lucide-react";
import flag from "@/public/images/uzb.png"
import Link from "next/link";

const data = [
    {
        id: 1,
        countryName: "Australia",
        image: flag,
        txt: "  Lorem ipsum is placeholder text1",
        unTxt: " Lorem ipsum is placeholder text1",
    },
    {
        id: 2,
        countryName: "Russia",
        image: flag,
        txt: "  Lorem ipsum is placeholder text2",
        unTxt: " Lorem ipsum is placeholder text2",
    },
    {
        id: 3,
        countryName: "India",
        image: flag,
        txt: "  Lorem ipsum is placeholder text3",
        unTxt: " Lorem ipsum is placeholder text3",
    }
]
export default function AIsummary() {
    return (
        <div className={"py-[30px] flex  justify-between gap-10"}>
            <div className={"bg-blue-100 p-[30px] rounded-xl border-1 border-blue-300"}>
                <div className={"flex items-center gap-3"}>
                    <div className="p-4 bg-[#5d5cf0] rounded-xl">
                        <Bot className="w-6 h-6 text-white"/>
                    </div>
                    <h1 className={"text-[20px] font-[700]"}>
                        AI Summary
                    </h1>
                </div>
                <div className={"mb-[20px] flex flex-col gap-3 text-gray-600"}>
                    <h1 className={"text-[18px] font-[700] text-black mt-[20px]"}>
                        Best For:
                    </h1>
                    <h1>
                        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                        for previewing layouts and visual mockups.
                    </h1>
                    <h1 className={"text-[18px] font-[700] text-black mt-[20px]"}>Pros:</h1>
                    {data.map((item, index) => (
                        <div key={index}>
                            <h1 className={"flex items-center gap-3"}>
                                <Check color="green"/>
                                {item.txt}
                            </h1>
                        </div>
                    ))}

                    <h1 className={"text-[18px] font-[700] text-black mt-[20px]"}>Cons:</h1>
                    {data.map((item, index) => (
                        <div key={index}>
                            <h1 className={"flex items-center gap-3"}>
                                <X color="red"/>
                                {item.unTxt}
                            </h1>
                        </div>
                    ))}

                </div>
                <div className={"flex items-center justify-between py-[20px] border-t-1 border-blue-300"}>
                    <h1 className={"text-[18px] font-[700] text-black mt-[20px]"}>
                        Estimated Montthly Budget:
                    </h1>
                    <h1 className={"text-[30px] text-blue-600 font-[600]"}>$1,150 - $1,180</h1>
                </div>
            </div>
            <div className={"bg-purple-100 p-[30px] rounded-xl border-1 border-purple-300"}>
                <div className={"flex items-center gap-3"}>
                    <Image src={ai2} alt={"ai2"} width={50} className={"rounded-xl"}/>
                    <h1 className={"text-[20px] font-[700]"}>
                        Compare Countries
                    </h1>
                </div>
                <div className={"flex flex-col gap-3 text-gray-600 "}>
                    <h1 className={"mt-[20px]"}>
                        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                        for previewing layouts and visual mockups.
                    </h1>
                    {data.map((item, index) => (
                        <div key={index}
                             className={"flex items-center justify-between gap-4 border-1 mt-[10px]  p-[30px] border-gray-300 bg-white rounded-xl"}>
                            <div className={"flex items-center gap-3"}>
                                <Image src={item.image} alt={"flag"} width={50} className={""}/>
                                <h1 className={"text-[18px] font-[600]"}>Compare with {item.countryName}</h1>
                            </div>
                            <Link href="/">
                                <ArrowRight className={"text-[18px] font-[600] text-gray-400"}/>
                            </Link>
                        </div>
                    ))}
                </div>
                <div
                    className={"flex flex-col gap-3 border-1 border-purple-300 bg-white rounded-xl mt-[30px] px-[20px] py-[20px]"}>
                    <div className="flex items-center gap-2 ">
                        <Lightbulb color="purple" strokeWidth={3}/>
                        <h1 className={"text-[18px] font-[600]"}>Cusstom Comparison</h1>
                    </div>

                    <h1 className={"text-gray-600"}> Lorem ipsum is placeholder text </h1>
                    <button
                        className={"cursor-pointer bg-purple-500 text-white text-[18px] rounded-xl p-[15px] flex items-center justify-center gap-3 hover:bg-purple-400"}>Choose
                        Country
                    </button>
                </div>
            </div>
        </div>
    )
}
