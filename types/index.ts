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
    language: string;
    image: string;
    rating: number;
    description: string;
    costs: Costs | null;
    totalCost: number;
    cities: City[] | null;
};