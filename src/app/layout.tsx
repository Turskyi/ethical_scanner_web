import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethical Scanner",
  description:
    "A website that links to the Ethical Scanner mobile apps for android and iOS. The apps scan barcodes and tell you if the product meets your ethical standards. You can also find the privacy policy for the android app on this website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
