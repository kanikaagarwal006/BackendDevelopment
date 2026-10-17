# Day 2: Student Management API Using Flask

## Overview
This project is a simple Student Management API developed using Python and Flask. It demonstrates how to create API routes, return JSON responses, retrieve student details using IDs, and handle errors when a student is not found.

## Technologies Used
- Python
- Flask
- JSON
- HTML

## Features
- Displays a welcome message on the home route.
- Returns all students in JSON format.
- Retrieves an individual student using their ID.
- Returns a 404 error when a student does not exist.
- Runs the Flask development server in debug mode.

## Project Structure

```text
day2/
├── venv/
├── app.py
├── index.html
├── requirements.txt
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Displays the Student Management API welcome message |
| GET | `/students` | Returns the list of all students |
| GET | `/students/<student_id>` | Returns a student by ID |

## Sample Student Data

The application contains three students:

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

1. Open the terminal in the `day2` folder.
2. Activate the virtual environment:

   ```bash
   source venv/bin/activate
   ```

3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the application:

   ```bash
   python app.py
   ```

5. Open the following URLs in your browser:

   - Home: http://127.0.0.1:5000/
   - All students: http://127.0.0.1:5000/students
   - Student with ID 1: http://127.0.0.1:5000/students/1

## Sample Error Response

If a student ID does not exist, the API returns status code `404`.

```json
{
  "error": "Student not found"
}
```

## Learning Outcomes
- Understanding Flask and Python web applications.
- Creating API endpoints using Flask routes.
- Returning JSON responses using `jsonify()`.
- Using URL parameters to retrieve specific records.
- Searching lists using Python's `next()` function.
- Handling missing records with HTTP status codes.
- Using virtual environments and `requirements.txt`.

## Note
Student records are stored in a Python list. The project does not currently use a database.
