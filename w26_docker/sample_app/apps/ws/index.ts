import { prismaClient } from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      try {
        const user = await prismaClient.user.create({
          data: {
            username: Math.random().toString(),
            password: Math.random().toString(),
          },
        });
        ws.send(JSON.stringify(user));
      } catch (error) {
        console.error("Error creating user:", error);
        ws.send(JSON.stringify({ error: "Failed to create user" }));
      }
    },
  },
});
