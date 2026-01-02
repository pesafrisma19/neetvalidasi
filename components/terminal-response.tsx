"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalResponseProps {
    loading: boolean;
    result: any;
    title?: string;
    method?: string;
    className?: string;
    error?: string | null;
}

export function TerminalResponse({
    loading,
    result,
    title = "JSON RESPONSE",
    method = "POST",
    className,
    error
}: TerminalResponseProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (result) {
            const text = JSON.stringify(result, null, 2);
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={cn("w-full rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 shadow-2xl flex flex-col h-full min-h-[400px]", className)}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 rounded bg-[#333] text-[10px] font-mono text-blue-400 font-bold tracking-wider">
                        METHOD: {method}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{title}</span>
                </div>

                <button
                    onClick={handleCopy}
                    disabled={!result}
                    className="p-1.5 rounded hover:bg-[#333] transition-colors text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm overflow-auto custom-scrollbar relative">
                {loading ? (
                    <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
                        <span className="text-green-500">➜</span>
                        <span>Proses request API...</span>
                        <span className="w-2 h-4 bg-yellow-500 animate-blink block ml-1" />
                    </div>
                ) : error ? (
                    <div className="text-red-400">
                        <span className="text-red-600 block mb-2">// Error</span>
                        <pre>{JSON.stringify({ status: false, message: error }, null, 2)}</pre>
                    </div>
                ) : result ? (
                    <div className="text-blue-300">
                        <span className="text-gray-500 block mb-2">// 200 OK</span>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                    </div>
                ) : (
                    <div className="text-gray-600">
                        <span className="text-gray-500">// Menunggu input dari form...</span>
                    </div>
                )}
            </div>

            {/* Footer Status */}
            <div className="px-4 py-1.5 bg-[#007acc] text-white text-[10px] font-mono flex justify-between items-center">
                <span>STATUS: {loading ? 'PROCESSING' : result ? 'SUCCESS' : error ? 'ERROR' : 'IDLE'}</span>
                <span>HOST: rfpdev.site</span>
            </div>
        </div>
    );
}
