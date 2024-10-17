// eslint-disable-next-line react/prop-types
const Title = ({ title1, title2 }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title1}</h2>
      <h3 className="text-4xl font-extrabold text-indigo-600 capitalize">
        {title2}
      </h3>
    </div>
  );
};

export default Title;
