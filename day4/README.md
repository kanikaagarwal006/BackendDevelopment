# Day 3: Student Management API Testing

## Overview
This project demonstrates testing a Student Management API using Express.js, Flask, Postman, and browser Developer Tools. It covers retrieving all students, retrieving a student by ID, and checking API responses.

## Technologies Used
- Node.js
- Express.js
- Python
- Flask
- Postman
- JSON
- Browser Developer Tools

## Features
- Retrieve all student records.
- Retrieve a single student using their ID.
- Return student details in JSON format.
- Handle requests for students that do not exist.
- Test API endpoints using Postman.
- Inspect HTTP requests and responses.

## Sample Student Data

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

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Retrieve all students |
| GET | `/students/:id` | Retrieve a student by ID |
| POST | `/students` | Tested in Postman; returned 404 because the shown Express server has no POST handler |

### Example Requests

**Get all students**
```http
GET http://localhost:3000/students
```

**Get a student by ID**
```http
GET http://localhost:3000/students/2
```

**Flask API — get all students**
```http
GET http://127.0.0.1:5000/students
```

## How to Run

### Express.js
1. Open the `day1` folder in the terminal.
2. Install dependencies if required:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

4. Open `http://localhost:3000` in your browser.

### Flask
1. Open the `day2` folder in the terminal.
2. Activate the virtual environment:

```bash
source venv/bin/activate
```

3. Install dependencies if required:

```bash
pip install -r requirements.txt
```

4. Run the application:

```bash
python app.py
```

5. Open `http://127.0.0.1:5000` in your browser.

## Testing Results
- The GET request for all students returned the student records.
- The GET request for an individual student returned the matching record.
- A request for a nonexistent student returned a student-not-found error.
- The POST request to `/students` returned `404 Not Found` because the shown Express code does not define a POST route.
- The browser Network panel showed a successful `200 OK` response for the students page.

## Screenshots

Add the paths below only if they match the filenames and locations of your existing GitHub screenshots.

### 1. Postman — Get All Students
![GET all students](./01-postman-get-students.png)

### 2. Postman — POST Request Error
![POST request returning 404](./02-postman-post-students-404.png)

### 3. Express Server Running
![Express server terminal](./03-express-server-terminal.png)

### 4. Postman — Get Student by ID
![Get student by ID](./04-postman-single-student.png)

### 5. Postman — Individual Student Request
![Individual student request](./05-postman-single-student-request.png)

### 6. Flask Application Running
![Flask home page and terminal](./06-flask-home-and-terminal.png)

### 7. Postman — Flask Students API
![Flask students API response](./07-postman-flask-students.png)

### 8. Express Home Page
![Express home page and terminal](./08-express-home-and-terminal.png)

### 9. Browser Network Inspection
![Browser Network panel](./09-browser-network-response.png)

## Learning Outcomes
- Understanding REST API endpoints.
- Using HTTP GET and POST requests.
- Testing APIs using Postman.
- Understanding JSON responses and HTTP status codes.
- Retrieving individual records using route parameters.
- Inspecting network requests using browser Developer Tools.

## Conclusion
This experiment provided practical experience in creating and testing student-related API endpoints, working with JSON responses, and identifying errors through Postman and browser Developer Tools.
