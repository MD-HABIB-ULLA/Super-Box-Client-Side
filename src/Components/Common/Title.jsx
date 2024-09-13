

// eslint-disable-next-line react/prop-types
const Title = ({title1,title2}) => {
    return (
        <div className="text-center ">
            <h1 className=" uppercase text-xs tracking-wider w-[50%] mx-auto font-semibold text-gray-500 ">{title1}</h1>
            <p className=" uppercase text-4xl tracking-[.12em] font-semibold">{title2}</p>
        </div>
    );
};

export default Title;