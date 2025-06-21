import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap/all";

const Images = () => {
  const position = [
    {
      video:
        "https://videocdn.cdnpk.net/videos/3cc10bb7-7989-41e8-ad93-2b268a7d8d92/horizontal/previews/clear/large.mp4?token=exp=1750513428~hmac=cb467de02d9b517858da8f549784ccba831f1764259dd76f8ebce2642bbfa02e",
      right: "right-[60%]",
      top: "top-[30%]",
      height: "h-[30%]",
      width: "w-[100%]",
    },
    {
      image:
        "https://img.freepik.com/free-photo/smiling-young-male-doctor-with-medical-glasses-wearing-medical-robe-with-stethoscope-sitting-desk_141793-98903.jpg?t=st=1750512363~exp=1750515963~hmac=dade12bb5c7cb600b8516323da46b7ccd6d2211ac08bf3d47aa4838b105e267d&w=1800",
      right: "-right-[40%]",
      top: "top-[10%]",
      height: "h-[35%]",
      width: "w-[50%]",
    },
    {
      image:
        "https://img.freepik.com/free-photo/diet-concept-with-female-scientist-healthy-food_23-2148193257.jpg?t=st=1750512823~exp=1750516423~hmac=3ecd20a298769366a05040faa424a2074314ea2b7196edbce9d0b07c0bb5de1d&w=1800",
      right: "right-[60%]",
      top: "top-[90%]",
      height: "h-[40%]",
      width: "w-[120%]",
    },
    {
      video:
        "https://videocdn.cdnpk.net/videos/4ec44498-9c50-4170-aa43-cf18f1ee429f/horizontal/previews/clear/large.mp4?token=exp=1750513468~hmac=4e0be2e142448d2661213cd917cbda39a118c44635a4cf49e77b9f66d906e116",
      right: "-right-[90%]",
      top: "top-[86%]",
      height: "h-[50%]",
      width: "w-[100%]",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".images-section",
        scroller: "#homeFixedContainer",
        start: "top 30%",
        end: "top -200%",
        scrub: true,
      },
      defaults: {
        ease: Expo.easeOut,
      },
    });

    tl.to(
      ".images:nth-child(1) video",
      {
        x: "-50%",
        y: "-100%",
      },
      "a"
    )
      .to(
        ".images:nth-child(2) img",
        {
          x: "90%",
          y: "-50%",
        },
        "a"
      )
      .to(
        ".images:nth-child(3) img",
        {
          x: "-50%",
          y: "-50%",
        },
        "a"
      )
      .to(
        ".images:nth-child(4) video",
        {
          x: "50%",
          y: "-50%",
        },
        "a"
      );
  }, []);

  return (
    <div
      id="images"
      className="images-section w-full h-[70vh] sm:h-[160vh] overflow-hidden flex items-center justify-center bg-white"
    >
      <div className="relative w-1/3 sm:w-1/4 h-1/2">
        {position.map((item, index) => {
          return (
            <div
              className={`images absolute ${item.height} ${item.width} ${item.top} ${item.right}`}
              id={`${index}`}
              key={index}
            >
              {item.image ? (
                <img className="h-full w-full object-cover" src={item.image} />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  src={item.video}
                ></video>
              )}
            </div>
          );
        })}

        <img
          className="h-full w-full object-cover"
          src="https://img.freepik.com/free-photo/business-executives-doing-video-conference_1170-1924.jpg?t=st=1750512428~exp=1750516028~hmac=e1973c7b4a765633d219ceb6395a74cf57014c187ae4edd18be170f7d897b24f&w=1800"
          alt=""
        />
      </div>
    </div>
  );
};

export default Images;
