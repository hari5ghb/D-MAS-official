const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));  // Serve static files from the root directory

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define a schema for contact messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

// Serve the Contact HTML file
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact.html'));  // Serve the contact page from the root directory
});

// Serve other HTML pages
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve the index page
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));  // Serve the about page
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'Blog.html'));  // Serve the blog page
});

app.get('/get-a-quote', (req, res) => {
  res.sendFile(path.join(__dirname, 'get-a-quote.html'));  // Serve the get-a-quote page
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'Services.html'));  // Serve the services page
});

// POST route to handle contact form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send a response with an alert message
    res.send(`
      <html>
        <head>
          <script>
            alert('Thank you! Your message has been sent successfully. We will get back to you shortly.');
            window.location.href = '/contact'; // Redirect back to the contact page
          </script>
        </head>
        <body>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <html>
        <head>
          <script>
            alert('There was an issue submitting your message. Please try again later.');
            window.location.href = '/contact'; // Redirect back to the contact page
          </script>
        </head>
        <body>
        </body>
      </html>
    `);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
