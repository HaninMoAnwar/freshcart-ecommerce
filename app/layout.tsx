import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import MiniBar from "@/components/MiniBar/MiniBar";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toast";
import Providers from "@/components/shared/Providers/Providers";


export const metadata: Metadata = {
  title: "FreshCart App",
  description: "Created with Next.js",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Providers>
          <MiniBar />
          <Toaster />
          <Navbar />
          {children}
          <Footer />

        </Providers>
      </body>
    </html >
  );
}
