

import "./globals.scss";

import { Inter } from "next/font/google";
import Footer from "../components/Footer/Footer"
import Headers from "../components/Header/Header"
import MyContextProvider from "../context/Context"
import CookiesConsent from "@/components/cookiesConsent/cookiesConsent";
import LocalizationWarpper from "@/components/LocalizationWarpper/LocalizationWarpper";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mrs Cooking",
  description: "Passionnée de cuisine, je te partage mes réalisations culinaires depuis maintenant des années. Soucieuse de toujours bien faire, je ne cesse de perfectionner mes recettes afin de te proposer mes réalisations les plus goûteuses.",
  openGraph: {
    images: ["http://mrscooking.com/imgage/meta/meta.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
  <MyContextProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CookiesConsent/>
        <LocalizationWarpper>
        {children}
        </LocalizationWarpper>
       <Footer/>
      </body>
    </html>
    </MyContextProvider>
  );
}
