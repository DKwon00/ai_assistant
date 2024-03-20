import "../../../stylesheets/styles.css"
import Prompt from "../../Prompt/components/Prompt"
import React from 'react';

export default function ChatRoom (props) {
  return (
    <div className="chatContainer">
      Minecraft
      <hr style={{ borderColor: "#3A3A40"}}/>
      <Prompt chatHistory={props.chatHistory}/>
    </div>
  )
}
