import About from "../../Components/Other/About";
import Banner from "../../Components/Other/Banner";
import MyApexChart from "../../Components/Other/Chart";
import Chart from "../../Components/Other/Chart";
import Contact from "../../Components/Other/Contact";
import Feature from "../../Components/Other/Feature";
import FollowUs from "../../Components/Other/FollowUs";
import Typo from "../../Components/Other/Typo";

const Home = () => {


  return (
    <div>
      
      <Banner />
      <Feature />
      <Typo/>
      {/* <MyApexChart/> */}
      <About />
      <Contact />
      {/* <FollowUs /> */}
    </div>
  );
};

export default Home;
