import {GeistSans} from "geist/font/sans";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LogOutButton from "@/components/buttons/LogoutButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

//TODO check if user is signed in, only then show footer and navbar

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="flex flex-row justify-between px-5 py-5">
          <NavBar />
          <LogOutButton />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
