"use client";
import React from "react";
import { X, Plus } from "lucide-react";

const PricesStep = ({ formData, setFormData }: any) => {
    const addPriceBlock = () => {
        const newPrices = [
            ...(formData.prices || []),
            { id: Date.now(), category: "", label: "", amount: "", currency: "USD" }
        ];
        setFormData({ ...formData, prices: newPrices });
    };

    const removePriceBlock = (id: number) => {
        const filteredPrices = formData.prices.filter((p: any) => p.id !== id);
        setFormData({ ...formData, prices: filteredPrices });
    };

    const updatePrice = (id: number, field: string, value: string) => {
        const updatedPrices = formData.prices.map((p: any) =>
            p.id === id ? { ...p, [field]: value } : p
        );
        setFormData({ ...formData, prices: updatedPrices });
    };

    const prices = formData.prices && formData.prices.length > 0
        ? formData.prices
        : [];

    return (
        <div className="animate-in fade-in duration-500">
            <h3 className="text-[19px] font-bold mb-6 text-[#0f172a]">Price Information</h3>

            <div className="space-y-6">
                {prices.map((item: any) => (
                    <div key={item.id} className="relative p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
                        <button
                            onClick={() => removePriceBlock(item.id)}
                            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                                <label className="block text-[13px] font-bold text-[#475569] mb-2">Category</label>
                                <select
                                    className="w-full border border-gray-200 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-blue-100"
                                    value={item.category}
                                    onChange={(e) => updatePrice(item.id, "category", e.target.value)}
                                >
                                    <option value="">Select category</option>
                                    <option value="rent">Rent</option>
                                    <option value="food">Food</option>
                                    <option value="transport">Transport</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-[#475569] mb-2">Label</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Monthly Rent"
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-100"
                                    value={item.label}
                                    onChange={(e) => updatePrice(item.id, "label", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-[#475569] mb-2">Amount</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-100"
                                    value={item.amount}
                                    onChange={(e) => updatePrice(item.id, "amount", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-[#475569] mb-2">Currency</label>
                                <select
                                    className="w-full border border-gray-200 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-blue-100"
                                    value={item.currency}
                                    onChange={(e) => updatePrice(item.id, "currency", e.target.value)}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="UZS">UZS (so'm)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addPriceBlock}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[#64748b] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-blue-200 transition-all group"
                >
                    <Plus size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                    Add Price Block
                </button>
            </div>
        </div>
    );
};

export default PricesStep;