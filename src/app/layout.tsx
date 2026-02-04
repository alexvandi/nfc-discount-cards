import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NFC Discount Cards - Smart Verification",
  description: "Verify your discount cards instantly via NFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
