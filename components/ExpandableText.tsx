"use client";
import { ArrowRight } from "lucide-react";
import {useState} from "react";
import React from 'react';
interface ExpandableTextProps {
    text: string;
    maxLength?: number;
}
export const ExpandableText: React.FC<ExpandableTextProps> = ({text, maxLength = 100,}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLong = text.length > maxLength;
    const displayedText = isExpanded || !isLong
        ? text
        : text.substring(0, maxLength) + '...';
    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };
    return (
        <div className={"mb-[5px]"}>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {displayedText}
            </p>
            {isLong && (
                <h1 onClick={toggleExpand} className={"flex items-center text-[#3B82F6] gap-1 cursor-pointer hover:text-blue-600 transition py-[20px]"}>
                    {isExpanded ? 'Read more' : 'Read more'}
                    <ArrowRight size={18} style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                    }} />
                </h1>
            )}
        </div>
    );
};