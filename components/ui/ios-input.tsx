import { cn } from "@/lib/utils";
import React from "react";

interface IOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function IOSInput({ className, label, error, ...props }: IOSInputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-500 ml-1">{label}</label>
            )}
            <input
                className={cn(
                    "w-full rounded-xl bg-ios-gray-100/50 p-4 text-[17px] outline-none transition-all placeholder:text-gray-400 focus:bg-ios-gray-100 focus:ring-2 focus:ring-ios-blue/20",
                    error && "ring-2 ring-ios-red/20 bg-red-50/50",
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-ios-red ml-1">{error}</p>}
        </div>
    );
}
