import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NEET Validasi',
    description: 'Validasi Rekening, E-Wallet & OCR KTP',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
}

import { ThemeProvider } from "@/components/theme-provider"
import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={cn(inter.className, "bg-background text-foreground min-h-screen antialiased selection:bg-primary/30 overflow-x-hidden")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TopNav />
                    <main className="min-h-screen pt-[70px] pb-[80px] md:pb-0">
                        {children}
                    </main>
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    )
}

