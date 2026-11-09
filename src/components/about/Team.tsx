import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiLinkedin,
  FiFacebook,
  FiGithub,
  FiArrowUpRight,
  FiUsers,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  linkedin: string;
  facebook: string;
  github: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    designation: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&auto=format&fit=crop&q=85",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/",
  },
  {
    id: 2,
    name: "Sophia Williams",
    designation: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=85",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/",
  },
  {
    id: 3,
    name: "Daniel Smith",
    designation: "Lead Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=85",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/",
  },
  {
    id: 4,
    name: "Emily Johnson",
    designation: "Digital Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&auto=format&fit=crop&q=85",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/",
  },
];

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const teamRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Team Cards Animation
      if (teamRef.current) {
        gsap.from(teamRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-24 lg:py-32"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-soft blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl" />

      <div className="wrapper relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light/30 bg-brand-soft px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand">
            <FiUsers className="h-4 w-4" />
            Meet Our Team
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The People Behind <span className="text-brand">Our Success</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft/75 sm:text-lg">
            Great ideas become reality through great people. Meet the passionate
            minds bringing creativity, expertise, and innovation to every
            project.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {teamMembers.map((member) => (
            <div
              ref={teamRef}
              key={member.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-paper shadow-lg shadow-brand-dark/5 transition-all duration-500 hover:-translate-y-2 hover:border-brand-light/40 hover:shadow-2xl hover:shadow-brand/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-brand-soft">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Social Links */}
                <div className="absolute bottom-5 left-0 flex w-full translate-y-5 justify-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-paper/30 bg-paper/15 text-paper backdrop-blur-md transition-all duration-300 hover:bg-brand hover:border-brand"
                  >
                    <FiLinkedin className="h-5 w-5" />
                  </a>

                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Facebook`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-paper/30 bg-paper/15 text-paper backdrop-blur-md transition-all duration-300 hover:bg-brand hover:border-brand"
                  >
                    <FiFacebook className="h-5 w-5" />
                  </a>

                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-paper/30 bg-paper/15 text-paper backdrop-blur-md transition-all duration-300 hover:bg-brand hover:border-brand"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                </div>

                {/* Member Number */}
                <span className="absolute right-4 top-4 rounded-lg border border-paper/30 bg-paper/20 px-3 py-1.5 text-xs font-bold text-paper backdrop-blur-md">
                  0{member.id}
                </span>
              </div>

              {/* Member Information */}
              <div className="relative p-6">
                <div className="mb-3 h-1 w-9 rounded-full bg-brand-light transition-all duration-500 group-hover:w-16 group-hover:bg-brand" />

                <h3 className="text-lg font-bold text-ink transition-colors duration-300 group-hover:text-brand sm:text-xl">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-ink-soft/65">
                  {member.designation}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand/70">
                    Our Team
                  </span>

                  <FiArrowUpRight className="h-5 w-5 text-brand/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-base text-ink-soft/70 sm:text-lg">
            Together, we turn ambitious ideas into{" "}
            <span className="font-bold text-brand">extraordinary results.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
