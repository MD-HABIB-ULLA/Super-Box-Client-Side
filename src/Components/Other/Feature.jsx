import FeatureCard from "../Common/FeatureCard";
import Title from "../Common/Title";

const Feature = () => {
  const featureData = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="max-w-7xl m-auto px-10">
      <div className="py-10">
        {" "}
        <Title title1="our provided" title2="services"></Title>
      </div>
      <div className="grid grid-cols-4 gap-5 ">
        {featureData?.map((data, index) => (
          <FeatureCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
