import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SideNavbar from "@/app/ui/side-navbar";
import "./globals.css";
import { SelectedAdventurersProvider } from "@/context/selected-adventurers-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire an Adventurer",
  description: "Hire adventurers to save the city!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SelectedAdventurersProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-5 py-5`}
      >
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNavbar />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </body>
      </SelectedAdventurersProvider>
    </html>
  );
};
