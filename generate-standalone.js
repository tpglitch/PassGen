const fs = require('fs');
const path = require('path');

// Read the standalone HTML file
const htmlFilePath = path.join(__dirname, 'public', 'password-generator.html');
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Write the file to the dist directory
const outputPath = path.join(distDir, 'password-generator-standalone.html');
fs.writeFileSync(outputPath, htmlContent);

console.log(`Standalone HTML file created at: ${outputPath}`);
console.log('You can download this file and run it locally without a server.');