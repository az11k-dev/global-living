import {City} from "@/types";
import Image from "next/image";
import {Heart, MapPin, Share2, Wifi} from "lucide-react";

type CityProps = {
    city: City;
}

export default function CityOverview({city}: CityProps) {
    const data = [
        {
            id: 1,
            txt: "Overall Score",
            color: 'blue',
            number: city?.rating,
        },
        {
            id: 2,
            txt: "Population",
            color: 'green',
            number: city?.population.toLocaleString("en-US"),
        },
        {
            id: 3,
            txt: "Avg. Temp",
            color: 'purple',
            number: city?.temperature + "°C"
        },
        {
            id: 4,
            txt: "Timezone",
            color: 'orange',
            number: city?.timezone,
        }
    ]
    return (
        <div className={"w-full"}>
            <div className={"flex justify-between items-center w-full"}>
                <div className={"flex justify-center items-center gap-4"}>
                    <Image src={city?.image} alt={city?.name} width={140} height={10} className={"rounded-xl"}/>
                    <div className={"flex flex-col"}>
                        <h1 className={"text-[30px] font-[600]"}>{city?.name}</h1>
                        <div className={"flex items-center gap-1 text-gray-600"}>
                            <MapPin size={16}/>
                            {city?.country?.name}
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center items-center gap-4"}>
                    <button
                        className={"cursor-pointer flex justify-center items-center gap-2 border-1 border-gray-300 p-[10px] rounded-xl"}>
                        <Heart size={16}/>
                        <h1>Save</h1>
                    </button>
                    <button
                        className={"cursor-pointer flex justify-center items-center gap-2 border-1 border-gray-300 p-[10px] rounded-xl"}>
                        <Share2 size={16}/>
                        <h1>Share</h1>
                    </button>
                </div>
            </div>

            <div className={"w-full  flex justify-between py-[30px] gap-5"}>
                <div className={" flex flex-col gap-3  bg-white  w-[70%] rounded-xl shadow-sm  p-5 cursor-pointer overflow-hidden border border-gray-100  h-full "}>
                    <h1 className={"text-[20px] font-[600]"}>City Overview</h1>
                    <h1 className={"text-gray-600"}>{city.description}</h1>
                    <div className={"border-t-1 border-gray-200 flex items-center justify-between  px-[60px] text-gray-600"}>
                        {data?.map((city) => (
                            <div key={city?.id} className={"py-[15px]"} >
                                <h1  style={{color:city?.color}} className={"text-center text-[26px] font-[700]"}>{city?.number}</h1>
                                <h1 className={"text-center"}>{city?.txt}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={" flex flex-col gap-3 bg-blue-600  w-[30%] rounded-xl shadow-sm   cursor-pointer overflow-hidden border border-gray-100  h-full p-[20px] text-white"}>
                 <h1>Quick Stats</h1>
                    <div className={"flex justify-between items-center "}>
                        <div className={"flex items-center gap-3"}>
                            <Wifi />
                            <h1>Internet Speed</h1>
                        </div>
                        <h1></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}