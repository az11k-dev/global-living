export type CostBreakdown = {
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
    costs: CostBreakdown;
    totalCost: number;
};