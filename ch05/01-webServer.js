const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  res.end("<h1>Hello Node!</h1>");
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
