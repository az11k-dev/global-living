import {ArrowRight, Flame} from "lucide-react";
import CityCard from "@/components/CityCard";
import AiMatchSection from "@/components/AiMatchSection";
import {City} from "@/types";

export default async function Home() {

    const BASE_URL =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${BASE_URL}/api/cities`, {
        cache: "no-cache"
    });
    const cities: City[] = await res.json();

    return (
        <div>
            <div
                className={"relative h-[91.4vh] w-full bg-[url(/images/home-background.png)] bg-no-repeat bg-cover bg-center flex items-center justify-center"}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className={"z-10 flex-col justify-center items-center"}>
                    <div className={"flex items-center justify-center mb-3"}>
                        <button
                            className="relative text-white text-sm font-medium bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl px-5 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-white/30 hover:shadow-white/40">
                            <span className="bg-[#4ADE80] w-2.5 h-2.5 rounded-full inline-block animate-pulse"></span>
                            Live Data: 142 countries updated today
                        </button>
                    </div>
                    <div>
                        <p className={"text-[60px] font-bold text-white text-center leading-16"}>
                            Find Your Place in the <br/><span
                            className={"bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-transparent bg-clip-text"}>World</span>
                        </p>
                        <p className={"text-white font-light text-xl text-center mt-3"}>
                            Compare living costs, quality of life, and safety across the globe. Let <br/>
                            our AI guide you to your next perfect destination.
                        </p>
                    </div>
                    <div
                        className="bg-white/20 backdrop-blur-lg border border-white/50 shadow-2xl rounded-2xl transition-all duration-300 p-6 mt-16">
                        <div className={"flex items-center justify-between"}>
                            <div className={"flex items-center justify-center gap-1"}>
                                <Flame size={20} color={"#F97316"}/>
                                <p className={"text-white text-base font-semibold"}>
                                    Where people are looking now
                                </p>
                            </div>
                            <p className={"text-sm font-light text-black/70"}>
                                TRENDING
                            </p>
                        </div>
                        <div className={"flex items-center justify-center gap-4 mt-5"}>
                            {cities.map((item) => (
                                <div
                                    style={{backgroundImage: `url(${item?.image})`}}
                                    className="relative cursor-pointer bg-center bg-cover bg-no-repeat min-w-[200px] min-h-[150px] rounded-lg flex items-center justify-end flex-col overflow-hidden pb-2"
                                    key={item.id}
                                >
                                    <div className="absolute inset-0 bg-black/40"></div>

                                    <p className="text-white text-sm font-bold relative z-10">
                                        {item?.name}
                                    </p>
                                    <p className="text-white text-xs font-extralight relative z-10">
                                        {item?.country?.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"px-24 mt-10"}>
                <h1 className={"text-[30px] font-bold text-black"}>
                    Popular Destinations
                </h1>
                <div className={"flex items-center justify-between mb-7"}>
                    <p className={"text-base font-normal text-[#6B7280]"}>
                        Top rated cities by our community of digital nomads and expats.
                    </p>
                    <a href={"/cities"}
                       className={"flex items-center justify-center text-[#3B82F6] gap-1 cursor-pointer hover:text-blue-600 transition"}>
                        View all cities <ArrowRight size={18}/>
                    </a>
                </div>
                <div className={"flex items-center justify-center gap-7"}>
                    {cities.map(item => (
                        <CityCard item={item} key={item.id}/>
                    ))}
                </div>
            </div>
            <AiMatchSection/>
        </div>
    );
}