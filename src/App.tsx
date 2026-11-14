import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import WhatsappGlobal from "./components/common/WhatsappGlobal";
import About from "./pages/About";
import StartFromTop from "./components/common/StartFromTop";
import Contact from "./pages/Contact";
import Client from "./pages/Client";
import { Toaster } from "sonner";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <StartFromTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/client-mes" element={<Client />} />
      </Routes>
      <Footer />
      <WhatsappGlobal />
    </BrowserRouter>
  );
}

export default App;
