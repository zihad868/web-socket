import { Server, createServer } from "http";
import app from "./app";
import config from "./config";
import { WebSocketServer, WebSocket } from "ws";

let server: Server;

// Create an HTTP server
server = createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("🔌 New WebSocket client connected");

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: "Welcome to WebSocket server!" }));

  // Listen for messages from the client
  ws.on("message", (data: string) => {
    console.log(`📩 Received message: ${data}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });

  // Handle WebSocket errors
  ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
  });
});

// Main function to start the server
function main() {
  try {
    server = app.listen(config.port, () => {
      console.log("Server is running on port", config.port);
    });
  } catch (error) {
    console.log(error);
  }
}

// Start the server
main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
