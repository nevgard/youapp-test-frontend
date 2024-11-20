"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { useState } from 'react';
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <main className="min-h-screen">{children}</main>
                    <Toaster position='top-center'/>
                </QueryClientProvider>
            </body>
        </html>
    );
}
