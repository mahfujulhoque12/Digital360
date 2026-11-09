import { useEffect, useState } from "react";

import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import { Link, useLocation } from "react-router";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Scroll korle navbar e shadow + background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page change hole mobile menu bondho
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Mobile menu open thakle body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-paper/90 shadow-sm backdrop-blur-md" : "bg-paper"
      }`}
    >
      <nav className="wrapper flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* <span className="bg-brand text-paper flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold">
            D
          </span>
          <span className="text-ink leading-tight">
            <span className="block text-lg font-bold">Digital</span>
            <span className="text-brand block text-xs font-medium">
              360 Solutions
            </span>
          </span> */}
          <img src="/digital.jpg" alt="" className="h-20" />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`relative py-2 text-[15px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-brand"
                    : "text-ink-soft hover:text-brand"
                }`}
              >
                {link.label}
                <span
                  className={`bg-brand absolute inset-x-0 -bottom-0.5 h-0.5 origin-left transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+8801615867969"
            className="text-ink-soft hover:text-brand flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <FiPhone className="text-brand" />
            +880 1615867969
          </a>
          <Link
            to="/contact"
            className="bg-brand hover:bg-brand-dark text-paper inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            Get a Free Quote
            <FiArrowUpRight className="text-base" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="text-ink hover:bg-brand-soft hover:text-brand rounded-lg p-2 text-2xl transition-colors lg:hidden"
        >
          {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`border-brand-soft bg-paper absolute inset-x-0 top-full overflow-hidden border-t transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="wrapper flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-brand-soft text-brand"
                  : "text-ink-soft hover:bg-brand-soft hover:text-brand"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="bg-brand hover:bg-brand-dark text-paper mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold transition-colors"
          >
            Get a Free Quote
            <FiArrowUpRight className="text-base" />
          </Link>

          <a
            href="tel:+8801000000000"
            className="text-ink-soft mt-2 flex items-center justify-center gap-2 py-2 text-sm font-medium"
          >
            <FiPhone className="text-brand" />
            +880 1000-000000
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
