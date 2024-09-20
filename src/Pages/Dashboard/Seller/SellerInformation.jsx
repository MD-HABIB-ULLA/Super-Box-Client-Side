import Title from "../../../Components/Common/Title";



const SellerInformation = () => {
   
    return (
        <div className="mt-10">
            <Title title1={''} title2={'Seller Information'}></Title>


            <div className="flex justify-between items-end mt-20">
                <div className="flex items-end gap-4">
                    <div className="avatar ">
                        <div className="w-24 rounded">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="text-lg font-mono">
                        <h1>Name: Xyz Example</h1>
                        <p>Email: xyz@example.com</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="btn  btn-error  text-base text-white font-bold uppercase  w-32 ">Ban</button>
                    <button className="btn  btn-warning text-base text-white font-bold uppercase  w-32 " >Suspend</button>
                </div>
            </div>

            <div className="bg-slate-200 p-10 flex justify-between mt-5">
                <div className="text-xl space-y-2 font-semibold flex-1">
                    <h1>Country: XYZ</h1>
                    <h1>Address: XYZ, Cloud Moon,212 XYZ, Cloud Moon,212 XYZ, Cloud Moon,212</h1>
                    <h1>Whatsapp:01XXXXXXXX</h1>
                    <p>NID: 20137578399 <span className="btn btn-link text-xl">View</span></p>
                    <p>Trade License: 20137578399 <span className="btn btn-link text-xl">View</span></p>
                </div>

              
            </div>

        </div>
    );
};

export default SellerInformation;