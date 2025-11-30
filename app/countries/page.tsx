import React from "react";

type CostBreakdown = {
    rent: number;
    food: number;
    transport: number;
};

type Country = {
    id: number;
    name: string;
    flag: string; // Используем эмодзи для простоты, можно заменить на url картинки
    image: string;
    rating: number;
    description: string;
    costs: CostBreakdown;
    totalCost: number;
};

const countriesData: Country[] = [
    {
        id: 1,
        name: "Thailand",
        flag: "🇹🇭",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Tropical paradise with amazing food, friendly locals, and a thriving digital nomad scene.",
        costs: {rent: 400, food: 300, transport: 50},
        totalCost: 750,
    },
    {
        id: 2,
        name: "Portugal",
        flag: "🇵🇹",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        description: "Beautiful coastal cities, rich history, excellent food scene, and a welcoming vibe.",
        costs: {rent: 800, food: 400, transport: 80},
        totalCost: 1280,
    },
    {
        id: 3,
        name: "Mexico",
        flag: "🇲🇽",
        image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        description: "Vibrant culture, delicious cuisine, affordable living, and excellent networking.",
        costs: {rent: 600, food: 350, transport: 60},
        totalCost: 1010,
    },
    {
        id: 4,
        name: "Indonesia",
        flag: "🇮🇩",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        description: "Island paradise with stunning beaches, rich culture, and a massive digital nomad hub.",
        costs: {rent: 500, food: 280, transport: 70},
        totalCost: 850,
    },
    {
        id: 5,
        name: "Spain",
        flag: "🇪🇸",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Mediterranean lifestyle, world-class cuisine, vibrant cities, and excellent quality of life.",
        costs: {rent: 900, food: 450, transport: 90},
        totalCost: 1440,
    },
    {
        id: 6,
        name: "Colombia",
        flag: "🇨🇴",
        image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        description: "Diverse landscapes, warm people, affordable living, and growing digital hubs.",
        costs: {rent: 550, food: 320, transport: 55},
        totalCost: 925,
    },
];

// --- 2. Компоненты ---

// Компонент одной строки цены
const CostRow = ({label, value}: { label: string; value: string }) => (
    <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);

// Компонент Карточки
const CountryCard = ({country}: { country: Country }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Изображение + Рейтинг */}
            <div className="relative h-48 w-full bg-gray-200">
                <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
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
                    <CostRow label="Rent" value={`$${country.costs.rent}/mo`}/>
                    <CostRow label="Food" value={`$${country.costs.food}/mo`}/>
                    <CostRow label="Transport" value={`$${country.costs.transport}/mo`}/>

                    <div className="h-px bg-gray-100 my-3"></div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total avg. cost</span>
                        <span
                            className="text-blue-600 font-bold text-lg">${country.totalCost.toLocaleString()}/mo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Компонент Фильтров (Секция чекбоксов)
const FilterSection = ({title, items, type = "checkbox"}: {
    title: string,
    items: { label: string, count?: number }[],
    type?: "checkbox" | "radio"
}) => (
    <div className="mb-8">
        <h4 className="font-bold text-sm text-gray-900 mb-3">{title}</h4>
        <div className="space-y-2">
            {items.map((item, idx) => (
                <label key={idx} className="flex items-center group cursor-pointer">
                    <input
                        type={type}
                        name={title} // для радио кнопок
                        className={`
                appearance-none w-4 h-4 border border-gray-300 
                ${type === 'radio' ? 'rounded-full' : 'rounded'}
                checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-100 mr-3 transition-colors
            `}
                    />
                    <span className="text-sm text-gray-600 flex-grow group-hover:text-gray-900">{item.label}</span>
                    {item.count && <span className="text-xs text-gray-400">{item.count}</span>}
                </label>
            ))}
        </div>
    </div>
);

// --- 3. Главная страница ---

export default function BrowseCountriesPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-800">

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
                    <aside className="w-64 flex-shrink-0 hidden lg:block">
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
                            {countriesData.map((country) => (
                                <CountryCard key={country.id} country={country}/>
                            ))}
                            {/* Дублируем данные чтобы заполнить сетку для демо */}
                            {countriesData.map((country) => (
                                <CountryCard key={`${country.id}-dup`} country={{...country, id: country.id + 100}}/>
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