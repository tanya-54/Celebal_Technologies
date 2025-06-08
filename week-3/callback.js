const fs = require('fs');

function readFileCallback(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading file:", err);
        } else {
            console.log("📄 File data (Callback):", data);
        }
    });
}

readFileCallback('sample.txt');
