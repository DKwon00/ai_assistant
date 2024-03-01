import React, { useState } from 'react';
import style from "./css/chatRoom.module.css";

const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    setMessages([...messages, input]);
    setInput("");

    await fetch('http://127.0.0.1:3000/send?message=' + input)
      .then((data) => data.json())
      .then((data) => 
      {
        setMessages((messages) => [
          ...messages, data,
        ]);
      });
  };
  
  const DrawMessages = (props) => {
    return props.msg.map((msg, i) => {
      console.log(msg, i)
      if (i == 0){
        return <div class={style.user}>{msg}</div>
      }
      else {
        return <div class={style.chatBot}>{msg}</div>
      }
    }
    )
  }

  return (
    <div>
      <h3>Chat Messages</h3>
      <div className="Content">
        {props.chatHistory.map((history) => (
          <DrawMessages msg={history}></DrawMessages>
        ))}
        <DrawMessages msg={messages}></DrawMessages>
      </div>
      <input
        placeholder="Your prompt here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={input ? handleSubmit : undefined}>Go</button>
    </div>
  )
}

export default ChatRoom;
