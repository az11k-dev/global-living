"use client";
import React, { useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const MediaStep = ({ formData, setFormData }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                url: URL.createObjectURL(file),
                file: file
            }));

            setFormData({
                ...formData,
                images: [...(formData.images || []), ...newImages]
            });
        }
    };

    const removeImage = (id: string) => {
        const filteredImages = formData.images.filter((img: any) => img.id !== id);
        setFormData({ ...formData, images: filteredImages });
    };

    return (
        <div className="animate-in fade-in duration-500">
            <h3 className="text-[19px] font-bold mb-6 text-[#0f172a]">Upload Media</h3>

            <div className="space-y-6">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group"
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="text-[#2563eb]" size={28} />
                    </div>
                    <p className="text-[#0f172a] font-bold text-lg mb-1">Click or drag images here</p>
                    <p className="text-[#64748b] text-sm">Support JPG, PNG, WEBP (Max 5MB each)</p>
                </div>

                {formData.images && formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {formData.images.map((img: any) => (
                            <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                                <img
                                    src={img.url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="bg-white/20 hover:bg-red-500 p-2 rounded-full text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <ImageIcon className="text-blue-500 shrink-0" size={20} />
                    <p className="text-[13px] text-blue-700 leading-relaxed">
                        Adding photos helps other users better understand your experience.
                        You can upload up to 10 photos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MediaStep;