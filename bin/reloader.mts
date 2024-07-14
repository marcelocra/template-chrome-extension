#!/usr/bin/env -S deno run -A
import { debounce } from "jsr:@std/async/debounce";

const watcher = Deno.watchFs("src");

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
  socket.addEventListener("open", async () => {
    console.log("a client connected!");

    for await (const event of watcher) {
      console.log("event:", event);

      if (socket.readyState === WebSocket.CLOSED) {
        console.log("client disconnected, stopping watcher...");
        break;
      }

      livereload(event, socket);
    }
  });

  socket.addEventListener("message", ({ data }) => {
    console.log("message from client:", data);
  });

  socket.addEventListener("close", () => {
    console.log("a client disconnected!");
  });

  return response;
});
