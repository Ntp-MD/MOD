const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Define paths
const cssDir = path.join(__dirname, 'public/_css');
const indexFile = path.join(__dirname, 'index.html');

// Serve static files (CSS, JS, etc.)
app.use('/_css', express.static(path.join(__dirname, 'public/_css')));

// Serve the index.html explicitly
app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

// API endpoint to list all CSS files
app.get('/list-css-files', (req, res) => {
    fs.readdir(cssDir, (err, files) => {
        if (err) {
            console.error('Error reading CSS directory:', err);
            return res.status(500).json({ error: 'Unable to read CSS directory' });
        }

        // Filter for CSS files only
        const cssFiles = files.filter(file => file.endsWith('.css'));
        res.json(cssFiles);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
