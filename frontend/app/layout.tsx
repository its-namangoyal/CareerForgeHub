import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import { RecommendationsProvider } from "./RecommendationContext"; // Adjust the import path as necessary

export const metadata = {
  title: "CareerForge Hub",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecommendationsProvider>
          <Navbar />
          {children}
          <Footer />
        </RecommendationsProvider>
      </body>
    </html>
  );
}
