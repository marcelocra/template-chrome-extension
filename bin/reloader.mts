#!/usr/bin/env -S deno run -A
import { debounce } from "jsr:@std/async/debounce";

let watcher: Deno.FsWatcher;

const livereload = debounce((event: Deno.FsEvent, socket: WebSocket) => {
  console.log("[%s] %s", event.kind, event.paths[0]);
  console.log("reloading...");
  socket.send("reload");
}, 500);

Deno.serve((req) => {
  // We only support websockets.
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  console.log("new request");

  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.log("a client connected!");

    watcher = Deno.watchFs("src");

    async function stream() {
      for await (const event of watcher) {
        if (socket.readyState !== WebSocket.OPEN) {
          return;
        }

        livereload(event, socket);
      }
    }

    stream();
  });

  socket.addEventListener("message", ({ data }) => {
    console.log("message from client:", data);
  });

  socket.addEventListener("close", () => {
    console.log("a client disconnected!");
  });

  return response;
});
