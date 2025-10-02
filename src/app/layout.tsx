import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog about web development and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <main className="max-w-[1440px] mx-auto p-3">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
