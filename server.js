const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary skill storage
let skills = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    skill: "Java Programming",
    category: "Technical",
    description: "I can teach Java and OOP concepts."
  },
  {
    id: 2,
    name: "Priya",
    email: "priya@gmail.com",
    skill: "Web Development",
    category: "Technical",
    description: "HTML, CSS, JavaScript and React."
  },
  {
    id: 3,
    name: "Arun",
    email: "arun@gmail.com",
    skill: "Communication",
    category: "Non-Technical",
    description: "I can help improve communication skills."
  }
];

// Temporary connection storage
let connections = [];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Skill Connect Backend!");
});

// Get all skills
app.get("/api/skills", (req, res) => {
  res.json(skills);
});

// Add a new skill
app.post("/api/skills", (req, res) => {
  const { name, email, skill, category, description } = req.body;

  if (!name || !email || !skill || !category || !description) {
    return res.status(400).json({
      message: "Please fill all fields"
    });
  }

  const newSkill = {
    id: Date.now(),
    name,
    email,
    skill,
    category,
    description
  };

  skills.push(newSkill);

  res.status(201).json({
    message: "Skill added successfully",
    skill: newSkill
  });
});

// Connect with a student
app.post("/api/connect", (req, res) => {
  const { studentName, studentEmail, skill } = req.body;

  if (!studentName || !studentEmail || !skill) {
    return res.status(400).json({
      message: "Invalid connection details"
    });
  }

  const newConnection = {
    id: Date.now(),
    studentName,
    studentEmail,
    skill
  };

  connections.push(newConnection);

  res.status(201).json({
    message: "Connection request sent successfully!"
  });
});

// View connection requests
app.get("/api/connections", (req, res) => {
  res.json(connections);
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
