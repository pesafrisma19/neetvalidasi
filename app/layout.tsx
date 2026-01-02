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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <body className={cn(inter.className, "bg-ios-bg min-h-screen text-foreground antialiased selection:bg-ios-blue/30")}>
                <main className="mx-auto max-w-md min-h-screen bg-white md:shadow-2xl md:my-0 relative overflow-hidden">
                    {children}
                </main>
            </body>
        </html>
    )
}
