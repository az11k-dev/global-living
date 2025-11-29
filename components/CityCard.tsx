import React from 'react';
import Image from 'next/image';

type Item = {
    id: number;
    img: string;
    name: string;
    rating: number;
    country: string;
    col: number;
    safety: string;
}

type CityCardProps = {
    item: Item;
}

const CityCard = ({item}: CityCardProps) => {
    return (
        // Main Card Container
        <div
            className="max-w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 font-sans mx-auto my-10 transition-transform hover:scale-105 duration-300">

            {/* 1. Image Section */}
            <div className="relative h-[240px] w-full">
                {/* Replace 'src' with your actual image path */}
                <Image
                    src={item?.img}
                    alt={item?.name}
                    fill
                    className="object-cover"
                />

                {/* Rating Badge */}
                <div
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    {/* Star Icon (SVG) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-400"
                    >
                        <path fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"/>
                    </svg>
                    <span className="text-xs font-bold text-slate-800">{item?.rating}</span>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="p-6">

                {/* Title & Subtitle */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">{item?.name}</h2>
                    <p className="text-slate-500 font-medium">{item?.country}</p>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-slate-100 my-4"></div>

                {/* Stats Row */}
                <div className="flex justify-between items-end">

                    {/* Cost of Living */}
                    <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Cost of Living
            </span>
                        <div className="text-slate-900 font-bold text-lg">
                            ${item?.col.toLocaleString("en-US")}
                            <span className="text-slate-400 text-sm font-normal">/mo</span>
                        </div>
                    </div>

                    {/* Safety */}
                    <div className="flex flex-col gap-1 text-right">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Safety
            </span>
                        <span className="text-indigo-600 font-bold text-lg">
              {item?.safety}
            </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CityCard;