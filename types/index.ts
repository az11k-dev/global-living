import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type Costs = {
    id: number;
    rent: number;
    food: number;
    transport: number;
    internet: number;
    utilities: number;
    countryId: number;
};

export type City = {
    id: number;
    name: string;
    description: string;
    countryId: number;
    rating: number;
    image: string;
    lat: number;
    lng: number;
    internetSpeed: string;
    population: number;
    temperature: number;
    timezone: string;
    costs: Costs | null;
    country: Country | null;
    totalCost: number;
};

export type Country = {
    id: number;
    name: string;
    flag: string;
    continent: string;
    temperature: number;
    language: string;
    image: string;
    rating: number;
    description: string;
    costs: Costs | null;
    totalCost: number;
    cities: City[] | null;
};

export type User = {
    id: number;
    email: string;
    name: string;
    provider: string | null;
    image: string | StaticImport;
    created_At: string;
} | null;