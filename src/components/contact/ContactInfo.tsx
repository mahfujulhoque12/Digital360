import { useRef } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const contactInfo = [
  {
    id: 1,
    title: "Phone Number",
    value: "+880 1615867969",
    description: "Call us for any inquiries",
    href: "tel:+8801234567890",
    icon: FiPhone,
  },
  {
    id: 2,
    title: "Email Address",
    value: "contact.digital.360solutions@gmail.com",
    description: "Send us your project details",
    href: "mailto:contact.digital.360solutions@gmail.com",
    icon: FiMail,
  },
  {
    id: 3,
    title: "Our Location",
    value: "Dhaka, Bangladesh",
    description: "Visit our office",
    href: "https://maps.google.com/?q=Dhaka+Bangladesh",
    icon: FiMapPin,
  },
  {
    id: 4,
    title: "Working Hours",
    value: "Sat – Thu: 10 AM – 6 PM",
    description: "Friday: Closed",
    href: undefined,
    icon: FiClock,
  },
];

const ContactInfo = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".contact-info-card", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-20">
      <div className="wrapper">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
            Contact Information
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Let's Start a <span className="text-brand">Conversation</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500">
            Have a project in mind or need help with something? Reach out to us.
            We'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            const content = (
              <div className="contact-info-card">
                <div className=" group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_15px_40px_rgba(37,99,235,0.10)]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    {item.href && (
                      <FiArrowUpRight
                        size={20}
                        className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                      />
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-ink">
                    {item.title}
                  </h3>

                  <p className="break-words text-base font-semibold text-brand">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("https") ? "_blank" : undefined}
                rel={item.href.startsWith("https") ? "noreferrer" : undefined}
                className="block h-full"
              >
                {content}
              </a>
            ) : (
              <div key={item.id} className="h-full">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
