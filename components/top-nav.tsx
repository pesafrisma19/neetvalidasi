"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-[70px] flex items-center transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <BadgeCheck className="w-5 h-5" />
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                        NEET VALIDASI
                    </Link>
                </div>

                {/* Right: Menu Links & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/" className="text-foreground hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="/bank" className="hover:text-blue-600 transition-colors">Bank</Link>
                        <Link href="/ewallet" className="hover:text-blue-600 transition-colors">E-Wallet</Link>
                        <Link href="/ktp" className="hover:text-blue-600 transition-colors">OCR KTP</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
