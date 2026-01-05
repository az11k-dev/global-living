"use client";

import React from "react";
import { Info } from "lucide-react";

interface RatingsStepProps {
    formData: any;
    setFormData: (data: any) => void;
}

const RatingsStep = ({ formData, setFormData }: RatingsStepProps) => {
    const criteria = [
        { key: "overall", label: "Overall Experience" },
        { key: "value", label: "Value for Money" },
        { key: "service", label: "Quality of Service" },
        { key: "recommend", label: "Would Recommend" },
    ];

    const handleSliderChange = (key: string, value: string) => {
        setFormData({
            ...formData,
            ratings: {
                ...formData.ratings,
                [key]: parseInt(value),
            },
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-[19px] font-bold mb-8 text-[#0f172a]">Rate Your Experience</h3>

            <div className="space-y-6 mb-10">
                {criteria.map((item) => (
                    <div key={item.key} className="bg-[#f8fafc] p-6 rounded-[16px] border border-gray-100 transition-all hover:shadow-sm">
                        <div className="flex justify-between items-center mb-5">
                            <span className="font-bold text-[#334155] text-[15px]">{item.label}</span>
                            <span className="text-[#2563eb] font-black text-xl">
                {formData.ratings?.[item.key] || 5}
              </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={formData.ratings?.[item.key] || 5}
                            onChange={(e) => handleSliderChange(item.key, e.target.value)}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
                        />

                        <div className="flex justify-between mt-3 text-[11px] font-bold text-[#94a3b8] px-0.5">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[12px] p-4 flex gap-3 items-start">
                <Info size={18} className="text-[#2563eb] shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-[#1e40af] text-[14px] font-bold mb-1">Rating Guide</h4>
                    <p className="text-[#1e40af] text-[12px] opacity-80 leading-relaxed font-medium">
                        0-3: Poor | 4-6: Average | 7-8: Good | 9-10: Excellent
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RatingsStep;