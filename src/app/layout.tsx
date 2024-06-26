import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import PageWrapper from "@/components/common/PageWrapper";
import "@/styles/edit_modal_style.css";
import "@/styles/pagination_custom_style.css";
import "@/styles/animation.css";
import "rodal/lib/rodal.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paw Buddy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <PageWrapper>{children}</PageWrapper>
        </body>
      </html>
    </>
  );
}
