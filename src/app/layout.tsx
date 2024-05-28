import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "CLFIS",
  description: "A lost and found system",
};
export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <Provider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
