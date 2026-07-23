import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import StickyApplyCTA from "./components/layout/StickyApplyCTA";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Downloads from "./pages/Downloads";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Calculator from "./pages/Calculator";
import Branches from "./pages/Branches";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Faq from "./pages/Faq";
import PlaceholderPage from "./pages/PlaceholderPage";
import Careers from "./pages/Careers";
import News from "./pages/News";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  return (
    <div className="flex min-h-screen flex-col pb-20 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
      </main>
      <Footer />
      <StickyApplyCTA />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}
