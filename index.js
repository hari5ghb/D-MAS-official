const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route for home page
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Add a route for /contact
app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
