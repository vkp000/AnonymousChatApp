// import Navbar from '@/components/Navbar';
// import AuthProvider from '@/context/AuthProvider';
// import { Inter } from 'next/font/google';
// import { Toaster } from 'sonner';
// import './globals.css'


import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True Feedback',
  description: 'Real feedback from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
































// const inter = Inter({ subsets: ['latin'] }); // ✅ initialize the font 

// interface RootLayoutProps {
//   children: React.ReactNode;
// }

// export default async function RootLayout({ children }: RootLayoutProps) {

  
//   return (
//     <html lang='en'>
//       <AuthProvider>
//         <body className={inter.className}>
          
//           <Navbar />
//           {children}
//           <Toaster/>
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }