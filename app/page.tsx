import { IOSCard } from '@/components/ui/ios-card';
import { BadgeCheck, CreditCard, ScanLine, Wallet, ArrowRight, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { IOSButton } from '@/components/ui/ios-button';

const FEATURES = [
    {
        title: "Cek Rekening",
        category: "Bank Validation",
        description: "Validasi nomor rekening ke ratusan bank di Indonesia secara real-time.",
        href: "/bank",
        icon: CreditCard,
        color: "from-blue-500 to-indigo-600",
        date: "Realtime API"
    },
    {
        title: "Cek E-Wallet",
        category: "Wallet Validation",
        description: "Verifikasi nomor HP untuk GoPay, OVO, Dana, ShopeePay, dan lainnya.",
        href: "/ewallet",
        icon: Wallet,
        color: "from-green-500 to-emerald-600",
        date: "Multi-Provider"
    },
    {
        title: "OCR KTP",
        category: "Identity Scan",
        description: "Ekstrak data KTP otomatis dengan teknologi Optical Character Recognition.",
        href: "/ktp",
        icon: ScanLine,
        color: "from-orange-500 to-red-600",
        date: "AI Powered"
    }
];

export default function Home() {
    return (
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            {/* Hero Section */}
            <section className="py-12 md:py-20 flex flex-col items-center md:items-start text-center md:text-left relative">
                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-ios-gray-100 dark:bg-ios-gray-600/30 rounded-full px-4 py-1.5 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-primary-purple/20 text-primary-purple text-xs font-bold shadow-sm">
                        New
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        API Hub Integration <ArrowRight className="w-3 h-3" />
                    </span>
                </div>

                {/* Large Title */}
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-blue-500 to-primary-blue pb-2">
                        VALIDASI<span className="text-black dark:text-white font-light text-4xl md:text-6xl text-outline">.app</span>
                    </h1>
                </div>

                <p className="max-w-2xl text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Platform verifikasi digital terlengkap untuk developer. <br className="hidden md:block" />
                    Cek Rekening, E-Wallet, dan OCR KTP dalam satu dashboard terintegrasi.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                    <Link href="#features">
                        <button className="h-12 px-8 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue text-white font-semibold text-lg shadow-lg shadow-primary-purple/25 hover:shadow-primary-purple/40 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Mulai Validasi
                        </button>
                    </Link>
                    <button className="h-12 px-8 rounded-full bg-white dark:bg-ios-gray-600/30 text-gray-700 dark:text-white font-semibold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Dokumentasi API
                    </button>
                </div>
            </section>

            {/* Grid Content */}
            <section id="features" className="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-black dark:text-white">Layanan Validasi</h2>
                    <Link href="/services" className="text-primary-blue font-medium hover:underline text-sm">Lihat Semua</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((item, i) => (
                        <Link href={item.href} key={i}>
                            <div className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1">
                                {/* Image/Icon Placeholder Banner */}
                                <div className={`h-40 rounded-2xl mb-6 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    <item.icon className="w-20 h-20 text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-blue transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
