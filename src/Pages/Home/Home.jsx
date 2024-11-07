import About from "../../Components/Other/About";
import Banner from "../../Components/Other/Banner";
import MyApexChart from "../../Components/Other/Chart";
import Chart from "../../Components/Other/Chart";
import ComingSoonFeatures from "../../Components/Other/ComingSoonFeatures";
import Contact from "../../Components/Other/Contact";
import FAQAccordion from "../../Components/Other/FAQAccordion";
import Feature from "../../Components/Other/Feature";
import FollowUs from "../../Components/Other/FollowUs";
import HowItWorksAccordion from "../../Components/Other/HowItWorksAccordion";
import PricingSection from "../../Components/Other/PricingSection";
import Typo from "../../Components/Other/Typo";

const Home = () => {
  return (
    <div>
      <Banner />
      <Feature />
      <HowItWorksAccordion />
      <Typo />
      <PricingSection />
      <ComingSoonFeatures />
      {/* <MyApexChart/> */}
      <About />
      <FAQAccordion />
      <Contact />

      {/* <FollowUs /> */}
    </div>
  );
};

export default Home;
