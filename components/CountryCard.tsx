import React from "react";
import {Country} from "@/types";
import Image from "next/image";

type CountryProps = {
    country: Country;
}

const CostRow = ({label, value}: { label: string; value: string }) => (
    <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);
    const CountryCard = ({country}: CountryProps) => {
    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full transition-transform hover:scale-105 duration-300">
            {/* Изображение + Рейтинг */}
            <div className="relative h-48 w-full bg-gray-200">
                <Image src={country.image}
                       alt={country.name}
                       fill
                       className="w-full h-full object-cover"/>
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
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
                    {country.rating}
                </div>
            </div>

            {/* Контент */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Заголовок */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="text-lg font-bold text-gray-900">{country.name}</h3>
                </div>

                {/* Описание */}
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {country.description}
                </p>

                {/* Таблица цен (Spacer to push to bottom) */}
                <div className="mt-auto">
                    <CostRow label="Rent" value={`$${country?.costs?.rent}/mo`}/>
                    <CostRow label="Food" value={`$${country?.costs?.food}/mo`}/>
                    <CostRow label="Transport" value={`$${country?.costs?.transport}/mo`}/>

                    <div className="h-px bg-gray-100 my-3"></div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total avg. cost</span>
                        <span
                            className="text-blue-600 font-bold text-lg">${country.totalCost.toLocaleString()}/mo</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CountryCard;