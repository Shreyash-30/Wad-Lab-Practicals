// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(PORT, () => {
//     console.log(`Server is running successfully!`);
//     console.log(`Visit http://localhost:${PORT} in your browser to view the static site.`);
// });


const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {

    console.log(`Request URL: ${req.url}`);

    // Default file
    let filePath = req.url === '/'
        ? './public/index.html'
        : './public' + req.url;

    // Get extension
    const extname = path.extname(filePath);

    // MIME types
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;

        case '.js':
            contentType = 'application/javascript';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.jpg':
            contentType = 'image/jpeg';
            break;

        case '.gif':
            contentType = 'image/gif';
            break;
    }

    // Read file manually
    fs.readFile(filePath, (err, content) => {

        if (err) {

            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });

                res.end('<h1>404 - File Not Found</h1>');
            } else {

                // Server error
                res.writeHead(500);

                res.end(`Server Error: ${err.code}`);
            }

        } else {

            // Success response
            res.writeHead(200, {
                'Content-Type': contentType
            });

            res.end(content, 'utf8');
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});