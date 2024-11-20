const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const app = express();
const port = 5500;

// Set view engine and serve static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure 'views' folder exists

app.use('/_css', express.static(path.join(__dirname, 'public/_css')));
app.use('/_js', express.static(path.join(__dirname, 'public/_js')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));


// Helper function to get CSS/JS files
const getFiles = dir => fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.css') || file.endsWith('.js'));


// Common route handler for rendering pages
const renderPage = (req, res, pageTitle, viewName) => {
    const cssFiles = getFiles('public/_css');
    const jsFiles = getFiles('public/_js');
    ejs.renderFile(path.join(__dirname, 'public', 'head.ejs'), { cssFiles, jsFiles, title: pageTitle }, (err, headHtml) => {
        if (err) return res.status(500).send('Error rendering head template');
        res.render(viewName, { headHtml, title: pageTitle });
    });
};

// Routes
app.get('/', (req, res) => renderPage(req, res, 'Home Page', 'index'));
app.get('/about', (req, res) => renderPage(req, res, 'About Us', 'about')); 

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
