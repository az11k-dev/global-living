import Link from 'next/link';
import {Twitter, Instagram, Linkedin} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 px-[152px] pt-16 pb-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section: Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Description */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            {/* CSS representation of the logo icon */}
                            <div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm"></div>
                            <span className="text-xl font-bold text-gray-900">
                Global <span className="text-blue-500">Living</span>
              </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                            Helping you find the perfect place to live, work, and explore. Data-driven insights for the
                            modern global citizen.
                        </p>
                    </div>

                    {/* Column 2: Discover */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Discover</h3>
                        <ul className="space-y-3">
                            <li><Link href="/countries"
                                      className="text-gray-500 hover:text-blue-600 transition-colors">Countries</Link>
                            </li>
                            <li><Link href="/cities"
                                      className="text-gray-500 hover:text-blue-600 transition-colors">Cities</Link></li>
                            <li><Link href="#"
                                      className="text-gray-500 hover:text-blue-600 transition-colors">Rankings</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">About
                                Us</Link></li>
                            <li><Link href="#"
                                      className="text-gray-500 hover:text-blue-600 transition-colors">Careers</Link>
                            </li>
                            <li><Link href="#"
                                      className="text-gray-500 hover:text-blue-600 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of
                                Service</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy
                                Policy</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Cookie
                                Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-gray-400 text-sm">
                            © 2025 Global Living Inc. All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Twitter size={20}/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                                <Instagram size={20}/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                                <Linkedin size={20}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;