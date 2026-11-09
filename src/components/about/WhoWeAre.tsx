import { useRef } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiVideo,
  FiTrendingUp,
  FiSmartphone,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".who-image", {
        x: -60,
        opacity: 0,
        duration: 0.9,
      }).from(
        ".who-content > *",
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  const services = [
    {
      icon: FiCode,
      title: "Web Development",
      description: "Modern, scalable and high-performance websites.",
    },
    {
      icon: FiSmartphone,
      title: "Mobile Solutions",
      description: "Seamless digital experiences across devices.",
    },
    {
      icon: FiVideo,
      title: "AI Video Production",
      description: "Creative AI-powered videos and visual storytelling.",
    },
    {
      icon: FiTrendingUp,
      title: "Digital Marketing",
      description: "Strategic campaigns that grow brands and audiences.",
    },
  ];

  const highlights = [
    "Business-focused digital solutions",
    "Creative and AI-powered content production",
    "Modern technology and innovative strategies",
    "Scalable solutions built for long-term growth",
  ];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-paper py-20 sm:py-24 lg:py-28"
    >
      <div className="wrapper">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <div className="who-image relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-tl-[40px] border-l-4 border-t-4 border-brand/30 sm:-left-7 sm:-top-7" />

            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
                alt="Digital agency creative workspace"
                className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[500px]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-7 -right-3 flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-xl sm:-right-6 sm:p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <FiTrendingUp size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">Digital360</h3>
                <p className="text-sm text-gray-500">Ideas Into Impact</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-5 -z-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />
          </div>

          {/* Content Side */}
          <div className="who-content pt-6 lg:pt-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              <span className="h-2 w-2 rounded-full bg-brand" />
              WHO WE ARE
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Your Partner in{" "}
              <span className="text-brand">Digital Innovation</span> & Growth.
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600">
              <strong className="font-semibold text-ink">
                Digital360 Solutions
              </strong>{" "}
              is a full-service digital agency delivering premium web and mobile
              solutions, digital marketing, and growth strategies designed to
              elevate brands, engage audiences, and drive measurable business
              growth.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600">
              Beyond traditional digital services, we also specialize in
              AI-powered video production and creative content solutions. By
              combining technology, creativity, and strategic thinking, we help
              businesses build a strong digital presence and connect with their
              audiences in meaningful ways.
            </p>

            {/* Services */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div key={service.title} className="group flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-ink">{service.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <FiCheckCircle
                    className="mt-1 shrink-0 text-brand"
                    size={18}
                  />
                  <span className="text-sm font-medium leading-6 text-ink-soft">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-3 rounded-lg bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-brand/30"
            >
              Let's Work Together
              <FiArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
