import Title from "../Common/Title";

const About = () => {
  return (
    <div className="my-10">
      <Title title1="WHY WE ARE ?" title2="ABOUT US"></Title>
      <div className="container mx-auto flex flex-row gap-20 py-10 px-10">
        <div className=" flex-1 py-5">
          <h1 className="text-2xl font-semibold">We are the connector,</h1>
          <p className="font-light ">
            the bridge that needs to be established to extend our culture to the
            world. By acting as the link between diverse communities, we
            facilitate the sharing and appreciation of our unique heritage on a
            global scale. Our role is to ensure that the richness of our
            traditions, values, and customs is experienced and understood by
            people everywhere, fostering mutual respect and understanding.
            Through our efforts, we aim to create a global tapestry where every
            culture is valued and celebrated.
          </p>
        </div>
        <div className=" flex-1  rounded-3xl">
      
          <img
            src="https://i.ibb.co.com/QCnhtD2/pngtree-fairy-world-scene-in-tale-picture-image-2422015.png"
            alt=""
            className="object-cover object-center rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
