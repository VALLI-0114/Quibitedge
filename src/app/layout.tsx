import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "QubitEdge Summer Internship 2K26",
  description: "Register for QubitEdge Summer Internship 2K26 - Gain real-world experience in Cyber Security, AI, ML, Web Development, and more.",
  keywords: "internship, summer internship, QubitEdge, 2K26, tech internship, cyber security, AI, ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              color: '#1e293b',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
