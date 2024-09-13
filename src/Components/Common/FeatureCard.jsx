import { BsBoxFill } from "react-icons/bs";

const FeatureCard = () => {
  return (
    <div>
      <div className="card  bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <BsBoxFill className=" text-5xl" />
          <h2 className="card-title">Dynamic Accent Colors!</h2>
          <p>Apply any color for your website according to a corporate style</p>
          {/* <div className="card-actions justify-end">
                        <button className="btn btn-primary">Accept</button>
                        <button className="btn btn-ghost">Deny</button>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
