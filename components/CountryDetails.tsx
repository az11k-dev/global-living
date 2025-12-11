import {Country} from "@/types";
import {FileText, HeartCrack, Settings, Shield} from "lucide-react";


type CountryProps = {
    country: Country;
}
const data = [
    {
        id: 1,
        icon: <Shield color={"green"}/>,
        number: 8.5,
        title: "Country",
        bg: "#dcfce7",
        color:"green",
    },
    {
        id: 2,
        icon: <Settings  color={"blue"}/>,
        number: 9,
        title: "Country",
        bg: "#dbeafe",
        color:"blue"
    },
    {
        id: 3,
        icon: <HeartCrack  color={"purple"}/>,
        number: 7.8,
        title: "Country",
        bg: "#f3e8ff",
        color:"purple",
    },
    {
        id: 4,
        icon: <FileText color={"orange"} />,
        number: 6.5,
        title: "Country",
        bg: "#ffedd4",
        color:"orange",

    },
]

export default function CountryDetails() {


    return (
        <div >
            <div
                className=" p-[40px] bg-white rounded-xl shadow-sm  cursor-pointer overflow-hidden border border-gray-100  h-full ">
                <div className={"flex items-center gap-3 "}>
                    <div>
                        <h1 className={"text-[35px] font-[600]"}>UZ</h1>
                    </div>
                    <div>
                        <h1 className={"text-[20px] font-[600]"}>Uzbekistan</h1>
                        <h1 className={"text-gray-700"}>Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h1>
                    </div>
                </div>
                <div className={"flex items-center justify-between gap-6 mt-[20px]"}>
                    {data.map((item, i) => (
                        <div style={{
                            background: item.bg,lineHeight:"15px"
                        }} key={i}
                             className={"flex flex-col  p-[30px] w-[400px]  rounded-2xl gap-3 justify-center items-center "}>
                            {item?.icon}
                            <h1 style={{color:item.color}} className={"text-[24px]  font-[700]"}>{item?.number}</h1>
                            <h1 className={"text-gray-700 text-[18px]"}>{item?.title}</h1>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}