import "./Library.css";
import "../../../stylesheets/styles.css";
import React, { useState } from "react";
import { motion, AnimatePresence, animate, } from "framer-motion";
import icon from "./minecraftIcon.png";

export default function Library({ libraries, selectedTab, setSelectedTab, setMessage }) {
    const [hoverTab, setHoverTab] = useState();

    const handleClick = (title) => {
        if (selectedTab !== undefined) {
        animate(
            document.getElementById(selectedTab),
            { backgroundColor: "#131314", borderColor: "#131314" },
            { duration: 0.5 }
        );
        }
        setSelectedTab(title);
        animate(
        document.getElementById(title),
        { backgroundColor: "#1D1D1F", borderColor: "#2E2E3B" },
        { duration: 0.5 }
        );
        getChatHistory(title);
    };

    const getChatHistory = async(title) => {
        //update the messages with the chatbot input
        await fetch(process.env.ROOT_URL + '/get?title=' + title)
        .then((data) => data.json())
        .then((data) => 
        { 
        if (data.length === 0){
            setMessage([]);
        }
        else {
            data.map(text => (
            setMessage([{id: 'user', text: text[0]}, {id: "chatbot", text: text[1]}])
            ))
        }
        });
    }

    const handleHover = (title) => {
        setHoverTab(title);
        if (title !== selectedTab) {
        animate(
            document.getElementById(title),
            { backgroundColor: "#1d1d1f" },
            { duration: 0.5 }
        );
        }
    };

    const handleExit = (title) => {
        setHoverTab("");
        if (title !== selectedTab) {
        animate(
            document.getElementById(title),
            { backgroundColor: "#131314" },
            { duration: 0.5 }
        );
        }
    };

    return libraries.map((object) => (
        <motion.div
        id={object.title}
        className="libraryContainer"
        onClick={() => handleClick(object.title)}
        whileHover={() => handleHover(object.title)}
        onHoverEnd={() => handleExit(object.title)}
        >
            <img className="libraryIcon" src={icon} />
            {object.title}
            <AnimatePresence className="library" mode="popLayout">
            {object.title === hoverTab && object.title !== selectedTab ? (
                <motion.div>
                <motion.div
                    className="libraryBox"
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                    className="libraryLine"
                    initial={{ x: 10, y: -12, opacity: 0 }}
                    animate={{ x: -1, y: -12, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.3, 0.66, 0.8, 1] }}
                ></motion.div>
                </motion.div>
            ) : null}
            {object.title === selectedTab ? (
                <motion.div>
                <motion.div
                    className="libraryBox"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ x: 4, scale: 2, filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                ></motion.div>
                <motion.div
                    className="libraryLine"
                    initial={{ x: -1, y: -12 }}
                    animate={{
                    x: -15,
                    y: -5,
                    borderRadius: "74.564px",
                    width: "6px",
                    height: "6px",
                    filter: "blur(0px)",
                    opacity: 0,
                    background: "linear-gradient(270deg, #3939ff 0%, #aee6ed 100%)",
                    }}
                    exit={{ x: 10, scaleY: 3, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                ></motion.div>
                </motion.div>
            ) : null}
            </AnimatePresence>
        </motion.div>
    ))
            }