import {Country} from "@/types";
import {CloudSunRain, FileText, HeartCrack, ShieldHalf, Sun, PersonStanding, Globe, MapPinned} from "lucide-react";
import flag from "@/public/images/uzb.png"
import Image from "next/image";
import React from "react";


type CountryProps = {
    country: Country;
}


export default function CountryDetails({country}: CountryProps) {
    const data = [
        {
            id: 1,
            icon: <ShieldHalf color={"green"}/>,
            number: country?.rating,
            title: "Safety",
            bg: "#dcfce7",
            color: "green",
        },
        {
            id: 2,
            icon: <CloudSunRain size={28} color={"blue"}/>,
            number: country?.temperature,
            title: "Climate",
            bg: "#dbeafe",
            color: "blue"
        },
        {
            id: 3,
            icon: <Globe size={28} color={"purple"}/> ,
            number: country?.language,
            title: "Language",
            bg: "#f3e8ff",
            color: "purple"
        },
        {
            id: 4,
            icon: <MapPinned size={28} color={"orange"}/>  ,
            number: country?.continent,
            title: "Continent",
            bg: "#ffedd4",
            color: "orange"
        },

    ]

    return (
        <div>
            <div
                className=" p-[40px] bg-white  rounded-xl shadow-sm  cursor-pointer overflow-hidden border border-gray-100  h-full ">
                <div className={"flex items-center gap-3 bg-purple-10"}>
                    <div>
                        {/*<Image src={country?.flag} height={50} width={50}  alt={"flag"} />*/}
                    </div>
                    <div>
                        <h1 className={"text-[20px] font-[600]"}>{country.name}</h1>
                        <h1 className={"text-gray-700"}>{country.description}</h1>
                    </div>
                </div>
                <div className={"flex items-center justify-between gap-6 mt-[20px]"}>
                    {data.map((item, i) => (
                        <div style={{
                            background: item.bg, lineHeight: "15px"
                        }} key={i}
                             className={"flex flex-col  p-[30px] w-[400px]  rounded-2xl gap-3 justify-center items-center "}>
                            {item?.icon}
                            <h1 style={{color: item.color}} className={"text-[24px]  font-[700]"}>{item?.number}</h1>
                            <h1 className={"text-gray-700 text-[18px]"}>{item?.title}</h1>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}