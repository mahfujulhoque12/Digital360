import CTA from "../components/home/CTA";
import Hero from "../components/home/Hero";
import OurProcess from "../components/home/OurProcess";
import Portfolio from "../components/home/Portfolio";
import Pricing from "../components/home/Pricing";
import Services from "../components/home/Services";
import Stats from "../components/home/Stats";
import Testimonial from "../components/home/Testimonial";
import TrustedBy from "../components/home/TrustedBy";
import WhyChooseUs from "../components/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChooseUs />
      <Stats />
      <OurProcess />
      <Portfolio />
      <Pricing />
      <Testimonial />
      <CTA />
    </div>
  );
};

export default Home;
