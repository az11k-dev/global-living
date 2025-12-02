import React from "react";

const FilterSection = ({title, items, type = "checkbox"}:
                       {
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
export default FilterSection;