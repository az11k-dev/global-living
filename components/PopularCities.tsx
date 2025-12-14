'use client';
import Link from "next/link";
import Image from "next/image";
import {ArrowRight} from "lucide-react";
import React, {useCallback, useEffect, useState} from "react";
import {City, Country} from "@/types";
import {useCountryFilters} from "@/hooks/useCountryFilters";

type CountryProps = {
    country: Country;
}


export default function PopularCities({country}: CountryProps) {
    const {
        getActiveFilter,
        handleFilterChange,
        handleClearAllFilters,
        currentQueryString
    } = useCountryFilters();

    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCities, setTotalCities] = useState(0);

    // 3. Функция загрузки данных (зависит только от currentQueryString)
    const fetchCities = useCallback(async () => {
        setIsLoading(true);
        // Запрос к API с текущими параметрами фильтрации
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/cities?country=${country.name}`;
        try {
            const res = await fetch(url, {cache: "no-cache"});
            if (!res.ok) throw new Error("Failed to fetch Cities");
            const data = await res.json();
            // В зависимости от того, как настроен ваш бэкенд:
            setCities(data.cities || data); // Если API возвращает { Cities: [...], total: N }
            setTotalCities(data.total || data.length); // Используем длину массива как запасной вариант

        } catch (error) {
            console.error("Error fetching Cities:", error);
            setCities([]);
            setTotalCities(0);
        } finally {
            setIsLoading(false);
        }
    }, [currentQueryString]);

    // 4. Запуск загрузки при изменении фильтров
    useEffect(() => {
        fetchCities();
        // Принудительно прокручиваем вверх при загрузке новых данных (хороший UX)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [fetchCities]);
    return (
        <div>
            <div>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-[20px] font-[700]"}>
                        Popular Cities
                    </h1>
                    <Link href={`/cities?country=${country?.name.toLowerCase()}`}
                          className={"flex items-center justify-center text-[#3B82F6] gap-1 cursor-pointer hover:text-blue-600 transition"}>
                        View all cities <ArrowRight size={18}/>
                    </Link>
                </div>
                <div className={"flex items-center   py-[20px] gap-5 "}>
                    {cities.map((city: City) => (
                        <div key={city.id}
                             className={"flex flex-col gap-3 max-w-[400px] w-full h-full bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden border border-gray-100  "}>
                            <div className={"relative h-48 w-full"}>
                                <Image
                                    src={city.image}
                                    alt="logo"
                                    fill
                                    className=" w-full h-full object-cover"
                                />
                            </div>
                            <div className={"p-[10px]"}>
                                <h1 className={"text-[20px] font-[600]"}>{city.name}</h1>
                                <h1 className={"text-gray-700 "}>{city.description}</h1>
                                <div className={"py-[10px] flex items-center justify-between"}>
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
                                        <h1 className={"text-[18px]"}>{city.rating}</h1>
                                    </div>
                                    <h1 className={"text-gray-700"}>1,234 reviews</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
