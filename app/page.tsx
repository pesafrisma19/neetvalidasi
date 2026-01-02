import { IOSCard } from '@/components/ui/ios-card';
import { BadgeCheck, CreditCard, ScanLine, Wallet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const MENU_ITEMS = [
    {
        title: "Cek Rekening",
        description: "Validasi Bank",
        href: "/bank",
        icon: CreditCard,
        color: "bg-ios-blue",
        delay: 0.1
    },
    {
        title: "Cek E-Wallet",
        description: "Validasi E-Wallet",
        href: "/ewallet",
        icon: Wallet,
        color: "bg-ios-green",
        delay: 0.2
    },
    {
        title: "OCR KTP",
        description: "Scan Identitas",
        href: "/ktp",
        icon: ScanLine,
        color: "bg-ios-yellow",
        delay: 0.3
    }
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-ios-bg p-6 pt-12 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-ios-blue/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-ios-green/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Header */}
            <div className="mb-10 relative z-10">
                <h1 className="text-[34px] font-bold tracking-tight text-black mb-1">
                    Validasi
                </h1>
                <p className="text-[17px] text-gray-500 font-medium">
                    Tools Verifikasi Digital
                </p>
            </div>

            {/* Menu Grid */}
            <div className="grid gap-5 relative z-10 h-full">
                {MENU_ITEMS.map((item, index) => (
                    <Link href={item.href} key={item.href} className="block group">
                        <IOSCard className="flex items-center gap-5 transition-transform duration-300 active:scale-95 hover:bg-white/80 border-white/40">
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-lg shadow-${item.color}/30 text-white`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[20px] font-semibold text-black leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-[15px] text-gray-400 font-medium mt-0.5">
                                    {item.description}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 13.5L7.5 8L2.5 2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </IOSCard>
                    </Link>
                ))}
            </div>

            <div className="mt-auto py-6 text-center text-xs text-gray-400 font-medium">
                &copy; 2026 NEET Validasi. All rights reserved.
            </div>
        </div>
    );
}
