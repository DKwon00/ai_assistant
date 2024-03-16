import { useState, React } from 'react';
import SearchIcon from "./search.svg"
import "../../../stylesheets/styles.css"
import { motion, useAnimation } from "framer-motion";

export default function InputBox() {
  const boxControls = useAnimation();
  const lineControls = useAnimation();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [isClicked, setIsClicked] = useState(false)

  const lineVariants = {
    hover: { scale: 1.2, transition: { duration: 0.4 }, opacity: 0.6 },
    noHover: { scale: 0, transition: { duration: 0.4 }, opacity: 0 },
    focus: { scaleX: 5.3, transition: { duration: 0.4 }, opacity: 1 },
    exitFocus: { scaleX: 1, transition: { duration: 0.4 }, opacity: 0 },
  };

  const boxVariants = {
    hover: { y: [0, -17], transition: { duration: 0.4 }, opacity: 0.6 },
    noHover: { y: [-17, 0], transition: { duration: 0.4 }, opacity: 0 },
    focus: {
      scaleY: 1.74,
      scaleX: 1.7,
      borderRadius: "4px",
      transition: { duration: 0.4 },
      opacity: 1,
      filter: "blur(0px)",
    },
    exitFocus: {
      scaleY: 1,
      scaleX: 1,
      borderRadius: "74.564px",
      transition: { duration: 0.4 },
      opacity: 0,
      filter: "blur(2px)",
    },
  };

  const enter = () => {
    if (!isClicked) {
      lineControls.start("hover");
      boxControls.start("hover");
    }
  };

  const exit = () => {
    if (!isClicked) {
      lineControls.start("noHover");
      boxControls.start("noHover");
    }
  };

  const focus = () => {
    setIsClicked(true);
    lineControls.start("focus");
    boxControls.start("focus");
  };

  const exitFocus = () => {
    setIsClicked(false);
    lineControls.start("exitFocus");
    boxControls.start("exitFocus");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setMessage([...message, { id: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div>
      <img className="search" src={SearchIcon} />
      <motion.input
        className="input"
        placeholder="Ask a question about FAFSA..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onHoverStart={() => enter()}
        onHoverEnd={() => exit()}
        onFocus={() => focus()}
        onBlur={() => exitFocus()}
      />
      <motion.div
        className="inputLine"
        initial="noHover"
        variants={lineVariants}
        animate={lineControls}
      />
      <motion.div
        className="inputBox"
        initial="noHover"
        variants={boxVariants}
        animate={boxControls}
      />
      <motion.div />
      <div>
        {message.map((text, index) => (
          <div key={index}>
            <span>{text.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
