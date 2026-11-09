import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiNavigation,
  FiExternalLink,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface OfficeInfo {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  directionsUrl: string;
}

const mainOffice: OfficeInfo = {
  city: "New York",
  country: "USA (Headquarters)",
  address: "350 5th Ave, New York, NY 10118, United States",
  phone: "+1 (555) 360-3440",
  email: "contact@digital360solutions.com",
  hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
  // Google Maps embed URL for Empire State Building (replace with your exact coordinates/address embed)
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175390772653!2d-73.98823932342894!3d40.74844047138814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=350+5th+Ave,+New+York,+NY+10118",
};

const Map: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      // Office Info Card Entrance
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        });
      }

      // Google Map Frame Entrance
      if (mapContainerRef.current) {
        gsap.from(mapContainerRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 80%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 bg-paper text-ink overflow-hidden relative"
    >
      <div className="wrapper relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-soft text-brand border border-brand-light/30 shadow-sm">
            <FiMapPin className="w-4 h-4" /> Global Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mt-4">
            Visit Our <span className="text-brand">Headquarters</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft/80 mt-4 leading-relaxed">
            Have a project in mind or want to talk digital strategy? Drop by our
            office or get in touch directly with our team.
          </p>
        </div>

        {/* Map & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Office Details Card */}
          <div
            ref={cardRef}
            className="lg:col-span-5 bg-ink text-paper p-8 lg:p-10 rounded-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-light via-brand to-brand-dark" />

            {/* Soft Ambient Glow */}
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-light">
                    {mainOffice.country}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-paper mt-1">
                    {mainOffice.city} Office
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand/20 text-brand-light flex items-center justify-center text-xl border border-brand/30">
                  <FiMapPin />
                </div>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-paper/5 text-brand-light mt-1">
                    <FiNavigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
                      Address
                    </h4>
                    <p className="text-sm sm:text-base text-paper/90 mt-1 leading-relaxed">
                      {mainOffice.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-paper/5 text-brand-light mt-1">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
                      Phone Call
                    </h4>
                    <a
                      href={`tel:${mainOffice.phone}`}
                      className="text-sm sm:text-base text-paper/90 hover:text-brand-light transition-colors mt-1 block font-medium"
                    >
                      {mainOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-paper/5 text-brand-light mt-1">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
                      Email Us
                    </h4>
                    <a
                      href={`mailto:${mainOffice.email}`}
                      className="text-sm sm:text-base text-paper/90 hover:text-brand-light transition-colors mt-1 block font-medium"
                    >
                      {mainOffice.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-paper/5 text-brand-light mt-1">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
                      Business Hours
                    </h4>
                    <p className="text-sm sm:text-base text-paper/90 mt-1">
                      {mainOffice.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 mt-8 border-t border-paper/10 flex flex-col sm:flex-row gap-4">
              <a
                href={mainOffice.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-paper font-semibold text-sm hover:bg-brand-dark transition-all shadow-md group"
              >
                <span>Get Directions</span>
                <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={`mailto:${mainOffice.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-paper/10 text-paper font-semibold text-sm hover:bg-paper/20 transition-all border border-paper/10"
              >
                <span>Book Meeting</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Container */}
          <div
            ref={mapContainerRef}
            className="lg:col-span-7 bg-brand-soft/40 p-3 rounded-2xl border border-brand-light/30 shadow-xl min-h-[420px] lg:min-h-full flex flex-col"
          >
            <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gray-200">
              <iframe
                title="Digital360 Solutions Headquarters"
                src={mainOffice.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0 filter saturate-[0.95] contrast-[1.05]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
