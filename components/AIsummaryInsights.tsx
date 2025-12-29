import { Bot, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react"; // Используем иконки lucide-react

export default function AIsummaryInsights() {
    return (
        <div className={"pb-[30px]"}>
            <div className=" p-8 bg-white rounded-[24px] border  shadow-xl border-gray-100">
                {/* Заголовок с иконкой робота */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#5d5cf0] rounded-lg">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
                        AI Summary & Insights
                    </h2>
                </div>


                <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100 mb-6">
                    <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                        <p>
                            Barcelona stands out as an exceptional destination for digital nomads, combining Mediterranean lifestyle with modern infrastructure. The city offers a unique blend of affordable living compared to other Western European capitals, excellent weather year-round, and a thriving international community.
                        </p>
                        <p>
                            Key strengths include reliable high-speed internet, abundant coworking spaces, and a vibrant social scene. However, be prepared for higher costs than Southeast Asia and occasional language barriers outside tourist areas. The city's work-life balance culture and beach proximity make it ideal for those seeking productivity with lifestyle quality.
                        </p>
                    </div>
                </div>

                {/* Сетка с карточками преимуществ и советов */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Карточка: Best For */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <h3 className="font-bold text-gray-900">Best For</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Beach lovers</li>
                            <li>• Culture enthusiasts</li>
                            <li>• Social nomads</li>
                        </ul>
                    </div>

                    {/* Карточка: Challenges */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                            <h3 className="font-bold text-gray-900">Challenges</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Tourist crowds</li>
                            <li>• Higher costs</li>
                            <li>• Pickpocketing risk</li>
                        </ul>
                    </div>

                    {/* Карточка: Pro Tips */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-5 h-5 text-blue-500" />
                            <h3 className="font-bold text-gray-900">Pro Tips</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Stay in Gracia</li>
                            <li>• Learn basic Spanish</li>
                            <li>• Join nomad groups</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}