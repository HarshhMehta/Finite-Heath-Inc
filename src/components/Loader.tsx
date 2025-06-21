import { motion } from "framer-motion";
import { easeOutExpo } from "../utils/anim";

const Loader = () => {
  return (
    <motion.div
      className=" z-0 absolute inset-0 bg-[#0D0E13] flex justify-center items-center"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        delay: 2.5,
      }}
    >
      <div className="mask h-[7.5vw] w-[7.5vw] relative overflow-hidden">
        <img src="/Infinity.png" alt="" />
        <motion.div
          className="filler absolute inset-[3px] bg-transparent/50 z-[2]"
          style={{
            transformOrigin: "center bottom",
          }}
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 2,
            ease: easeOutExpo,
          }}
        />
        <div className="background z-[1] absolute inset-[3px] opacity-20 bg-[#E5E1DC]" />
      </div>
    </motion.div>
  );
};

export default Loader;
