
"use client";

import { useState } from "react";
import { IOSButton } from "@/components/ui/ios-button";
import { IOSInput } from "@/components/ui/ios-input";
import { TerminalResponse } from "@/components/terminal-response";
import { EWALLETS } from "@/lib/data/ewallets";
import { checkEWallet } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Wallet } from "lucide-react";

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
        <div className="min-h-screen bg-[#0f172a] p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Form */}
                <div className="flex flex-col justify-center">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                    </Link>

                    <div className="bg-[#1e293b] border border-gray-700 p-6 md:p-8 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/20">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">CEK E-WALLET</h1>
                                <p className="text-gray-400 text-sm">Verifikasi data E-Wallet via API</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <IOSInput
                                label="Nomor HP *"
                                placeholder="08123456789"
                                type="number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="bg-[#0f172a] border-gray-700 text-white placeholder:text-gray-600 focus:border-green-500"
                            />

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-gray-300 ml-1">Pilih E-Wallet *</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {EWALLETS.map((wallet) => (
                                        <button
                                            key={wallet.code}
                                            onClick={() => setSelectedWallet(wallet.code)}
                                            className={`px - 4 py - 3 rounded - xl text - sm font - medium transition - all ${selectedWallet === wallet.code
                                                ? "bg-green-600 text-white shadow-lg shadow-green-600/20 scale-[1.02]"
                                                : "bg-[#0f172a] text-gray-400 border border-gray-700 hover:border-green-500/50 hover:text-green-500"
                                                } `}
                                        >
                                            {wallet.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <IOSButton
                                onClick={handleCheck}
                                isLoading={loading}
                                className="w-full h-12 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl mt-4"
                            >
                                Kirim Data
                            </IOSButton>
                        </div>
                    </div>
                </div>

                {/* Right Column: Terminal */}
                <div className="flex flex-col h-full min-h-[500px]">
                    <TerminalResponse
                        loading={loading}
                        result={result}
                        error={error}
                        title="JSON RESPONSE"
                    />
                </div>

            </div>
        </div>
    );
}

