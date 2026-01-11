import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'GOOBER AGENT | cursed memecoin trading',
    description: 'A cursed orange creature that trades memecoins. Sanity goes down, degen goes up. Distributes profits to $GOOB holders.',
    keywords: ['solana', 'memecoin', 'trading', 'bot', 'pumpfun', 'goober'],
    icons: {
        icon: '/goober/goober-logo.png',
        apple: '/goober/goober-logo.png',
    },
    openGraph: {
        title: 'GOOBER AGENT',
        description: 'cursed memecoin trading agent',
        type: 'website',
        images: ['/goober/goober-logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GOOBER AGENT',
        description: 'cursed memecoin trading agent',
        images: ['/goober/goober-logo.png'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="scanlines grid-bg">
                <Navbar />
                <div className="pt-16">
                    {children}
                </div>
            </body>
        </html>
    );
}
