import "../styles/styles.css";  // Global styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: 'onFeet - Simplifying Sneaker Styles',
  description: 'A sneaker styling application',
  icons: {
    icon: [
      { url: '/aj1.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
