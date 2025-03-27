#!/bin/bash

# Make sure the dist directory exists
mkdir -p dist

# Generate the standalone HTML file
echo "Generating standalone HTML file..."
node generate-standalone.js

# Print completion message
echo "Build completed successfully!"
echo "To run the server: npm start"
echo "To access standalone file: dist/password-generator-standalone.html"