import AboutHero from "../components/about/AboutHero";
import CoreValues from "../components/about/CoreValues";
import OurStory from "../components/about/OurStory";
import StatsCounter from "../components/about/StatsCounter";
import Team from "../components/about/Team";
import VisionMission from "../components/about/VisionMission";
import WhoWeAre from "../components/about/WhoWeAre";

const About = () => {
  return (
    <div>
      <AboutHero />
      <WhoWeAre />
      <VisionMission />
      <Team />
      <OurStory />
      <CoreValues />
      <StatsCounter />
    </div>
  );
};

export default About;
