import React from "react";
import CountryCard from "@/components/CountryCard";
import {Country} from "@/types";
import FilterSection from "@/components/FilterSection";
import prisma from "@/lib/prisma";

// --- 3. Главная страница ---

export default async function BrowseCountriesPage() {
    const countries = await prisma.country.findMany({
        include: {
            costs: true,
        },
    });

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">

            {/* Основной контейнер */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Заголовок страницы */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Countries</h1>
                        <p className="text-gray-500 text-sm">Discover your next digital nomad destination</p>
                    </div>
                    <div className="hidden sm:block">
                        {/* Простой селект */}
                        <select
                            className="bg-gray-100 border-none text-sm rounded-md px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 transition">
                            <option>Most Popular</option>
                            <option>Cheapest</option>
                            <option>Safest</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                    <span>407 countries found • Showing 1-12</span>
                    {/* Мобильная кнопка фильтров могла бы быть здесь */}
                </div>

                <div className="flex gap-8">

                    {/* Левая колонка: Фильтры (Sidebar) */}
                    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-gray-200 pr-5">
                        <div className="sticky top-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Filters</h3>
                                <button className="text-blue-600 text-xs font-semibold hover:underline">Clear All
                                </button>
                            </div>

                            <div className="h-px bg-gray-200 mb-6"></div>
                            <FilterSection
                                title="Continent"
                                items={[
                                    {label: "Asia", count: 147},
                                    {label: "Europe", count: 98},
                                    {label: "South America", count: 62},
                                    {label: "North America", count: 41},
                                    {label: "Africa", count: 34},
                                    {label: "Oceania", count: 21},
                                ]}
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            <FilterSection
                                title="Language"
                                items={[
                                    {label: "English"},
                                    {label: "Spanish"},
                                    {label: "Portuguese"},
                                    {label: "French"},
                                    {label: "German"},
                                ]}
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            <FilterSection
                                title="Average Monthly Cost"
                                type="radio"
                                items={[
                                    {label: "Under $1,000"},
                                    {label: "$1,000 - $2,000"},
                                    {label: "$2,000 - $3,000"},
                                    {label: "Over $3,000"},
                                ]}
                            />

                            <div className="h-px bg-gray-200 mb-6"></div>

                            <FilterSection
                                title="Safety Rating"
                                items={[
                                    {label: "4.5+ Excellent"},
                                    {label: "4.0+ Very Good"},
                                    {label: "3.5+ Good"},
                                    {label: "3.0+ Fair"},
                                ]}
                            />
                        </div>
                    </aside>

                    {/* Правая колонка: Сетка карточек */}
                    <main className="flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {countries.map((country) => (
                                <CountryCard key={country.id} country={country}/>
                            ))}
                        </div>

                        {/* Пагинация */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center gap-2">
                                <button
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50">Previous
                                </button>

                                <button
                                    className="w-10 h-10 bg-blue-600 text-white rounded-md text-sm font-bold flex items-center justify-center">1
                                </button>
                                <button
                                    className="w-10 h-10 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center">2
                                </button>
                                <button
                                    className="w-10 h-10 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center">3
                                </button>
                                <span className="text-gray-400 px-2">...</span>
                                <button
                                    className="w-10 h-10 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center">36
                                </button>

                                <button
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">Next
                                </button>
                            </nav>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}