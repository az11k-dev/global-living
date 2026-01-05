"use client";

import React from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link2 } from "lucide-react";

interface ReviewContentProps {
    formData: any;
    setFormData: (data: any) => void;
    showError: boolean;
}

const ReviewContent = ({ formData, setFormData, showError }: ReviewContentProps) => {
    return (
        <div className="animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-[19px] font-bold mb-6 text-[#0f172a]">Review Content</h3>
            <div className="mb-6">
                <label className="block text-sm font-bold text-[#334155] mb-2">Review Title</label>
                <input
                    type="text"
                    placeholder="Summarize your experience"
                    className={`w-full border rounded-[12px] p-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all 
                    ${showError && !formData.reviewTitle ? "border-red-500 bg-red-50" : "border-gray-200 text-[#1e293b]"}`}
                    value={formData.reviewTitle}
                    onChange={(e) => setFormData({ ...formData, reviewTitle: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Your Review</label>
                <div className={`border rounded-[12px] overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all 
                    ${showError && formData.reviewText.length < 100 ? "border-red-500 bg-red-50" : "border-gray-200"}`}>

                    <div className="flex items-center gap-5 p-3.5 border-b border-gray-100 bg-[#f8fafc]">
                        <Bold size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                        <Italic size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                        <Underline size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                        <div className="w-[1.5px] h-5 bg-gray-200 mx-1"></div>
                        <List size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                        <ListOrdered size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                        <div className="w-[1.5px] h-5 bg-gray-200 mx-1"></div>
                        <Link2 size={19} className="cursor-pointer text-[#475569] hover:text-[#2563eb] transition-colors" />
                    </div>

                    <textarea
                        placeholder="Share your detailed experience, what you liked, what could be improved..."
                        className="w-full p-4 min-h-[240px] outline-none resize-none text-[#334155] text-[15px] leading-relaxed placeholder:text-gray-400"
                        value={formData.reviewText}
                        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    ></textarea>
                </div>
                <div className="mt-2.5">
                    <p className={`text-[13px] font-medium transition-colors ${formData.reviewText.length < 100 ? "text-[#64748b]" : "text-green-600 flex items-center gap-1"}`}>
                        {formData.reviewText.length < 100
                            ? `Minimum 100 characters (${formData.reviewText.length}/100)`
                            : <> <span className="text-lg">✓</span> Enough content provided</>
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewContent;