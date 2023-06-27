import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}

export default App;
