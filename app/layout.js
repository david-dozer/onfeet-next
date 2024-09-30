import "../styles/styles.css";  // Global styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: 'onFeet - Simplifying Sneaker Styles',
  description: 'A sneaker styling application',
  icons: {
    icon: '/aj1.ico',  // Correct path to the icon
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
