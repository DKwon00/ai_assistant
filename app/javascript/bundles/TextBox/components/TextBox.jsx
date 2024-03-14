import React from 'react';

export default function TextBox() {
  return (
    <div>
      <input
          placeholder="Your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={input ? handleSubmit : undefined}>Go</button>
    </div>    
  );
}