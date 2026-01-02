import { cn } from "@/lib/utils";
import React from "react";

interface IOSCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function IOSCard({ children, className, ...props }: IOSCardProps) {
    return (
        <div
            className={cn(
                "glass rounded-3xl p-6 shadow-sm border border-white/20",
                "bg-ios-card backdrop-blur-md", // Custom class from config
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
