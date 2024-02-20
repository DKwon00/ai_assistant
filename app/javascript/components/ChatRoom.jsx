import React, { useState } from 'react';
import style from "./css/chatRoom.module.css";

const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    setMessages([...messages, input]);
    setInput("");

    //possible private URL in ENV
    //have to add role to messages array
    await fetch('http://127.0.0.1:3000/send?message=' + input)
      .then((data) => data.json())
      .then((data) => 
      {
        setMessages((messages) => [
          ...messages, data,
        ]);
      });
  };
  
  const DrawHistory = () => {
    console.log(props.chatHistory)
    return props.chatHistory.map((history) => (
      <div>
        {history.map((msg, i) => {
          console.log(msg, i)
          if (i == 0){
            return <div className={style.user}>{msg}</div>
          }
          else {
            return <div className={style.chatBot}>{msg}</div>
          }
        }
        )}
        </div>
    ))
  }

  return (
    <div>
      <h3>Chat Messages</h3>
      <div className="Content"></div>
      <DrawHistory></DrawHistory>
      
      <div className="Content">
        {messages.map((msg, i) => {
          if (i == 0){
            return <div className={style.user}>{msg}</div>
          }
          else {
            return <div className={style.chatBot}>{msg}</div>
          }
        }
        )}
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