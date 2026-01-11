import type { Metadata } from 'next';
import './globals.css';

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
            <body>
                <div className="grain-overlay" />
                {children}
            </body>
        </html>
    );
}
