import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata:Metadata = {
  title: "Striver-79",
  description: "Pick Random question from the dsa sheet",
  icons: {
    icon: '/favicon.svg', // public path
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} width:w-full`} >{children}</body>
    </html>
  );
}
