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
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-safe md:hidden z-50">
            <div className="flex justify-around items-center px-2 py-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 min-w-[60px]",
                                isActive ? "text-primary-blue" : "text-gray-400 hover:text-gray-600 dark:text-gray-500"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
