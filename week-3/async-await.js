const fs = require('fs').promises;

async function readFileAsync(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        console.log("📄 File data (Async/Await):", data);
    } catch (err) {
        console.error("❌ Error reading file:", err);
    }
}

readFileAsync('sample.txt');
