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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body className={cn(inter.className, "bg-ios-bg dark:bg-black min-h-screen text-foreground antialiased selection:bg-ios-blue/30")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="mx-auto w-full min-h-screen relative overflow-x-hidden md:flex md:items-center md:justify-center md:py-10">
                        <div className="w-full md:max-w-4xl md:bg-white md:dark:bg-black md:rounded-[40px] md:shadow-2xl md:min-h-[85vh] md:overflow-hidden relative border-0 md:border border-gray-100 dark:border-gray-800">
                            {children}
                        </div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    )
}
