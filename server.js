const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/_css', express.static(path.join(__dirname, 'public/_css')));
app.use('/_js', express.static(path.join(__dirname, 'public/_js')));

// API endpoint for listing CSS files
app.get('/list-css-files', (req, res) => {
    const cssDir = path.join(__dirname, 'public/_css');
    fs.readdir(cssDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read CSS directory' });
        }
        const cssFiles = files.filter(file => file.endsWith('.css'));
        res.json(cssFiles);
    });
});

// Render the HTML page with dynamic EJS template
app.get('/', (req, res) => {
    res.render('index'); // Render views/index.ejs
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
