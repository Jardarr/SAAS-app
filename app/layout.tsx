import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Provider } from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "JSAAS application",
    description: "Todo app, Notebook app, Weather app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} dark:selection:bg-red-900 selection:bg-red-300`}
            >
                <Provider>
                    <div className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-300">
                        <Navbar />
                        <div>{children}</div>
                    </div>
                </Provider>
            </body>
        </html>
    );
}
