const fs = require('fs').promises;

function readFilePromise(path) {
    fs.readFile(path, 'utf8')
        .then(data => {
            console.log(" File data (Promise):", data);
        })
        .catch(err => {
            console.error(" Error reading file:", err);
        });
}

readFilePromise('sample.txt');
