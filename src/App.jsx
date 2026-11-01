import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { PROFILE } from "./Data/profile.js";
import "./styles.css";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Components/Home.jsx";

// Scrolls to the top when you move to a different page
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// Shown for any address that doesn't exist
function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">That address doesn’t exist on this site.</p>
      <Link to="/" className="mt-8 inline-block font-semibold text-blue-600 dark:text-blue-400">
        Back to home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar name={PROFILE.name} />

      {/* pt-24 / pt-28 leaves room for the fixed navbar */}
      <main id="main" className="pt-24 sm:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}