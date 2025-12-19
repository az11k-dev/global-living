import {City} from "@/types";
import {DollarSign} from "lucide-react";

type CityProps = {
    city: City;
}
export default function CostLivingCity({city}: CityProps) {
    const data = [
        {
            id: 1,
            description: "Cost of Living",
            icon: <DollarSign/>,
            rating:
        }
    ]
    return (
        <div className={"flex items-center justify-between"}>
            <div
                className={"bg-white  w-[100%] rounded-xl shadow-sm  p-5 cursor-pointer overflow-hidden border border-gray-100  h-full"}>

            </div>
        </div>
    )
}