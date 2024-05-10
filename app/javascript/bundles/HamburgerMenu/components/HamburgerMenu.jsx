import "./HamburgerMenu.css";
import Library from "../../Library/components/Library";
import ClearChat from "../../ClearChat/components/ClearChat";
import MenuButton from "./menuButton";
import React, { useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

export default function HamburgerMenu({ libraries, selectedTab, setSelectedTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (menuOpen){
      setMenuOpen(false);
      animate(
        document.getElementById("menu"),
        { width: "25px"},
        { duration: 0.2 },
      );
      animate(
        document.getElementById("menu"),
        { height: "20px"},
        { duration: 0.3, delay: 0.2 },
      );
    }
    else{
      setMenuOpen(true);
      animate(
        document.getElementById("menu"),
        { height: "90vh"},
        { duration: 0.2 },
      );
      animate(
        document.getElementById("menu"),
        {  width: "250px"},
        { duration: 0.3, delay: 0.2 },
      );
    }
  }

  return (
    <motion.div id="menu" className="menuContainer">
      <motion.div onClick={toggleMenu}><MenuButton/></motion.div>
      <AnimatePresence>
        {menuOpen === true ? (
          <motion.div
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [-30, 0] }}
            exit={{
              opacity: 0,
              x: [0, -30],
              transition: { delay: 0 } 
            }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <ClearChat />
            <div>
              <Library
              libraries={libraries}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              />
            </div>
          </motion.div>
          ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
