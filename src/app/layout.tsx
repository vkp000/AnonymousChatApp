import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthProvider';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css'

const inter = Inter({ subsets: ['latin'] }); // ✅ initialize the font 

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  
  return (
    <html lang='en'>
      <AuthProvider>
        <body className={inter.className}>
          
          <Navbar />
          {children}
          <Toaster/>
        </body>
      </AuthProvider>
    </html>
  );
}