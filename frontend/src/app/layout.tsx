import "@/app/globals.css";
import QueryWrapper from "@/components/QueryWrapper/QueryWrapper";
import { Toaster } from "@/components/ui/toaster";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pretia CMS",
  description: "Pretia CMS",
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
        <ThemeContextProvider>
          <QueryWrapper>
            {children} <ReactQueryDevtools initialIsOpen={false} />
          </QueryWrapper>
          <Toaster />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
