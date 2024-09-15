import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import twitterIcon from "/twitter.png";
import youTubeIcon from "/youtube.png";
import Title from "../Common/Title";
import { Link } from "react-router-dom";

const FollowUs = ({ instagram, facebook, linkedin, twitter, youtube }) => {
  return (
    <div>
      <div className="mb-10 mt-20">
        <Title title1={"you can also"} title2={"follow us"}></Title>
        <div className=" flex flex-row items-center justify-center gap-10 mt-10">
          <Link to={instagram}>
            {" "}
            <img className=" w-12" src={facebookIcon} alt="" />
          </Link>
          <Link to={facebook}>
            {" "}
            <img className=" w-12" src={instagramIcon} alt="" />
          </Link>
          <Link to={linkedin}>
            {" "}
            <img className=" w-12" src={linkedinIcon} alt="" />
          </Link>
          <Link to={twitter}>
            {" "}
            <img className=" w-12" src={twitterIcon} alt="" />
          </Link>
          <Link to={youtube}>
            {" "}
            <img className=" w-12" src={youTubeIcon} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
