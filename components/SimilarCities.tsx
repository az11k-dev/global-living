import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { City } from "@/types";
import { useCountryFilters } from "@/hooks/useCountryFilters";

const SkeletonRow = () => (
    <div className="flex items-center justify-between py-4 animate-pulse border-b border-gray-50">
        <div className="flex items-center gap-4">
            <div className="w-[70px] h-[50px] bg-gray-200 rounded-xl" />
            <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-gray-200 rounded" />
                <div className="w-16 h-3 bg-gray-100 rounded" />
            </div>
        </div>
        <div className="flex gap-10">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-6 bg-gray-100 rounded-2xl" />
            ))}
        </div>
    </div>
);

export default function SimilarCities() {
    const { currentQueryString } = useCountryFilters();
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCities = useCallback(async () => {
        setLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/cities/?${currentQueryString}`;

        try {
            const response = await fetch(url, { cache: "no-cache" });
            if (!response.ok) throw new Error("Could not fetch cities");
            const data = await response.json();
            setCities(Array.isArray(data) ? data : []);
        } catch (error) {
            setCities([]);
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [currentQueryString]);

    useEffect(() => {
        fetchCities();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [fetchCities]);

    return (
        <div className="p-6 bg-white flex flex-col gap-6 w-full rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    Compare with Similar Cities
                </h2>
                <Link
                    href="/cities"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                    View All Comparisons
                </Link>
            </div>

            <div className="hidden md:flex justify-between px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="w-1/3">City</div>
                <div className="flex flex-1 justify-between ml-10">
                    <span className="w-20 text-center">Cost</span>
                    <span className="w-20 text-center">Quality</span>
                    <span className="w-20 text-center">Internet</span>
                    <span className="w-20 text-center">Score</span>
                </div>
            </div>

            <div className="flex flex-col">
                {loading ? (
                    [1, 2, 3].map((n) => <SkeletonRow key={n} />)
                ) : cities.length > 0 ? (
                    cities.slice(0, 6).map((city) => (
                        <div
                            key={city.id}
                            className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded-lg"
                        >
                            <div className="flex items-center gap-4 md:w-1/3">
                                <div className="relative w-[70px] h-[50px] shrink-0">
                                    <Image
                                        src={city.image}
                                        alt={city.name}
                                        fill
                                        className="rounded-xl object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{city.name}</h3>
                                    <p className="text-sm text-gray-500">{city.country?.name}</p>
                                </div>
                            </div>

                            <div className="flex flex-1 justify-between items-center mt-4 md:mt-0 md:ml-10">
                                <span className="w-20 text-center font-medium text-gray-700">
                                  ${city.totalCost.toLocaleString()}
                                </span>
                                <span className="w-20 py-1 text-center text-sm font-bold text-green-700 bg-green-100 rounded-full">
                                  {city.rating}
                                </span>
                                <span className="w-20 text-center text-gray-600">
                                  {city.internetSpeed} Mbps
                                </span>
                                <span className="w-20 py-1 text-center text-sm font-bold text-blue-700 bg-blue-100 rounded-full">
                                  {city.rating}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No similar cities found.
                    </div>
                )}
            </div>
        </div>
    );
}