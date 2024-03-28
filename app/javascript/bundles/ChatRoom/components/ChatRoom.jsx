import "../../../stylesheets/styles.css";
import Prompt from "../../Prompt/components/Prompt";
import Search from "../../SearchBox/components/SearchBox";
import React from 'react';

export default function ChatRoom(props) {
  return (
    <div className="body">
      <div className="tabContainer">
        <Search />
      </div>
      <div className="chatContainer">
        Lorem Ipsum
        <hr style={{ borderColor: "#3A3A40" }}></hr>
        <Prompt chatHistory={props.chatHistory}/>
      </div>
    </div>
  );
}
