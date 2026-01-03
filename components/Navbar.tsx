"use client";

import Image from "next/image";
import {Search, User} from "lucide-react";
import Link from "next/link";
import {useState, useEffect} from "react";
import {City, Country} from "@/types";

const navItems = [
    {id: 1, name: "Home", link: "/"},
    {id: 2, name: "Countries", link: "/countries"},
    {id: 3, name: "Cities", link: "/cities"},
    {id: 4, name: "AI Center", link: "/ai-center"},
];

export default function Navbar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ countries: Country[]; cities: City[] }>({
        countries: [],
        cities: [],
    });
    const [loading, setLoading] = useState(false);

    // Fetch results from backend
    useEffect(() => {
        if (!query) {
            setResults({countries: [], cities: []});
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search?name=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // debounce 300ms

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <nav
            className="h-20 w-full flex items-center justify-between px-24 fixed z-999 bg-white border-b border-gray-200">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href={"/"}>
                    <Image
                        src="/images/second-logo.jpg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-lg cursor-pointer"
                    />
                </Link>
                <h1 className="text-xl font-bold text-black">
                    Global <span className={"text-blue-500"}>Living</span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-5 text-base text-gray-500 font-medium">
                {navItems.map((item) => (
                    <Link
                        href={item?.link}
                        key={item.id}
                        className="cursor-pointer transition-colors hover:text-blue-500"
                    >
                        {item?.name}
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 relative">
                {/* Search Box */}
                <div className="bg-gray-50 h-10 border border-gray-200 rounded-3xl px-3 flex items-center relative">
                    <Search size={20} className="text-gray-500"/>
                    <input
                        className="outline-none px-2 text-blue-500 bg-transparent"
                        placeholder="Search country or city..."
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Dropdown Results */}
                    {query && (
                        <div
                            className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                            {loading ? (
                                <p className="p-3 text-center text-gray-500">Loading...</p>
                            ) : (
                                <>
                                    {results.countries.length === 0 && results.cities.length === 0 ? (
                                        <p className="p-3 text-gray-500">No results found</p>
                                    ) : (
                                        <>
                                            {/* Countries */}
                                            {results.countries.length > 0 && (
                                                <div className="p-2 border-b border-gray-100">
                                                    <p className="text-gray-400 text-sm px-2">Countries</p>
                                                    {results.countries.map((country) => (
                                                        <Link
                                                            onClick={() => {
                                                                setResults({
                                                                    countries: [],
                                                                    cities: [],
                                                                })
                                                                setQuery("");
                                                            }}
                                                            href={`/country/${country.id}`}
                                                            key={country.id}
                                                            className="block px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                                                        >
                                                            {country.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Cities */}
                                            {results.cities.length > 0 && (
                                                <div className="p-2">
                                                    <p className="text-gray-400 text-sm px-2">Cities</p>
                                                    {results.cities.map((city) => (
                                                        <Link
                                                            onClick={() => {
                                                                setResults({
                                                                    countries: [],
                                                                    cities: [],
                                                                })
                                                                setQuery("");
                                                            }}
                                                            href={`/city/${city.id}`}
                                                            key={city.id}
                                                            className="block px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                                                        >
                                                            {city.name}, {city?.country?.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <User className="cursor-pointer text-gray-500"/>

                <Link
                    className="text-white rounded-3xl bg-blue-500 px-5 py-2 hover:bg-blue-600 transition cursor-pointer"
                    href={"/signup"}
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}
