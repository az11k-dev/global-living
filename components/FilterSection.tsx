// components/FilterSection.tsx (Версия с onClick для сброса)
import React from 'react';

export interface FilterItem {
    label: string;
    value: string; // Обязательное поле для URL
}

interface FilterSectionProps {
    title: string;
    filterName: string;
    activeValue?: string;
    onFilterChange: (filterName: string, filterValue: string | null) => void;
    items: FilterItem[];
    // Тип 'checkbox' или 'radio' здесь используется только для стилизации,
    // так как функционально мы обрабатываем одиночный выбор для всех секций.
    type?: "checkbox" | "radio";
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         title,
                                                         filterName,
                                                         activeValue,
                                                         onFilterChange,
                                                         items,
                                                         type = "checkbox"
                                                     }) => {

    // Единый обработчик, который может сбрасывать фильтр при повторном клике
    const handleClick = (itemValue: string) => {
        const newValue = itemValue === activeValue ? null : itemValue;
        onFilterChange(filterName, newValue);
    };

    return (
        <div className="mb-8">
            <h4 className="font-bold text-sm text-gray-900 mb-3">{title}</h4>
            <div className="space-y-2">
                {items.map((item) => {
                    const isChecked = item.value === activeValue;

                    // Используем кликабельный div, стилизованный под фильтр,
                    // чтобы обеспечить сброс при повторном клике (лучший UX для фильтрации)
                    const itemClasses = `
                        flex items-center group cursor-pointer p-2 rounded transition-all
                        ${isChecked
                        ? 'bg-blue-600 shadow-sm'
                        : 'hover:bg-gray-100'
                    }
                    `;

                    return (
                        <div
                            key={item.value}
                            className={itemClasses}
                            onClick={() => handleClick(item.value)}
                        >
                            {/* Имитация элемента управления (квадрат/круг) */}
                            <div className={`
                                w-4 h-4 mr-3 transition-colors flex items-center justify-center
                                ${type === 'radio' ? 'rounded-full' : 'rounded'}
                                ${isChecked ? 'bg-white border-blue-600' : 'bg-white border border-gray-300'}
                            `}>
                                {/* Визуальный индикатор выбора */}
                                {isChecked && (
                                    <svg className={`w-3 h-3 ${type === 'radio' ? 'rounded-full' : ''}`} fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor"
                                         style={{color: type === 'radio' ? '#1D4ED8' : 'white'}}>
                                        {/* Если radio, можно просто кружок, если checkbox - галочка */}
                                        {type !== 'radio' &&
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>}
                                    </svg>
                                )}
                            </div>

                            {/* Текст фильтра */}
                            <span className={`text-sm flex-grow transition-colors 
                                ${isChecked ? 'text-white font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}
                            >
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default FilterSection;