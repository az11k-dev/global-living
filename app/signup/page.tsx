'use client';

import img from "@/public/images/home-background.png"
import React, {useCallback, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {User, Mail, Lock, Globe, CheckCheck} from 'lucide-react';
import {Github, Google} from "@/assets";

export default function SignUpPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const fetchUp = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fullName: fullName,
                }),
            });

            const data = await response.json();
            console.log("SERVER RESPONSE:", data);

        } catch (error) {
            console.error("LOGIN ERROR:", error);
        } finally {
            setLoading(false);
        }
    }, [email, password]);
    return (
        <div
            className="relative min-h-screen w-full font-sans text-white antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="fixed inset-0 z-0">
                <Image
                    src={img}
                    alt="City Skyline"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
            </div>
            <div className="relative z-10 w-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-[520px]  px-4">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden  transform transition-all duration-300 hover:scale-[1.01]">
                        <div className="px-6 py-5 sm:px-10">
                            <div className="mb-8 text-center">
                                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-2">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-lg">
                                        <Globe className="w-6 h-6 text-white"/>
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">GlobalLiving</h2>
                                </div>
                                <h1 className="text-2xl font-semibold text-white mb-2">Create your account</h1>
                                <p className="text-slate-300 text-sm">Start exploring cities worldwide today.</p>
                            </div>
                            {/* Form */}
                            <form className="space-y-5" action="#" method="POST" onSubmit={(e) => {
                                e.preventDefault();
                                fetchUp();
                            }}>
                                {/* Full Name */}
                                <div className="relative group">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User
                                            className="w-5 h-5 text-slate-400 group-focus-within:text-white transition-colors"/>
                                    </div>
                                    <input
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        placeholder="Full Name"
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 transition-all duration-200 sm:text-sm"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative group">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail
                                            className="w-5 h-5 text-slate-400 group-focus-within:text-white transition-colors"/>
                                    </div>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Email address"
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 transition-all duration-200 sm:text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="relative group">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock
                                                className="w-5 h-5 text-slate-400 group-focus-within:text-white transition-colors"/>
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 transition-all duration-200 sm:text-sm"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CheckCheck
                                                className="w-5 h-5 text-slate-400 group-focus-within:text-white transition-colors"/>
                                        </div>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            placeholder="Confirm"
                                            className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 transition-all duration-200 sm:text-sm"
                                        />
                                    </div>
                                </div>


                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-offset-0 focus:ring-indigo-500/50"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-slate-300">
                                        I agree to the <Link href="#"
                                                             className="text-white hover:underline">Terms</Link> and <Link
                                        href="#" className="text-white hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>

                                {/* Submit */}
                                <button type="submit"
                                        className="flex w-full justify-center rounded-xl bg-white px-3 py-3.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-slate-100 transition-all duration-200 transform hover:scale-[1.01]">
                                    Create Account
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-transparent px-2 text-slate-400 backdrop-blur-sm">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button
                                        className="flex w-full items-center justify-center  rounded-xl bg-white/5 px-3 py-3 text-white border border-white/10 hover:bg-white/10 transition-all duration-200">
                                        <Google className="w-4 h-4 mr-2 fill-white"/>
                                        <span className="text-sm font-medium">Google</span>
                                    </button>
                                    <button
                                        className="flex w-full items-center justify-center rounded-xl bg-white/5 px-3 py-3 text-white border border-white/10 hover:bg-white/10 transition-all duration-200">
                                        <Github className="w-4 h-4 mr-2"/>
                                        <span className="text-sm font-medium">GitHub</span>
                                    </button>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-sm text-slate-400">
                                Already have an account?{' '}
                                <Link href="/login" className="font-medium text-white hover:underline">Sign in</Link>
                            </p>

                        </div>
                    </div>
                    <div className="mt-8 text-center text-xs text-slate-500">
                        <Link href="#" className="hover:text-slate-300 mx-2">Help Center</Link> •
                        <Link href="#" className="hover:text-slate-300 mx-2">Contact Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}