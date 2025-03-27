import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT: number = 5000;

// MIME types for different file extensions
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create a simple HTTP server
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(`Request for ${req.url}`);
  
  // Default to index.html if the URL is '/'
  let filePath: string = req.url === '/' ? '/index.html' : req.url || '/';
  
  // Serve files from the 'public' directory
  filePath = path.join('public', filePath);
  
  // Get the file extension
  const extname: string = path.extname(filePath);
  
  // Set the content type based on the file extension
  const contentType: string = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file and send it to the client
  fs.readFile(filePath, (err: NodeJS.ErrnoException | null, content: Buffer) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If the file doesn't exist, serve a 404 error
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        // For any other error, serve a 500 error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // If the file exists, serve it with the appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});