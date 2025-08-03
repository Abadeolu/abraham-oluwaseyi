const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve images from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Wedding website server is running!`);
    console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
    console.log(`💻 Press Ctrl+C to stop the server`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down wedding server...');
    process.exit(0);
}); 