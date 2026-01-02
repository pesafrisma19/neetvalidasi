"use client";

import { useState } from "react";
import { IOSCard } from "@/components/ui/ios-card";
import { IOSInput } from "@/components/ui/ios-input";
import { IOSButton } from "@/components/ui/ios-button";
import { EWALLETS } from "@/lib/data/ewallets";
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { checkEWallet } from "@/lib/api";

export default function EWalletPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedWallet, setSelectedWallet] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!phoneNumber || !selectedWallet) {
            setError("Mohon lengkapi form");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await checkEWallet(phoneNumber, selectedWallet);
            if (res.status) {
                setResult(res.data);
            } else {
                setError(res.message || "Gagal memvalidasi");
            }
        } catch (err) {
            setError("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ios-bg p-6 pt-8 pb-10 flex flex-col items-center">
            <div className="w-full max-w-sm">
                <div className="flex items-center mb-6 relative">
                    <Link href="/" className="absolute left-0 p-2 -ml-2 text-ios-blue hover:opacity-70 transition-opacity">
                        <ChevronLeft className="w-7 h-7" />
                    </Link>
                    <h1 className="flex-1 text-center text-[20px] font-semibold text-black">
                        Cek E-Wallet
                    </h1>
                </div>

                <IOSCard className="mb-6 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        {EWALLETS.map((wallet) => (
                            <button
                                key={wallet.code}
                                onClick={() => setSelectedWallet(wallet.code)}
                                className={`
                            relative overflow-hidden rounded-xl p-3 text-sm font-medium transition-all duration-200 border
                            ${selectedWallet === wallet.code
                                        ? 'bg-ios-blue text-white border-transparent shadow-md'
                                        : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                                    }
                        `}
                            >
                                {wallet.name.replace(' USER', '').replace(' DRIVER', '')}
                            </button>
                        ))}
                    </div>

                    <IOSInput
                        label="Nomor HP"
                        placeholder="08123456789"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <IOSButton onClick={handleCheck} isLoading={loading} className="mt-2" disabled={!selectedWallet}>
                        Periksa
                    </IOSButton>
                </IOSCard>

                {error && (
                    <div className="p-4 rounded-2xl bg-red-50 text-ios-red flex items-start gap-3 border border-red-100 mb-6 animate-in fade-in slide-in-from-bottom-2">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium leading-tight">{error}</p>
                    </div>
                )}

                {result && (
                    <IOSCard className="animate-in zoom-in-95 duration-300 border-ios-green/30 bg-green-50/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-ios-green/10 flex items-center justify-center text-ios-green">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-ios-green uppercase tracking-wide">Terverifikasi</p>
                                <p className="text-sm text-gray-400">Akun ditemukan</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Provider</span>
                                <span className="text-sm font-semibold truncate max-w-[60%]">{result.ewallet_code?.replace('wallet_', '')?.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Nomor</span>
                                <span className="text-sm font-semibold font-mono tracking-tight">{result.phone_number}</span>
                            </div>
                            <div className="flex flex-col gap-1 pt-1">
                                <span className="text-sm text-gray-400">Nama Akun</span>
                                <span className="text-lg font-bold text-black">{result.account_name}</span>
                            </div>
                        </div>
                    </IOSCard>
                )}
            </div>
        </div>
    );
}
