"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsappGlobal = () => {
  const phoneNumber = "8801615867969";

  const message = encodeURIComponent(
    "Hello! I'm interested in your services. Let's discuss a project.",
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      className="group fixed bottom-6 right-6 z-[999] flex items-center justify-center"
    >
      {/* Pulse Animation */}
      <span className="absolute h-14 w-14 animate-ping rounded-full bg-green-500/30" />

      {/* Tooltip */}
      <span className="absolute right-[72px] whitespace-nowrap rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2">
        Chat with me
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-ink" />
      </span>

      {/* WhatsApp Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_35px_rgba(37,211,102,0.5)]">
        <FaWhatsapp size={30} />
      </span>
    </a>
  );
};

export default WhatsappGlobal;
