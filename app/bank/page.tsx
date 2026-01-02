"use client";

import { useState } from "react";
import { IOSCard } from "@/components/ui/ios-card";
import { IOSInput } from "@/components/ui/ios-input";
import { IOSButton } from "@/components/ui/ios-button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { BANKS } from "@/lib/data/banks";
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { checkBank } from "@/lib/api";

export default function BankPage() {
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!accountNumber || !selectedBank) {
            setError("Mohon lengkapi form");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await checkBank(accountNumber, selectedBank);
            if (res.status) {
                setResult(res.data);
            } else {
                setError(res.message || "Gagal memvalidasi/Tidak Ditemukan");
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
                        Cek Rekening
                    </h1>
                </div>

                <IOSCard className="mb-6 flex flex-col gap-5">
                    <SearchableSelect
                        label="Nama Bank"
                        placeholder="Pilih Bank"
                        options={BANKS}
                        value={selectedBank}
                        onChange={setSelectedBank}
                    />

                    <IOSInput
                        label="Nomor Rekening"
                        placeholder="1234567890"
                        type="number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />

                    <IOSButton onClick={handleCheck} isLoading={loading} className="mt-2">
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
                                <p className="text-sm text-gray-400">Data valid ditemukan</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Bank</span>
                                <span className="text-sm font-semibold truncate max-w-[60%]">{result.bank_name || result.bank_code?.replace('bank_', '')?.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-400">Nomor</span>
                                <span className="text-sm font-semibold font-mono tracking-tight">{result.account_number}</span>
                            </div>
                            <div className="flex flex-col gap-1 pt-1">
                                <span className="text-sm text-gray-400">Atas Nama</span>
                                <span className="text-lg font-bold text-black">{result.customer_name || result.account_name}</span>
                            </div>
                        </div>
                    </IOSCard>
                )}
            </div>
        </div>
    );
}
