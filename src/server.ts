import { Server, createServer } from "http";
import app from "./app";
import config from "./config"; // assuming this file contains your configuration (like port)
import { WebSocketServer, WebSocket } from "ws";

// Initialize the HTTP server
let server: Server;
server = createServer(app);

// Create the WebSocket server
const wss = new WebSocketServer({ server });

// WebSocket connection handler
wss.on("connection", (ws: WebSocket) => {
  console.log("🔌 New WebSocket client connected");

  // Send a welcome message to the connected client
  ws.send(JSON.stringify({ message: "Welcome to WebSocket server!" }));

  // Listen for messages from the client
  ws.on("message", (data: string) => {
    console.log(`📩 Received message: ${data}`);

    // Broadcast the received message to all connected clients
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
    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

// Start the server
main();

// Gracefully handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection detected, shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Gracefully handle uncaught exceptions
process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException detected, shutting down ...`);
  process.exit(1);
});
