import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface IOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "destructive" | "ghost";
    isLoading?: boolean;
}

export function IOSButton({
    children,
    className,
    variant = "primary",
    isLoading,
    disabled,
    ...props
}: IOSButtonProps) {
    const variants = {
        primary: "bg-ios-blue text-white active:bg-blue-600",
        secondary: "bg-ios-gray-100 text-black active:bg-ios-gray-200",
        destructive: "bg-ios-red text-white active:bg-red-600",
        ghost: "bg-transparent text-ios-blue active:opacity-50",
    };

    return (
        <button
            disabled={isLoading || disabled}
            className={cn(
                "w-full rounded-2xl px-4 py-3.5 font-semibold text-[17px] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin w-5 h-5" />}
            {children}
        </button>
    );
}
