import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarDesktop } from "@/components/sidebarDesktop";
import { Bell, BellDot, BellIcon, Home, HomeIcon, Menu, User, User2Icon } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { useContext, useState } from "react";
import { UserContext, UserProvider } from "@/app/context/UserProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SideBarMobile from "@/components/SideBarMobile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tokenlab Events",
  description: "Seu aplicativo de eventos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="light">
      <UserProvider>
        <body className="bgBranco"
        >
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="md:hidden">
            <div className=" w-screen bgAzul h-[80px] flex justify-around items-center">
              <div>
                <span className="text-white text-2xl font-bold">TokenLab</span><span className="text-2xl font-bold text-sky-500">Events</span>
              </div>
              <SideBarMobile />
            </div>

          </div>
          <main>{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
