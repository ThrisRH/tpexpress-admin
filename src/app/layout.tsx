import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TPAdmin | Quản lý nhân viên",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("token");
  // console.log(RootLayout, cookieStore.get("token"));
  return (
    <html lang="en">
      <Head>
        <meta httpEquiv="Content-Language" content="en" />{" "}
        {/* Thay 'en' bằng ngôn ngữ của bạn */}
        <meta name="google" content="notranslate" /> {/* Ngăn Google dịch */}
      </Head>
      <body
        className={`min-h-[100vh] ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AppProvider inititalSessionToken={sessionToken?.value}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
