'use client';

import {useParams} from "next/navigation";
import dynamic from 'next/dynamic';
import {useCountryFilters} from "@/hooks/useCountryFilters";
import {useCallback, useEffect, useState} from "react";
import {City} from "@/types";
import CityOverview from "@/components/CityOverview";
import CostLivingCity from "@/components/CostLivingCity";
import SimilarCities from "@/components/SimilarCities";
import TopReviews from "@/components/TopReviews";
import AIsummaryInsights from "@/components/AIsummaryInsights";

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
    ssr: false,
});

export default function CityPage() {
    const parms = useParams();
    const cityId = parms.id;
    const {
        currentQueryString
    } = useCountryFilters();
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchCity = useCallback(async () => {
        if (!cityId) return;
        setLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/cities/${cityId}?${currentQueryString}`;
        try {
            const response = await fetch(url, {cache: "no-cache"});
            if (!response.ok) throw new Error("Could not fetch city");
            const data: City = await response.json();
            setCity(data);
        } catch (error) {
            setCity(null);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [cityId, currentQueryString]);
    useEffect(() => {
        fetchCity();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [fetchCity]);
    if (loading) {
        return <div className="p-10 text-center min-h-screen flex items-center justify-center">loading city...</div>;
    }
    if (!city) {
        return <div className="p-10 text-center text-red-600">Oops! No results found.</div>;
    }

    return (
        <div key={city.id} className={"px-[100px] py-[40px] bg-gray-100 min-h-screen"}>
            <CityOverview city={city}/>
            <CostLivingCity city={city}/>
            <InteractiveMap city={city}/>
            <AIsummaryInsights query={city.name}/>
            <SimilarCities />
            <TopReviews/>
        </div>
    )
}