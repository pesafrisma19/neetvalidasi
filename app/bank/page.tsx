
"use client";

import { useState } from "react";
import { IOSButton } from "@/components/ui/ios-button";
import { IOSInput } from "@/components/ui/ios-input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { TerminalResponse } from "@/components/terminal-response";
import { BANKS } from "@/lib/data/banks";
import { checkBank } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";

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
                setError(res.message || "Gagal memvalidasi");
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center transition-colors duration-300">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Form */}
                <div className="flex flex-col justify-center">
                    <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                    </Link>

                    <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                <Landmark className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-card-foreground">CEK REKENING</h1>
                                <p className="text-muted-foreground text-sm">Verifikasi data rekening bank via API</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <IOSInput
                                label="Nomor Rekening *"
                                placeholder="Masukkan nomor rekening"
                                type="number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                                labelClassName="text-card-foreground/80"
                            />

                            <SearchableSelect
                                label="Pilih Bank *"
                                placeholder="Pilih Bank Tujuan"
                                options={BANKS}
                                value={selectedBank}
                                onChange={setSelectedBank}
                            />

                            <IOSButton
                                onClick={handleCheck}
                                isLoading={loading}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl mt-4"
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
