import {GeistSans} from "geist/font/sans";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Toast from "@/components/global/Toast";
import { cookies } from "next/headers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

//TODO check if user is signed in, only then show footer and navbar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value;

  return (
    <html lang="en" className={`${GeistSans.className} ${theme}`}>
      <body className="bg-light-bg dark:bg-dark-bg transition-all duration-500">
        <Toast />
        <NavBar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
