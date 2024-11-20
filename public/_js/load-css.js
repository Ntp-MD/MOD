fetch('/list-css-files')
    .then(response => response.json())
    .then(cssFiles => {
        cssFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `/_css/${file}`;
            document.head.appendChild(link);
        });
    })
    .catch(error => console.error('Error loading CSS files:', error));
