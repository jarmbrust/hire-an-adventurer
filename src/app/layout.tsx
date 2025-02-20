import type { Metadata } from "next";
import SideNavbar from "@/app/ui/side-navbar";
import Header from "@/app/ui/header";
import "./globals.css";
import { SelectedAdventurersProvider } from "@/context/selected-adventurers-context";
import { ThemeProvider } from "@/context/theme-context";

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
      <ThemeProvider>
        <SelectedAdventurersProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
            <div className="w-full flex-none md:w-64">
              <SideNavbar />
            </div>
            <div  className="flex flex-grow flex-col overflow-hidden">
              <Header />
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>

          </div>
        </SelectedAdventurersProvider>
      </ThemeProvider>
    </html>
  );
};
