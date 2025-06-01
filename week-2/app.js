const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the base directory for file operations
const baseDir = path.join(__dirname, 'files');

// Ensure the 'files' directory exists
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Set common headers
    res.setHeader('Content-Type', 'text/plain');

    // Create file
    if (pathname === '/create' && req.method === 'GET') {
        const filename = query.name;
        const content = query.content || '';

        if (!filename) {
            res.statusCode = 400;
            return res.end('Filename is required');
        }

        const filepath = path.join(baseDir, filename);

        fs.writeFile(filepath, content, (err) => {
            if (err) {
                res.statusCode = 500;
                return res.end('Error creating file');
            }
            res.end(`File "${filename}" created successfully`);
        });

    // Read file
    } else if (pathname === '/read' && req.method === 'GET') {
        const filename = query.name;

        if (!filename) {
            res.statusCode = 400;
            return res.end('Filename is required');
        }

        const filepath = path.join(baseDir, filename);

        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found');
            }
            res.end(data);
        });

    // Delete file
    } else if (pathname === '/delete' && req.method === 'GET') {
        const filename = query.name;

        if (!filename) {
            res.statusCode = 400;
            return res.end('Filename is required');
        }

        const filepath = path.join(baseDir, filename);

        fs.unlink(filepath, (err) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found or unable to delete');
            }
            res.end(`File "${filename}" deleted successfully`);
        });

    // Invalid route
    } else {
        res.statusCode = 404;
        res.end('Invalid route');
    }
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
