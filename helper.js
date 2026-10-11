
const path = require('path');

async function takeScreenshot(page, fileName) {
    // Root project folder / Screenshots
    const screenshotDir = path.join(__dirname, 'Screenshots');

    // Create folder if it doesn't exist
    const fs = require('fs');
    fs.mkdirSync(screenshotDir, { recursive: true });

    const screenshotPath = path.join(screenshotDir, fileName);

    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    console.log(`Screenshot saved: ${screenshotPath}`);
}

module.exports = { takeScreenshot };
