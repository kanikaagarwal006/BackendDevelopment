# Day 1: Student Management API

## Overview
This project is a simple Student Management API built using Node.js, Express.js, and EJS. It demonstrates basic routing and retrieving student information through REST API endpoints.

## Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- JavaScript

## Features
- Displays a home page using the EJS view engine.
- Returns a list of all students in JSON format.
- Retrieves a single student using their ID.
- Returns a 404 error if the requested student is not found.

## Project Structure

```text
day1/
├── views/
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Renders the home page |
| GET | `/students` | Returns all students |
| GET | `/students/:id` | Returns a student by ID |

## Sample Student Data

The API currently uses an array of three students:

```json
[
  {
    "id": 1,
    "name": "Aarav",
    "branch": "CSE"
  },
  {
    "id": 2,
    "name": "Diya",
    "branch": "ECE"
  },
  {
    "id": 3,
    "name": "Rohan",
    "branch": "IT"
  }
]
```

## How to Run the Project

1. Open the terminal in the `day1` folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. Open the following URLs in your browser:

   - Home page: http://localhost:3000/
   - All students: http://localhost:3000/students
   - Student with ID 1: http://localhost:3000/students/1

## Error Handling

If a student ID does not exist, the API returns HTTP status code `404` with the following JSON response:

```json
{
  "error": "Student not found"
}
```

## Learning Outcomes
- Understanding Node.js and Express.js.
- Creating GET routes.
- Working with JSON responses.
- Using route parameters with `req.params`.
- Finding records using JavaScript's `find()` method.
- Handling errors using HTTP status codes.

## Note
Student data is stored in a JavaScript array. The project does not currently use a database.
