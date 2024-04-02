import "../../../stylesheets/styles.css";
import Library from "../../Library/components/Library";
import Prompt from "../../Prompt/components/Prompt";
import Search from "../../SearchBox/components/SearchBox";
import React, { useState } from 'react';

import { motion, AnimatePresence, animate } from "framer-motion";


export default function ChatRoom(props) {
  const [selectedTab, setSelectedTab] = useState();
  const [message, setMessage] = useState();

  return (
    <div className="body">
      <div className="tabContainer">
        <Search />
        <div>
          Library
          <Library 
            libraries={props.gameTitles} 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab}
            setMessage={setMessage}
          />
        </div>
      </div>
      <div className="chatContainer">
        {selectedTab}
        <hr style={{ borderColor: "#3A3A40" }}></hr>
        <AnimatePresence mode="wait">
          <Prompt chatHistory={message} gameTitle={selectedTab}/>
        </AnimatePresence>
      </div>
    </div>
  );
}
