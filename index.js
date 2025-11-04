// const express = require("express"); // imported express module
// const app = express(); // initialized express application
// const PORT = process.env.PORT || 3000;
// const app = require('./app')///

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.METHOD(Path2D,HANDLER)
// METHOD -  GET/POST/PUT/PATCH/DELETE
// PATH - URL PATH - "/",'/users','/orders','/order/:id'
// HANDLER - CALLBACK FUNCTION

const app = require('./app'); // Import the Express app from app.js
const http = require('http');

const PORT = process.env.PORT || 3000;

// Create an HTTP server using the app
const server = http.createServer(app);

// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

// Optional: handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err);
});
