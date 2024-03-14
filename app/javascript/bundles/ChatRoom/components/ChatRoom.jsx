import React, { useState } from 'react';
import style from "../components/ChatRoom.module.css";

const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async() => {
    input.preventDefault();
    //update the messages with the new input
    //setMessages([...messages, {id: "user", text: input}]);
    setMessages([...messages, input]);
    //reset the submission box
    setInput("");

    //update the messages with the chatbot input
    await fetch(process.env.ROOT_URL + '/send?message=' + input)
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
    <div class={style.chatPage}>
      <div class={style.chatSidebar}>
        Need to create components!
      </div>
      <div class={style.chatBox}>
        <h3>Chat Messages</h3>
        <div className="Content">
          {props.chatHistory.map((history) => (
            <DrawMessages msg={history}></DrawMessages>
          ))}
          <DrawMessages msg={messages}></DrawMessages>
        </div>

        <form onSubmit={input ? handleSubmit : undefined}>
          <input
            placeholder="Your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom;
