
const fs = require('fs');
const path = require('path');

async function globalSetup() {
    const screenshotDir = path.join(__dirname, 'Screenshots');

    // Delete screenshots from the previous test run
    fs.rmSync(screenshotDir, {
        recursive: true,
        force: true
    });

    // Create a clean Screenshots folder
    fs.mkdirSync(screenshotDir, {
        recursive: true
    });

    console.log('Old screenshots cleared successfully.');
}

module.exports = globalSetup;
