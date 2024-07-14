import { useEffect, useState } from "react";

import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socket.onmessage = ({ data }) => {
      if (data === "reload") {
        alert("calling window reload");
        window.location.reload();
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-row gap-3 justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Viteee + React</h1>

      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

      <p>
        Edits <code>src/App.tsx</code> and save to test HMR
      </p>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
