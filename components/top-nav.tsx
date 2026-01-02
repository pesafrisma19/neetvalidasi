"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-[70px] flex items-center">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ios-blue rounded-lg flex items-center justify-center text-white">
                        <BadgeCheck className="w-5 h-5" />
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
                        NEET VALIDASI
                    </Link>
                </div>

                {/* Right: Menu Links & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Link href="/" className="text-black dark:text-white hover:text-ios-blue transition-colors">Home</Link>
                        <Link href="/bank" className="hover:text-ios-blue transition-colors">Bank</Link>
                        <Link href="/ewallet" className="hover:text-ios-blue transition-colors">E-Wallet</Link>
                        <Link href="/ktp" className="hover:text-ios-blue transition-colors">OCR KTP</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
