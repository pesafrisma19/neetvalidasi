import { IOSCard } from '@/components/ui/ios-card';
import { BadgeCheck, CreditCard, ScanLine, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
    {
        title: "Cek Rekening",
        category: "Bank Validation",
        description: "Validasi nomor rekening ke ratusan bank di Indonesia secara real-time.",
        href: "/bank",
        icon: CreditCard,
        color: "bg-blue-500",
        date: "Realtime API"
    },
    {
        title: "Cek E-Wallet",
        category: "Wallet Validation",
        description: "Verifikasi nomor HP untuk GoPay, OVO, Dana, ShopeePay, dan lainnya.",
        href: "/ewallet",
        icon: Wallet,
        color: "bg-green-500",
        date: "Multi-Provider"
    },
    {
        title: "OCR KTP",
        category: "Identity Scan",
        description: "Ekstrak data KTP otomatis dengan teknologi Optical Character Recognition.",
        href: "/ktp",
        icon: ScanLine,
        color: "bg-orange-500",
        date: "AI Powered"
    }
];

export default function Home() {
    return (
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            {/* Hero Section */}
            <section className="py-12 md:py-20 flex flex-col items-center text-center relative">

                {/* Large Title */}
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white mb-4">
                        NEET Validasi
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Platform verifikasi digital terlengkap. <br className="hidden md:block" />
                        Cek Rekening, E-Wallet, dan OCR KTP dalam satu dashboard.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    <Link href="#features">
                        <button className="h-12 px-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                            Mulai Sekarang <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* Grid Content */}
            <section id="features" className="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((item, i) => (
                        <Link href={item.href} key={i}>
                            <IOSCard className="h-full flex flex-col hover:scale-[1.02] transition-transform duration-300">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-gray-200 dark:shadow-none`}>
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </IOSCard>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
