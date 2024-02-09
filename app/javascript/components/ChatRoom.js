import React, { useState, useEffect } from "react"


const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {

    setMessages([...messages, input]);
    setInput("");

    await fetch('http://127.0.0.1:3000/chat?message=' + input)
      .then((data) => data.json())
      .then((data) => 
      {
        setMessages((messages) => [
          ...messages, data,
        ]);
      });
  };

  return (
    <React.Fragment>
      <h3>Chat Messages</h3>
        <div className="Content">
          {messages.map((content) => {
            return <div>{content}</div>})}
        </div>
        <input
          placeholder="Your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={input ? handleSubmit : undefined}>Go</button>
    </React.Fragment>
  )
}

export default ChatRoom
