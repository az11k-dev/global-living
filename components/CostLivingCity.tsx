import { City } from "@/types";
import { DollarSign, Laptop, Users } from "lucide-react";
import React from "react";

type CityProps = {
    city: City;
}


const ProgressBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => {
    const width = (value / 10) * 100;

    return (
        <div className="w-full mb-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-[13px] capitalize">{label}</span>
                <span className="font-semibold text-[13px]">{value.toFixed(1)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className={`${colorClass} h-2 rounded-full`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

export default function CostLivingCity({ city }: CityProps) {
    const data = [
        {
            id: 1,
            description: "Cost of Living",
            icon: <DollarSign className="text-green-600 w-5 h-5" />,
            rating: "$" + city?.totalCost?.toLocaleString("en-US"),
            minitxt: "per month",
            items: [
                { label: "Rent", value: "$" + city?.costs?.rent },
                { label: "Food", value: "$" + city?.costs?.food },
                { label: "Transport", value: "$" + city?.costs?.transport },
            ]
        },
        {
            id: 2,
            description: "Quality of Life",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"/>
                </svg>
            ),
            rating: city?.rating,
            minitxt: "Overall rating",
            // Специальное поле для чартов
            charts: [
                { label: "Weather", value: city?.rating, color: "bg-blue-500" },
                { label: "Culture", value: city?.rating, color: "bg-purple-500" }
            ]
        },
        {
            id: 3,
            description: "Work Environment",
            icon: <Laptop className="text-blue-600 w-5 h-5" />,
            rating: city?.rating,
            minitxt: "Remote work score",
            items: [
                { label: "Coworking", value: city?.internetSpeed + "+ spaces" },
                { label: "Cafes", value: city?.internetSpeed + "+ wifi spots" },
                { label: "Internet", value: city?.internetSpeed + " Mbps avg" },
            ]
        },
        {
            id: 4,
            description: "Community",
            icon: <Users className="text-orange-500 w-5 h-5" />,
            rating: city?.rating,
            minitxt: "Social score",
            items: [
                { label: "Nomads", value: city?.rating + "+ active" },
                { label: "Meetups", value: city?.rating + "+ monthly" },
                { label: "English", value: "Widely spoken" },
            ]
        }
    ];

    return (
        <div className="w-full flex justify-between gap-5 ">
            {data.map((item) => (
                <div key={item.id} className="p-[15px] bg-white flex flex-col gap-3 w-full rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[18px] font-bold text-gray-800">{item.description}</h1>
                        <div>{item.icon}</div>
                    </div>

                    <div>
                        <h1 className="text-[23px] font-bold">{item.rating}</h1>
                        <p className="text-gray-500 text-[13px]">{item.minitxt}</p>
                    </div>

                    <div className=" border-gray-300 pt-2 mt-auto">
                        {item.charts ? (
                            item.charts.map((chart, index) => (
                                <ProgressBar
                                    key={index}
                                    label={chart.label}
                                    value={chart.value}
                                    colorClass={chart.color}
                                />
                            ))
                        ) : (
                            <div className="flex justify-between text-[13px]">
                                <div className="text-gray-500 flex flex-col gap-1">
                                    {item.items?.map((row, i) => <p key={i}>{row.label}</p>)}
                                </div>
                                <div className="font-semibold flex flex-col gap-1 text-right">
                                    {item.items?.map((row, i) => <p key={i}>{row.value}</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}