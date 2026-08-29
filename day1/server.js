const express = require("express");
const app = express();

app.set("view engine", "ejs");

const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
];

app.get("/", (req, res) => {
    res.render("home");
});

// Updated to return JSON instead of EJS view
app.get("/students", (req, res) => {
    res.json(students);
});

// GET a single student by ID
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});