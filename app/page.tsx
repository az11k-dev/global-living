import {ArrowRight, Flame} from "lucide-react";
import CityCard from "@/components/CityCard";

const data = [
    {
        id: 1,
        city: "Debrecen",
        country: "Hungary",
        img: "https://edu.unideb.hu/tartalom/feltoltott_kepek/kepek/shutterstock_176965334.jpg"
    },
    {
        id: 2,
        city: "Pecs",
        country: "Hungary",
        img: "https://international.pte.hu/sites/international.pte.hu/files/share/INTERNATIONAL/university/P%C3%A9cs_k%C3%A9p_Kisfali_Gergely.jpg"
    },
    {
        id: 3,
        city: "Berea",
        country: "USA",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Berea_Kentucky_City_Hall.jpg"
    },
    {
        id: 4,
        city: "Riyadh",
        country: "Saudi Arabia",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVpUb_7Urdno_LuRtJJ82lLneSxuwiZ1Tww&s"
    }
];

const countries = [
    {
        id: 1,
        img: "/images/paris.png",
        name: "Paris",
        rating: 4.5,
        country: "France",
        col: 3800,
        safety: "High",
    }
]

export default function Home() {
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
                            {data.map((item) => (
                                <div
                                    style={{backgroundImage: `url(${item?.img})`}}
                                    className="relative cursor-pointer bg-center bg-cover bg-no-repeat min-w-[200px] min-h-[150px] rounded-lg flex items-center justify-end flex-col overflow-hidden pb-2"
                                    key={item.id}
                                >
                                    <div className="absolute inset-0 bg-black/40"></div>

                                    <p className="text-white text-sm font-bold relative z-10">
                                        {item?.city}
                                    </p>
                                    <p className="text-white text-xs font-extralight relative z-10">
                                        {item?.country}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"px-24"}>
                <h1 className={"text-[30px] font-bold text-black"}>
                    Popular Destinations
                </h1>
                <div className={"flex items-center justify-between mb-7"}>
                    <p className={"text-base font-normal text-[#6B7280]"}>
                        Top rated cities by our community of digital nomads and expats.
                    </p>
                    <button className={"flex items-center justify-center text-[#3B82F6] gap-1"}>
                        View all cities <ArrowRight size={18}/>
                    </button>
                </div>
                <div>
                    {countries.map(item => (
                        <CityCard item={item} key={item.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}