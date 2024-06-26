import "./ChatRoom.css";
import logo from "../components/logo.png";
import Prompt from "../../Prompt/components/Prompt";
import Library from "../../Library/components/Library";
import Search from "../../SearchBox/components/SearchBox";
import ClearChat from "../../ClearChat/components/ClearChat";
import HamburgerMenu from "../../HamburgerMenu/components/HamburgerMenu";
import React, { useState } from 'react';
import { motion, AnimatePresence, animate } from "framer-motion";

export default function ChatRoom(props) {
  const [selectedTab, setSelectedTab] = useState();
  const [message, setMessage] = useState([]);

  return (
    <div className="body">
      <div className="header">
        <div><img src={logo} className="titleImg"/></div>
        <div className="title">Juni-AI_</div>
      </div>
      <div className="tabContainer">
        <ClearChat             
            selectedTab={selectedTab} 
            setMessage={setMessage}/>
        <div>
          Library
          <Library 
            libraries={props.gameTitles} 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
      <div className="chatContainer">
        <HamburgerMenu             
          libraries={props.gameTitles}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          message={message}
          setMessage={setMessage}/>
        <div className="gameTitle">{selectedTab || "Select a library to begin chatting!"}</div>
        <hr style={{ borderColor: "#3A3A40" }}></hr>
        <AnimatePresence mode="wait">
        { !selectedTab ? (
          <motion.div className="initLibrary" animate={{ opacity: 1, scale: 1.5 }}>          
            <Library 
              libraries={props.gameTitles} 
              selectedTab={selectedTab} 
              setSelectedTab={setSelectedTab}
              message={message}
              setMessage={setMessage}
            />
          </motion.div>
        ) : null }
          <Prompt chatHistory={message} setMessage={setMessage} gameTitle={selectedTab}/>
        </AnimatePresence>
      </div>
    </div>
  );
}
