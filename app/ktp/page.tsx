"use client";

import { useState, useRef } from "react";
import { IOSCard } from "@/components/ui/ios-card";
import { IOSButton } from "@/components/ui/ios-button";
import { ChevronLeft, Camera, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ocrKtp } from "@/lib/api";
import Image from "next/image";

export default function KtpPage() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Ukuran foto maksimal 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setError(null);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProcess = async () => {
        if (!image) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // API expects Base64 string. readAsDataURL includes the prefix "data:image/jpeg;base64,...".
            // We might need to send pure base64 or the full string, usually full string or valid base64.
            // Assuming API handles standard Data URI or we might need to strip prefix.
            // Let's try sending as is first, or strip if API fails.
            // Many APIs want raw base64.
            const base64Content = image.split(',')[1];
            const res = await ocrKtp(base64Content); // Try raw base64 first as "image (Base64)" usually implies content.

            if (res && (res.data || res.nik)) { // Assuming success structure
                setResult(res.data || res);
            } else {
                // Fallback if structure is different
                if (res.status === false) {
                    setError(res.message || "Gagal memproses KTP");
                } else {
                    setResult(res);
                }
            }
        } catch (err) {
            setError("Gagal memproses gambar / Koneksi Error");
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
                        OCR KTP
                    </h1>
                </div>

                <IOSCard className="mb-6 flex flex-col gap-5 items-center justify-center min-h-[200px] border-dashed border-2 border-gray-300 bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer relative overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {image ? (
                        <div className="absolute inset-0 w-full h-full">
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <p className="text-white font-medium">Ganti Foto</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-full bg-blue-50 text-ios-blue flex items-center justify-center mx-auto mb-4">
                                <Camera className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">Tap untuk ambil foto atau upload</p>
                        </div>
                    )}
                </IOSCard>

                {image && (
                    <IOSButton onClick={handleProcess} isLoading={loading} className="mb-6">
                        Proses E-KTP
                    </IOSButton>
                )}

                {error && (
                    <div className="p-4 rounded-2xl bg-red-50 text-ios-red flex items-start gap-3 border border-red-100 mb-6 animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium leading-tight">{error}</p>
                    </div>
                )}

                {result && (
                    <IOSCard className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <CheckCircle2 className="w-6 h-6 text-ios-green" />
                            <h3 className="text-lg font-semibold">Hasil Scan</h3>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(result).map(([key, value]) => {
                                if (typeof value !== 'string') return null;
                                return (
                                    <div key={key} className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-base text-black font-medium break-words">{value}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </IOSCard>
                )}
            </div>
        </div>
    );
}
