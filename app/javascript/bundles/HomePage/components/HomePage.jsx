import "./HomePage.css";
import { motion } from "framer-motion";
import React from "react";

export default function HomePage() {
  document.body.style = "background: linear-gradient(140deg, rgba(0,130,147,1) 0%, rgba(10,10,10,1) 34%, rgba(10,10,10,1) 64%, rgba(57,57,255,1) 99%);";
  const title = "Juni-AI";

  const container = {
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <div className="homePage">
      <div className="logo">
        <div className="logoEye">
          <motion.div
            className="eye"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 1.5,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          ></motion.div>
          <motion.div
            className="eyelid"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -200, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [1, 0.71, 0.4, 1.01],
            }}
          ></motion.div>
          <motion.div
            className="eyeMouth"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          ></motion.div>
        </div>
        <motion.div
          className="logoText"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((letter, index) => (
            <motion.p className="typing" variants={child} key={index}>
              {letter}
            </motion.p>
          ))}
          <motion.p
            className="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.75,
            }}
          >
            _
          </motion.p>
        </motion.div>
      </div>
      <motion.a 
        href="google.com"
        className="link" 
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}             
        transition={{ delay: 1.75 }} 
        re
        >
          Chat Now
      </motion.a>
    </div>
  );
}
