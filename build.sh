#!/bin/bash

# Create the dist directory if it doesn't exist
mkdir -p dist/utils
mkdir -p public/js

# Compile TypeScript files
echo "Compiling TypeScript files..."
npx tsc --project tsconfig.json

# Copy the main.js file to the public/js directory
echo "Copying main.js to public/js directory..."
cp dist/main.js public/js/

echo "Build completed successfully!"