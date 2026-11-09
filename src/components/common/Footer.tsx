"use client";

import { useRef } from "react";
import {
  FiArrowUpRight,
  FiMapPin,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiCode,
  FiGlobe,
  FiDatabase,
  FiLayers,
  FiArrowUp,
} from "react-icons/fi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const services = [
  { name: "Frontend Development", icon: FiCode },
  { name: "Full Stack Development", icon: FiLayers },
  { name: "Backend Development", icon: FiDatabase },
  { name: "Web Application Development", icon: FiGlobe },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/mahfujulhoque12",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FiLinkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FiFacebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FiInstagram,
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-content",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: footerRef },
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#080f20] text-white"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/10 blur-[100px]" />

      <div className="wrapper relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
          {/* Brand & Introduction */}
          <div className="footer-content lg:col-span-1">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            >
              <span className="flex   items-center justify-center rounded-xl  text-brand">
                Digital360
              </span>
              <span>
                Solutions<span className="text-brand-light">.</span>
              </span>
            </a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              I'm a Full Stack Developer passionate about building modern,
              scalable, and user-friendly web applications. Let's turn your
              ideas into meaningful digital experiences.
            </p>

            {/* Availability */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-medium text-green-400">
                Available for Remote Work
              </span>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-content">
            <h3 className="mb-7 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-brand-light"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand/70 transition-all duration-300 group-hover:bg-brand-light" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-content">
            <h3 className="mb-7 text-lg font-bold">Our Services</h3>

            <ul className="space-y-5">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <li key={service.name}>
                    <a
                      href="#services"
                      className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-brand-light"
                    >
                      <Icon
                        size={17}
                        className="shrink-0 text-brand-light transition-transform duration-300 group-hover:scale-110"
                      />
                      {service.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-content">
            <h3 className="mb-7 text-lg font-bold">Get In Touch</h3>

            <p className="mb-6 text-sm leading-7 text-gray-400">
              Have a project in mind? Feel free to reach out. I'd love to hear
              about your ideas.
            </p>

            <ul className="space-y-5">
              <li>
                <a
                  href="mailto:your-email@example.com"
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-brand-light"
                >
                  <FiMail
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-light"
                  />
                  <span>your-email@example.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+8801615867969"
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-brand-light"
                >
                  <FiPhone
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-light"
                  />
                  <span>+880 1615867969</span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-light"
                />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-light transition-all duration-300 hover:gap-3"
            >
              Let's Connect
              <FiArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-500">
              © {currentYear}{" "}
              <span className="font-semibold text-white">
                Digital360 Solutions
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <p className="text-xs text-gray-500">
                Designed & Developed with{" "}
                <span className="text-red-400">♥</span> by Digital360 Solutions
              </p>

              {/* Back to Top */}
              <a
                href="#home"
                aria-label="Back to top"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <FiArrowUp size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
