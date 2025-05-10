import { useEffect, useState } from 'react';
// import useWebSocket from 'react-use-websocket';

const App = () => {
  const [messages, setMessages] = useState([]);
  const jwtToken = 'Sec-WebSocket-Protocol'; 

  useEffect(() => {
    const ws = new WebSocket("wss://jgedemomaster.oceanlab.in", jwtToken);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ type: 'subscribe', channels: ['stock_price'] }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'stock_price') {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      ws.close();
    };
  }, []);

  
  return (
    <div>
      <h1>Stock Price Updates</h1>
      <p>{JSON.stringify(messages)}</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.t}</strong>: LTP {msg.ltp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
