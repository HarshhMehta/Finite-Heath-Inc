import React from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import Overflow from "../../utils/Overflow";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";


const Navbar = ({
  logoColor,
  setLogoColor,
  pathName,
}: {
  logoColor: string;
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
  pathName: string;
}) => {
  Overflow(".logo svg, .links div", 0.5);

  useGSAP(() => {
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".name-logo",
          scroller: "#homeFixedContainer",
          start: "-20 0",
          end: "+=150",
          scrub: true,
        },
      });
      tl.to(".name-logo", {
        opacity: 0,
      });
      tl.to(
        ".links",
        {
          display: "none",
          opacity: 0,
        },
        "<"
      );
      tl.to(".brandmark", {
        opacity: 1,
      });
      tl.to(".secondary-menu", {
        display: "flex",
        opacity: 1,
      });

      // Define sections and their corresponding colors
      const sections = [
        { id: "hero", color: "#ffff" },
        { id: "work", color: "#0d0e13" },
        { id: "playreel", color: "#e4e0db" },
        { id: "images", color: "#0d0e13" },
        { id: "spread", color: "#0d0e13" },
        { id: "story", color: "#e0ccbb" },
      ];

      // Create ScrollTrigger for each section with special handling for playreel
      sections.forEach((section) => {
        if (section.id === "playreel") {
          // Special configuration for playreel section
          ScrollTrigger.create({
            trigger: `#${section.id}`,
            scroller: "#homeFixedContainer",
            start: "top 10%",
            end: "+=250%", // Match the pin duration
            onEnter: () => {
              setLogoColor(section.color);
            },
            onEnterBack: () => {
              setLogoColor(section.color);
            },
            onLeave: () => {
              // Find the next section's color
              const nextSectionIndex =
                sections.findIndex((s) => s.id === section.id) - 1;
              if (nextSectionIndex >= 0) {
                setLogoColor(sections[nextSectionIndex].color);
              }
            },
            onLeaveBack: () => {
              // Find the previous section's color
              const prevSectionIndex =
                sections.findIndex((s) => s.id === section.id) + 1;
              if (prevSectionIndex < sections.length) {
                setLogoColor(sections[prevSectionIndex].color);
              }
            },
          });
        } else if (section.id === "work" || section.id === "hero") {
          // Normal configuration for other sections
          ScrollTrigger.create({
            trigger: `#${section.id}`,
            scroller: "#homeFixedContainer",
            start: "top 10%",
            end: "bottom 10%",
            // markers: section.id === "hero",
            onEnter: () => {
              setLogoColor(section.color);
            },
            onEnterBack: () => {
              setLogoColor(section.color);
            },
          });
        }
      });
    });
  }, [pathName]);

  return (
    <div
      className="w-full fixed 
    z-[999]
    "
    >
      <div className=" mx-auto p-5 sm:p-12 flex justify-between items-center text-white">
        <Link to="/">
        <div className="logo overflow-hidden flex">
  <img
    src="/Infinity.png" // <-- Replace this with your logo path, e.g., "/finite-health-logo.svg"
    alt="Finite Health Inc. Logo"
    className="w-28 h-auto name-logo relative left-0"
  />
</div>
        </Link>

        <div className=" secondary-menu hidden opacity-0 items-center gap-4">
          <p
            className={`text-base font-light transition-colors duration-300 text-[${logoColor}]`}
          >
            Menu
          </p>
          <div className=" cursor-pointer space-y-[3px]">
            <div
              style={{
                backgroundColor: logoColor,
              }}
              className={`line w-5 h-[1.5px] bg-opacity-100  transition-colors duration-300`}
            ></div>
            <div
              style={{
                backgroundColor: logoColor,
              }}
              className={`line w-5 h-[1.5px]  transition-colors duration-300`}
            ></div>
            <div
              style={{
                backgroundColor: logoColor,
              }}
              className={`line w-5 h-[1.5px]  transition-colors duration-300`}
            ></div>
          </div>
        </div>

        <div className="links overflow-hidden hidden sm:flex items-center gap-10">
          <div className="sm:flex items-center gap-5">
            <Link to={"#"} className=" relative group">
              <a
                style={{
                  color: logoColor,
                }}
                className="text-base font-light"
                key={"work"}
              >
                About me
              </a>
            </Link>
            <Link
              style={{
                color: logoColor,
              }}
              className="text-base font-light"
              to={"#"}
              target="blank"
            >
              Services
            </Link>
            <Link
              to={"#"}
              target="blank"
            >
             Paperwork/Disclosures:
            </Link>
            <Link to={"#"} target="blank">
            Appointment
            </Link>
            <Link to={"#"} target="blank">
            Blog 
            </Link>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
