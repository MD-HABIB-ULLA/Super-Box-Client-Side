import Title from "../../../Components/Common/Title";
import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import twitterIcon from "/twitter.png";
import youTubeIcon from "/youtube.png";

const ShopInformation = () => {
    return (
        <div>
                   <div className="mt-10">
            <Title title1={''} title2={'Shop Information'}></Title>

            <div className="bg-slate-200 p-10 mt-5 ">
                <div className="flex flex-row  items-start justify-between gap-2 text-lg font-semibold ">
                    <div className="flex-1">
                        <h1>Shop name: XYZ Brand</h1>
                        <h1>Shop Location: XYZ Brand, Dhaka, Bangladesh</h1>
                        <h1>Mobile No: 01xxxxxxxxx</h1>
                        <h1>Hotline: 293887675</h1>
                    </div>
                    <div className="flex-1">
                        <h1>Email for Information: xyz@example</h1>
                        <h1>Email for Support: xyz@example</h1>
                        <div className="mt-2 ">
                            <h1 className="text-2xl font-semibold border-b-2 text-start w-fit border-gray-400 border-dashed">Social Media</h1>
                            <div className=" flex flex-row items-center justify-start gap-4 mt-5">
                                <img className=" w-8" src={facebookIcon} alt="" />
                                <img className=" w-8" src={instagramIcon} alt="" />
                                <img className=" w-8" src={linkedinIcon} alt="" />
                                <img className=" w-8" src={twitterIcon} alt="" />
                                <img className=" w-8" src={youTubeIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
        </div>
    );
};

export default ShopInformation;