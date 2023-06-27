import React, { useState, useEffect } from "react";

interface Message {
  id: number;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((data: Message[]) => setMessages(data))
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