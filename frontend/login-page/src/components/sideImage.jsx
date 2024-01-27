import schoolBackground from "../assets/school background.jpg";

const SideImage = () => {
  return (
    <div className="container border-black">
      <img
        className="object-fill h-full w-full mb-12 pb-20 sm:pb-0 sm:mb-0 sm:h-screen"
        src={schoolBackground}
        alt="school image"
      />
    </div>
  );
};

export default SideImage;
