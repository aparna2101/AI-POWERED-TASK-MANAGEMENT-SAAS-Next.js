import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  title: "TaskAura — Plan. Collaborate. Achieve with AI.",
  description:
    "Ultra-premium AI-powered project management frontend. Turn ideas into completed projects with predictive roadmaps, smart velocity tracking, and multiplayer collaboration.",
  icons: {
    icon: "/emblem.png?v=2",
    apple: "/emblem.png?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#fbfbfd] text-[#070b1e] font-sans selection:bg-purple-100 selection:text-purple-900"
      >
        {children}
      </body>
    </html>
  );
}
