const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.argv[2]) || 4173;

const contentTypes = {
  ".css": "text/css; charset=UTF-8",
  ".html": "text/html; charset=UTF-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=UTF-8",
  ".txt": "text/plain; charset=UTF-8"
};

const server = http.createServer((request, response) => {
  const requestedUrl = new URL(request.url, `http://127.0.0.1:${port}`);
  const relativePath = requestedUrl.pathname === "/" ? "/index.html" : requestedUrl.pathname;
  const filePath = path.join(root, decodeURIComponent(relativePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=UTF-8"
      });
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream"
    });
    response.end(content);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static server running at http://127.0.0.1:${port}`);
});
