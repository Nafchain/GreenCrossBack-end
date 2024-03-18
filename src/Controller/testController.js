const http = require('http');
const url = require('url');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Route the request based on the URL
  if (path === '/endpoint' && req.method === 'POST') {
    // Handle POST requests to /endpoint
    let requestBody = '';
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });
    req.on('end', () => {
      // Process the request body
      try {
        const jsonData = JSON.parse(requestBody);
        // Here, you can do whatever you want with the JSON data
        // For example, you can save it to a file or a database
        // In this example, we'll just log it
        console.log('Received JSON data:', jsonData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received successfully' }));
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // Handle other requests or invalid endpoints
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
