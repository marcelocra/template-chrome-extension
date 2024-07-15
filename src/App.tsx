import { useEffect, useMemo, useState } from "react";

import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  // The problem is that we are getting a race condition here, I think. TODO: create a sort of lock here.
  const socket = useMemo(() => {
    const socket = new WebSocket("ws://localhost:8000");

    console.group("socket");
    console.log("socket connection", socket);

    socket.onopen = () => {
      console.log("socket connection opened");
    };

    socket.onmessage = ({ data }) => {
      console.log("message from server:", data);
      if (data === "reload") {
        setCount((count) => count + 1);
      }
    };

    console.groupEnd();

    return socket;
  }, []);

  useEffect(() => {
    console.group("reload");
    console.log("count:", count, "socket:", socket);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("pending reload being consumed...");
      socket.close();
      window.location.reload();
    }
    console.groupEnd();
  }, [socket, count]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center" data-reload={count}>
      <div className="flex flex-row gap-3 justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite4 + React</h1>

      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
