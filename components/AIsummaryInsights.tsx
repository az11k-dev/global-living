import { Bot } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
    query: string;
}

export default function AIsummaryInsights({ query }: Props) {
    const [loading, setLoading] = React.useState(false);
    const [aiResponse, setAiResponse] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchSummary = async () => {
            if (!query) return;

            const cacheKey = `ai-summary-city-${query}`;
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
        <div className={"pb-[30px]"}>
            <div className=" p-8 bg-white rounded-[24px] border  shadow-xl border-gray-100">
                {/* Заголовок с иконкой робота */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#5d5cf0] rounded-lg">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
                        AI Summary & Insights for {query}
                    </h2>
                </div>


                <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100 mb-6">
                    <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                        {loading && (
                            <div className="text-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-2 text-gray-500">Generating insights for {query}...</p>
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
        </div>
    );
}