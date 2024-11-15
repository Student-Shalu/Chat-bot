import React, { useState } from 'react';
import './App.css';
import shalu from './assests/shalu.png';
import DA from './assests/DA.png';
import ContrastIcon from '@mui/icons-material/Contrast';

function App() {
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSendMessage = (sender, receiver, text) => {
    if (text.trim()) {
      const newMessage = { sender, receiver, text, timestamp: new Date().toLocaleTimeString() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <ContrastIcon />
      {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
      </div>
      <Phone
        name="Role Model"
        avatar={DA}
        otherName="Shalu"
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      <Phone
        name="Shalu"
        avatar={shalu}
        otherName="Role Model"
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

function Phone({ name, avatar, otherName, messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    onSendMessage(name, otherName, inputValue);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <img src={avatar} alt="avatar" className="avatar" />
        <span>{name}</span>
      </div>
      <div className="chat">
        {messages
          .filter((msg) => msg.sender === name || msg.receiver === name)
          .map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === name ? 'right' : 'left',
                color: msg.sender === name ? 'lightgreen' : 'white',
              }}
            >
              <strong>{msg.sender}:</strong> {msg.text} <span className="timestamp">({msg.timestamp})</span>
            </div>
          ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
