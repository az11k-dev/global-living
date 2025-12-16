import React from 'react';
import {Bot, TrendingUp, Wallet, Sparkles} from 'lucide-react';

const AiMatchSection = () => {
    return (
        <section
            className="bg-gradient-to-r px-24 from-[#111827] to-[#312E81] text-white flex items-center justify-center relative overflow-hidden py-16">
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none"/>
            <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"/>
            <div className="container flex justify-between items-center relative z-10">

                {/* --- Левая колонка: Контент --- */}
                <div className="space-y-8">

                    {/* Бейдж */}
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#242859] border border-[#41468a] text-xs font-semibold text-[#A5B4FC] w-fit">
                        <Bot size={16}/>
                        <span>AI POWERED</span>
                    </div>

                    {/* Заголовок и описание */}
                    <div className="space-y-4 pr-16">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Let AI Find Your Perfect Match
                        </h1>
                        <p className="text-[#C7D2FE] font-normal max-w-2xl text-lg leading-relaxed">
                            Not sure where to go? Our LifeRadar AI analyzes your preferences,
                            budget, and lifestyle to recommend hidden gems you might have missed.
                        </p>
                    </div>

                    {/* Список фич */}
                    <div className="space-y-6">
                        {/* Фича 1 */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-[#2A2E67] text-blue-400">
                                <TrendingUp color={"#A5B4FC"} size={24}/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-white">Personalized Trends</h3>
                                <p className="text-[#C7D2FE] font-normal text-sm">Get insights based on your unique
                                    profile data.</p>
                            </div>
                        </div>

                        {/* Фича 2 */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-[#2A2E67] text-blue-400">
                                <Wallet color={"#A5B4FC"} size={24}/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-white">Budget Optimization</h3>
                                <p className="text-[#C7D2FE] font-normal text-sm">Find places where your money goes
                                    further.</p>
                            </div>
                        </div>
                    </div>

                    {/* Кнопка */}
                    <button
                        className="group mt-4 cursor-pointer flex items-center font-bold text-base gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-purple-900/20">
                        Check AI Suggestions
                        <Sparkles size={18} className="group-hover:rotate-12 transition-transform"/>
                    </button>
                </div>

                {/* --- Правая колонка: Карточка (Card) --- */}
                <div className="relative max-w-[600px]">
                    {/* Декоративный задний фон карточки для глубины */}
                    <div
                        className="absolute -inset-1 bg-[#3e3f6f] rounded-3xl blur opacity-70"/>

                    <div
                        className="relative bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">

                        {/* Верхняя часть карточки */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-inner">
                                    {/* Простой кружок вместо аватара */}
                                    <div className="w-full h-full rounded-full opacity-80"/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-white">Weekly Insight</h3>
                                    <p className="text-xs font-normal text-[#C7D2FE]">Generated just now</p>
                                </div>
                            </div>
                            <span
                                className="px-3 py-1 rounded-lg bg-green-500/20 text-[#86EFAC] text-xs font-bold border border-green-500/20">
                98% Match
              </span>
                        </div>

                        {/* Цитата/Контент */}
                        <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 mb-6">
                            <p className="text-slate-300 text-sm leading-relaxed italic">
                                {'"Based on your love for'} <span
                                className="text-white font-semibold">surfing</span> and <span
                                className="text-white font-semibold">low cost of living</span>, we recommend looking
                                into <span className="text-white font-semibold">Da Nang, Vietnam</span>.{'"'}
                            </p>
                        </div>

                        {/* Статистика (3 блока внизу) */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Rent */}
                            <div className="bg-slate-700/30 p-3 rounded-xl text-center border border-white/5">
                                <p className="text-xs text-[#9CA3AF] font-normal mb-1">Rent</p>
                                <p className="text-white text-base font-bold">$450</p>
                            </div>

                            {/* Safety */}
                            <div className="bg-slate-700/30 p-3 rounded-xl text-center border border-white/5">
                                <p className="text-xs text-[#9CA3AF] font-normal mb-1">Safety</p>
                                <p className="text-green-400 text-base font-bold">High</p>
                            </div>

                            {/* Weather */}
                            <div className="bg-slate-700/30 p-3 rounded-xl text-center border border-white/5">
                                <p className="text-xs text-[#9CA3AF] font-normal mb-1">Weather</p>
                                <p className="text-yellow-400 text-base font-bold">28°C</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiMatchSection;