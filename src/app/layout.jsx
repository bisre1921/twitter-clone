"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Twitter Clone",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
