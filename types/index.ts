export type Costs = {
    id: number;
    countryId: number;
    rent: number;
    food: number;
    transport: number;
};

export type Country = {
    id: number;
    name: string;
    flag: string;
    image: string;
    rating: number;
    description: string;
    costs: Costs | null;
    totalCost: number;
};