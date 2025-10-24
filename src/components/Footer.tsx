'use client';

import { FiInstagram, FiGithub, FiMessageCircle } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="block lg:hidden py-4">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold font-daydream text-white">
                                MUMET.IN
                            </h2>
                            <p className="text-gray-400 text-sm mt-2">
                                Dari Mumet Jadi Beres!
                            </p>
                        </div>
                        <div className="flex items-center justify-center space-x-6">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#c41e2e] rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 group"
                                aria-label="Instagram"
                            >
                                <FiInstagram
                                    size={20}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                            </a>
                            <a
                                href="https://wa.me/6285933648537"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#c41e2e] rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 group"
                                aria-label="WhatsApp"
                            >
                                <FiMessageCircle
                                    size={20}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#c41e2e] rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 group"
                                aria-label="GitHub"
                            >
                                <FiGithub
                                    size={20}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                            </a>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm">
                                &copy; {currentYear} Mumet.in. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold font-daydream text-white">
                                MUMET.IN
                            </h2>
                            <span className="text-gray-500">|</span>
                            <p className="text-gray-500 text-sm">
                                &copy; {currentYear} Mumet.in. All rights reserved.
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a
                                href="https://www.instagram.com/mumet.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-[#c41e2e] rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 group"
                            >
                                <FiInstagram
                                    size={18}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                                <span className="text-sm group-hover:text-[#c41e2e] text-white transition-colors">
                                    Instagram
                                </span>
                            </a>

                            <a
                                href="https://wa.me/6285933648537"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-[#c41e2e] rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 group"
                            >
                                <FiMessageCircle
                                    size={18}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                                <span className="text-sm group-hover:text-[#c41e2e] text-white transition-colors">
                                    WhatsApp
                                </span>
                            </a>

                            <a
                                href="https://github.com/ardhikaxx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-[#c41e2e] rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 group"
                            >
                                <FiGithub
                                    size={18}
                                    className="text-white group-hover:text-[#c41e2e] transition-colors"
                                />
                                <span className="text-sm group-hover:text-[#c41e2e] text-white transition-colors">
                                    GitHub
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;