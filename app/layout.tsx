import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Português EU — Learn European Portuguese',
  description: 'An immersive, beautifully-designed European Portuguese learning platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream font-sans text-txt antialiased">
        {children}
      </body>
    </html>
  );
}
