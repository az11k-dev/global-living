import Image from "next/image";
import ai from "@/public/images/Ai.png"
import ai2 from "@/public/images/ai2.png"
import React from "react";
import {ArrowRight, Lightbulb, Check, X, Bot} from "lucide-react";
import flag from "@/public/images/uzb.png"
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const data = [
    {
        id: 1,
        countryName: "Australia",
        image: flag,
        txt: "  Lorem ipsum is placeholder text1",
        unTxt: " Lorem ipsum is placeholder text1",
    },
    {
        id: 2,
        countryName: "Russia",
        image: flag,
        txt: "  Lorem ipsum is placeholder text2",
        unTxt: " Lorem ipsum is placeholder text2",
    },
    {
        id: 3,
        countryName: "India",
        image: flag,
        txt: "  Lorem ipsum is placeholder text3",
        unTxt: " Lorem ipsum is placeholder text3",
    }
]
interface Props {
    query: string;
}

export default function AIsummary({ query }: Props) {
    const [loading, setLoading] = React.useState(false);
    const [aiResponse, setAiResponse] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchSummary = async () => {
            if (!query) return;

            const cacheKey = `ai-summary-${query}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                setAiResponse(cachedData);
                return;
            }

            setLoading(true);
            setAiResponse(null);

            try {
                const response = await fetch("/api/ai", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: query }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch AI summary");
                }

                const data = await response.json();
                setAiResponse(data);
                localStorage.setItem(cacheKey, data);
            } catch (error) {
                console.error("Error generating summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [query]);

    return (
        <div className={"py-[30px] flex  justify-between gap-10"}>
            <div className={"bg-blue-100 p-[30px] rounded-xl border-1 border-blue-300"}>
                <div className={"flex items-center gap-3"}>
                    <div className="p-4 bg-[#5d5cf0] rounded-xl">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h1 className={"text-[20px] font-[700]"}>
                        AI Summary for {query}
                    </h1>
                </div>

                <div className={"mb-[20px] flex flex-col gap-3 text-gray-600 mt-5"}>
                    {loading && (
                         <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-2 text-gray-500">Generating comprehensive summary for {query}...</p>
                        </div>
                    )}

                    {!loading && aiResponse && (
                        <div className="prose prose-blue max-w-none">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}

                    {!loading && !aiResponse && !loading && (
                        <div className="text-gray-500 italic">
                            Could not load summary. Please check your connection or try again later.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
