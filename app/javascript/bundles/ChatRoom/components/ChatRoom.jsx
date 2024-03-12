import React, { useState } from 'react';
import style from "./ChatRoom.module.css";

const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    //update the messages with the new input
    //setMessages([...messages, {id: "user", text: input}]);
    setMessages([...messages, input]);
    //reset the submission box
    setInput("");

    //update the messages with the chatbot input
    await fetch(ENV['ROOT_URL'] + '/send?message=' + input)
      .then((data) => data.json())
      .then((data) => 
      {
        //setMessages((messages) => [
        //  ...messages, {id: "chatbot", text: data},
        //]);
        setMessages((messages) => [
          ...messages, data,
        ]);
      });
  };
  
  const DrawMessages = (props) => {
    return props.msg.map((msg, i) => {
      console.log(msg, i)
      if ((i % 2) == 0){
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
