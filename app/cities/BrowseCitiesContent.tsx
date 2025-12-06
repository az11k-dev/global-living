'use client';

import React, {useState, useEffect, useCallback} from "react";
import BrowseCityCard from "@/components/BrowseCityCard";
import FilterSection from "@/components/FilterSection";
import {City} from "@/types";
// Импортируем наш новый хук
import {useCountryFilters} from "@/hooks/useCountryFilters";
// Для имитации данных, пока у нас нет полной информации о странах:
import {ContinentItems, LanguageItems, CostItems, SafetyItems, CountryItems, PopulationItems} from "@/data/filterData";

// --- Основной компонент страницы ---

export default function BrowseCitiesContent() {
    // 1. Используем наш кастомный хук для управления фильтрами
    const {
        getActiveFilter,
        handleFilterChange,
        handleClearAllFilters,
        currentQueryString
    } = useCountryFilters();

    // 2. Состояние для данных
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCities, setTotalCities] = useState(0);

    // 3. Функция загрузки данных (зависит только от currentQueryString)
    const fetchCities = useCallback(async () => {
        setIsLoading(true);
        // Запрос к API с текущими параметрами фильтрации
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${BASE_URL}/api/cities?${currentQueryString}`;

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


    // --- Рендеринг ---
    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">

            {/* Основной контейнер */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Заголовок страницы */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Cities</h1>
                        <p className="text-gray-500 text-sm">Discover your next digital nomad destination</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                    <span>{isLoading ? "Loading..." : `${totalCities} cities found`}</span>
                </div>

                <div className="flex gap-8">

                    {/* Левая колонка: Фильтры (Sidebar) */}
                    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-gray-200 pr-5">
                        <div className="sticky top-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Filters</h3>
                                {/* Используем обработчик из хука */}
                                <button
                                    onClick={handleClearAllFilters}
                                    className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="h-px bg-gray-200 mb-6"></div>

                            {/* --- Континент --- */}
                            <FilterSection
                                title="Country"
                                filterName="country"
                                activeValue={getActiveFilter("country")}
                                onFilterChange={handleFilterChange}
                                items={CountryItems} // Используем импортированные данные
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            <FilterSection
                                title="Population"
                                filterName="population"
                                activeValue={getActiveFilter("population")}
                                onFilterChange={handleFilterChange}
                                items={PopulationItems}
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            {/* --- Стоимость --- */}
                            <FilterSection
                                title="Average Monthly Cost"
                                filterName="maxCost"
                                activeValue={getActiveFilter("maxCost")}
                                onFilterChange={handleFilterChange}
                                items={CostItems}
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            {/* --- Безопасность --- */}
                            <FilterSection
                                title="Rating"
                                filterName="minRating"
                                activeValue={getActiveFilter("minRating")}
                                onFilterChange={handleFilterChange}
                                items={SafetyItems}
                            />
                        </div>
                    </aside>

                    {/* Правая колонка: Сетка карточек */}
                    <main className="flex-grow">
                        {/* 5. Индикация состояния загрузки/отсутствия данных */}
                        {isLoading ? (
                            <div className="text-center py-20 text-gray-500">
                                <p>Loading cities...</p>
                                {/*  */}
                            </div>
                        ) : cities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {cities.map((city: City) => (
                                    <BrowseCityCard key={city.id} city={city}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <h3 className="text-xl font-semibold mb-2">Oops! No results found.</h3>
                                <p>Try adjusting your filters or clearing them to see more cities.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
