'use client'

import SideNavbar from "@/app/ui/side-navbar";
import Header from "@/app/ui/header";
import { SelectedAdventurersProvider } from "@/context/selected-adventurers-context";
import { ThemeProvider } from "@/context/theme-context";
// import { ScoreProvider } from "@/context/score-context";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      {/* <ScoreProvider> */}
        <SelectedAdventurersProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
            <div className="w-full flex-none md:w-64">
              <SideNavbar />
            </div>
            <div  className="flex flex-grow flex-col overflow-hidden">
              <Header />
              <div className="flex-grow p-6 overflow-y-auto md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>
          </div>
        </SelectedAdventurersProvider>
      {/* </ScoreProvider> */}
    </ThemeProvider>
  );
}
