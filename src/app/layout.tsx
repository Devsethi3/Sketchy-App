import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const inter = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sketchy: Collaborative Whiteboard App - Work Together in Real Time",
  description: "Sketchy is a modern whiteboard application that enables real-time collaboration, allowing multiple users to sketch, draw, and brainstorm together.",
  keywords: ["whiteboard", "sketch", "drawing", "collaboration", "real-time", "Next.js", "Konva.js", "typescript"],
  // website: "https://www.Sketchy.com",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
