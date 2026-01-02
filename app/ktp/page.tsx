
"use client";

import { useState, useRef } from "react";
import { IOSButton } from "@/components/ui/ios-button";
import { TerminalResponse } from "@/components/terminal-response";
import { ocrKtp } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, ScanFace, Upload, X, Camera } from "lucide-react";
import { IOSCard } from "@/components/ui/ios-card";

export default function KtpPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Ukuran file maksimal 2MB");
                return;
            }
            setSelectedFile(file);
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleProcess = async () => {
        if (!selectedFile) {
            setError("Silakan upload foto KTP terlebih dahulu");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const convertToBase64 = (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Get pure base64 if needed, but usually APIs handle Data URI or we split
                        // For this validation API, let's assume it needs pure Base64 or Data URI.
                        // Based on previous code, let's send just the base64 part.
                        const base64 = result.split(',')[1];
                        resolve(base64);
                    };
                    reader.onerror = error => reject(error);
                });
            };

            const base64String = await convertToBase64(selectedFile);
            const res = await ocrKtp(base64String);

            // User provided example shows status: "success"
            if (res.status === true || res.status === "success") {
                setResult(res); // Show full response as requested
            } else {
                setError(res.message || "Gagal memproses KTP");
            }
        } catch (err) {
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
                            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                                <ScanFace className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-card-foreground">KTP OCR</h1>
                                <p className="text-muted-foreground text-sm">Ekstrak data KTP otomatis</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="w-full">
                                <label className="text-sm font-medium text-muted-foreground ml-1 mb-2 block">Upload Foto KTP *</label>

                                {!preview ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-48 border-2 border-dashed border-input rounded-xl bg-background hover:bg-secondary/50 hover:border-orange-500 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                                    >
                                        <div className="p-3 rounded-full bg-secondary group-hover:bg-orange-600/20 text-muted-foreground group-hover:text-orange-500 transition-colors">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm text-muted-foreground font-medium pt-2">Klik untuk upload gambar</span>
                                        <span className="text-xs text-muted-foreground/70">Max 2MB (JPG/PNG)</span>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border group">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                                            >
                                                <Camera className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={clearFile}
                                                className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <IOSButton
                                onClick={handleProcess}
                                isLoading={loading}
                                className="w-full h-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl mt-4"
                            >
                                Proses OCR
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
                        title="OCR RESULT"
                    />
                </div>

            </div>
        </div>
    );
}

