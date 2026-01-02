"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-[70px] flex items-center">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    {/* Logo Icon Placeholder */}
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary-purple to-primary-blue rounded-lg rotate-12 flex items-center justify-center text-white font-bold text-lg">
                        V
                    </div>
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-primary-blue">
                        VELIXS<span className="text-black dark:text-white font-normal text-xl">.com</span>
                    </Link>
                </div>

                {/* Center: Quick Center (Search) - Mobile/Desktop mixed */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <button className="w-full flex items-center gap-2 bg-ios-gray-100 dark:bg-ios-gray-600/30 rounded-full px-4 py-2.5 text-gray-400 hover:bg-ios-gray-200 dark:hover:bg-ios-gray-600/50 transition-colors">
                        <div className="p-1 bg-primary-blue/10 rounded flex items-center justify-center text-primary-blue">
                            <div className="grid grid-cols-2 gap-0.5">
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-sm font-medium">Quick Center</span>
                        <Search className="w-4 h-4 ml-auto" />
                    </button>
                </div>

                {/* Right: Menu Links & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Link href="/" className="text-black dark:text-white hover:text-primary-blue transition-colors">Home</Link>
                        <Link href="/bank" className="hover:text-primary-blue transition-colors">Projects</Link>
                        <Link href="/blog" className="hover:text-primary-blue transition-colors">Blog</Link>
                        <Link href="/api" className="hover:text-primary-blue transition-colors">Rest API</Link>
                        <Link href="/pages" className="hover:text-primary-blue transition-colors">Pages</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="md:hidden p-2 text-gray-500">
                            <Search className="w-6 h-6" />
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
