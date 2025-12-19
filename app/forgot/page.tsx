'use client';
import img from '@/public/images/home-background.png'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Mail,  Globe} from 'lucide-react';


export default function ForgotPage() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center p-4 font-sans text-white antialiased overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={img}
                    alt="City Skyline"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
            </div>


            <div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] z-0 animate-pulse"></div>
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] z-0 animate-pulse"
                style={{animationDelay: '2s'}}></div>


            <main className="w-full max-w-md z-10 relative">


                <div
                    className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 w-full shadow-2xl transform transition-all duration-300 hover:scale-[1.01]">


                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 text-white ring-1 ring-white/20">
                            <Globe className="w-7 h-7"/>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">GlobalLiving</h1>
                        <p className="text-gray-300 text-sm font-light">Explore cities. Compare living costs. Plan your
                            future.</p>
                    </div>


                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>


                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 ml-1">Email
                                Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail
                                        className="w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors"/>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all duration-200"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-navy-950 text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all duration-200 transform hover:-translate-y-0.5 mt-2"
                        >
                            Sent reset link
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600/50"></div>
                            </div>

                        </div>


                    </form>


                    <div className="mt-8 text-center">
                        <Link href="/login"
                              className="font-medium text-gray-400 hover:text-blue-300 transition-colors ml-1"> Back to
                            Sign In</Link>
                    </div>
                </div>


            </main>
        </div>
    );
}