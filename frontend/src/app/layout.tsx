import "@/app/globals.css";
import QueryWrapper from "@/components/QueryWrapper/QueryWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pretia Assignment Frontend",
  description: "Pretia Assignment Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" href="/images/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <QueryWrapper>{children}</QueryWrapper>
      </body>
    </html>
  );
}
