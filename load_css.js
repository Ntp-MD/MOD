const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.get('/_css/list-files.json', (req, res) => {
	const cssDir = path.join(__dirname, 'public/_css');
	fs.readdir(cssDir, (err, files) => {
		if (err) {
			return res.status(500).json({ error: 'Unable to read CSS directory' });
		}
		const cssFiles = files.filter(file => file.endsWith('.css'));
		res.json(cssFiles);
	});
});

app.listen(3000, () => console.log('Server is running on port 3000'));
