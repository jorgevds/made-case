import type { Metadata } from "next";
import "./globals.css";
import { ClientProvider, Footer, Header } from "@/components/index";

export const metadata: Metadata = {
    title: "Antwerp velo stations",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossOrigin=""
                />
            </head>
            <body>
                <Header />
                <ClientProvider>{children}</ClientProvider>
                <Footer />
            </body>
        </html>
    );
}
