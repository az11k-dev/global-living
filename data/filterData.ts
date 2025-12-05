// data/filterData.ts
import {FilterItem} from "@/components/FilterSection";

export const ContinentItems: FilterItem[] = [
    {label: "Asia", value: "asia", count: 147},
    {label: "Europe", value: "europe", count: 98},
    {label: "South America", value: "south-america", count: 62},
    {label: "North America", value: "north-america", count: 41},
    {label: "Africa", value: "africa", count: 34},
    {label: "Oceania", value: "oceania", count: 21},
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

export const SafetyItems: FilterItem[] = [
    {label: "4.5+ Excellent", value: "4.5"},
    {label: "4.0+ Very Good", value: "4.0"},
    {label: "3.5+ Good", value: "3.5"},
    {label: "3.0+ Fair", value: "3.0"},
];