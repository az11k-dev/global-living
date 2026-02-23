'use client';

import CountryDetails from "@/components/CountryDetails";
import AggregetedPrice from "@/components/AggregetedPrice";
import PopularCities from "@/components/PopularCities";
import TopReviews from "@/components/TopReviews";
import AIsummary from "@/components/AIsummary";
import {Suspense, useCallback, useEffect, useState} from "react";
import {useCountryFilters} from "@/hooks/useCountryFilters";
import {Country} from "@/types";
import {useParams} from "next/navigation";

export default function CountryPage() {
    const params = useParams<{ id: string }>();
    const countryId = params.id;
    const {
        currentQueryString
    } = useCountryFilters();
    const [country, setCountry] = useState<Country | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchCountry = useCallback(async () => {
        if (!countryId) return;
        setIsLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/countries/${countryId}?${currentQueryString}`;
        try {
            const res = await fetch(url, {cache: "no-cache"});
            if (!res.ok) throw new Error("Failed to fetch country details");
            const data: Country = await res.json();
            setCountry(data);

        } catch (error) {
            console.error(`Error fetching country ${countryId}:`, error);
            setCountry(null);
        } finally {
            setIsLoading(false);
        }
    }, [countryId, currentQueryString]);
    useEffect(() => {
        fetchCountry();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [fetchCountry]);
    if (isLoading) {
        return <div className="p-10 text-center min-h-screen flex items-center justify-center">loading country...</div>;
    }
    if (!country) {
        return <div className="p-10 text-center text-red-600">Oops! No results found.</div>;
    }
    return (
        <Suspense fallback={<div>Loading country components</div>}>
            <div key={country.id} className={"px-[100px] py-[40px] bg-gray-100 min-h-screen"}>
                <CountryDetails country={country}/>
                <AggregetedPrice country={country}/>
                <PopularCities country={country}/>
                <TopReviews/>
                <AIsummary query={country.name}/>
            </div>
        </Suspense>
    )
}