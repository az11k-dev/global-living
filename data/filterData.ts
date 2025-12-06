// data/filterData.ts
import {FilterItem} from "@/components/FilterSection";

export const ContinentItems: FilterItem[] = [
    {label: "Asia", value: "asia"},
    {label: "Europe", value: "europe"},
    {label: "South America", value: "south america"},
    {label: "North America", value: "north america"},
    {label: "Africa", value: "africa"},
    {label: "Oceania", value: "oceania"},
];

export const CountryItems: FilterItem[] = [
    {label: "USA", value: "usa"},
    {label: "Hungary", value: "hungary"},
    {label: "Uzbekistan", value: "uzbekistan"},
    {label: "Germany", value: "germany"},
];

export const LanguageItems: FilterItem[] = [
    {label: "English", value: "english"},
    {label: "Spanish", value: "spanish"},
    {label: "Portuguese", value: "portuguese"},
    {label: "French", value: "french"},
    {label: "German", value: "german"},
    {label: "Uzbek", value: "uzbek"},
];

export const CostItems: FilterItem[] = [
    {label: "Under $1,000", value: "1000"},
    {label: "$1,000 - $2,000", value: "2000"},
    {label: "$2,000 - $3,000", value: "3000"},
    {label: "Over $3,000", value: "300000"},
];

export const PopulationItems: FilterItem[] = [
    {label: "50,000+", value: "50000"},
    {label: "100,000+", value: "100000"},
    {label: "200,000+", value: "200000"},
    {label: "500,000+", value: "500000"},
];

export const SafetyItems: FilterItem[] = [
    {label: "4.5+ Excellent", value: "4.5"},
    {label: "4.0+ Very Good", value: "4.0"},
    {label: "3.5+ Good", value: "3.5"},
    {label: "3.0+ Fair", value: "3.0"},
];