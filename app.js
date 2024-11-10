// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
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
  res.sendFile(path.join(__dirname, 'Contact.html'));
});

// POST route to handle contact form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Redirect back to the form with a success message
    res.send(`
 <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; border: 2px solid #4CAF50; background-color: #e8f5e9; padding: 10px; border-radius: 8px; w-1/3">
    <h2>Thank you!</h2>
    <p>Your message has been sent successfully. We will get back to you shortly.</p>
    <a href="/contact" style="color: white; background-color: green; padding: 10px 8px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block; width: auto;">Back to Contact Form</a>
</div>



    `);
  } catch (error) {
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h2>Error</h2>
        <p>There was an issue submitting your message. Please try again later.</p>
        <a href="/contact" style="color: blue; text-decoration: underline;">Back to Contact Form</a>
      </div>
    `);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
