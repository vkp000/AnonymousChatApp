import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] }); // ✅ initialize the font

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
