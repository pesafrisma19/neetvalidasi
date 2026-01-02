"use client";

import { Home, CreditCard, Wallet, ScanLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const NAV_ITEMS = [
        { label: "Home", href: "/", icon: Home },
        { label: "Bank", href: "/bank", icon: CreditCard },
        { label: "Wallet", href: "/ewallet", icon: Wallet },
        { label: "KTP", href: "/ktp", icon: ScanLine },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border pb-safe transition-colors duration-300">
            <div className="grid grid-cols-4 h-[60px]">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 ${isActive
                                    ? "text-blue-600"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}
