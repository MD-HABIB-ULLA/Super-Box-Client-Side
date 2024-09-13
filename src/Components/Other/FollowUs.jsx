import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import twitterIcon from "/twitter.png";
import youTubeIcon from "/youtube.png";
import Title from "../Common/Title";

const FollowUs = () => {
  return (
    <div>
      <div className="mb-10">
        <Title title1={"you can also"} title2={"follow us"}></Title>
        <div className=" flex flex-row items-center justify-center gap-10 mt-10">
          <img className=" w-12" src={facebookIcon} alt="" />
          <img className=" w-12" src={instagramIcon} alt="" />
          <img className=" w-12" src={linkedinIcon} alt="" />
          <img className=" w-12" src={twitterIcon} alt="" />
          <img className=" w-12" src={youTubeIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
