import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./styles/globals.css";
import styles from "./styles/page.module.css";
import Navigation from "./components/navigation/navigation";

const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "TWN - Proovitöö",
    description: "Test tasks for TWN",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={openSans.className}>
                <Navigation />

                <main className={styles.main}>
                    <div className={styles.contentWrapper}>{children}</div>
                </main>
            </body>
        </html>
    );
}
