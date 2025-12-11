'use client';
import {Country} from "@/types";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import CostBreakdown from "@/components/CostBreakdown";

type CountryProps = {
    country: Country;
}

export default function AggregatedPrices() {
    return (
        <div className="py-[40px]">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 ">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-[24px] font-[700] text-gray-800">Aggregated Prices</h1>
                </div>
                <div className="flex flex-col lg:flex-row h-full">
                    <MonthlyExpensesChart/>
                    <CostBreakdown/>
                </div>
            </div>
        </div>
    );
}

