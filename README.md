# Student Management System

A simple Student Management System built using FastAPI, MySQL, HTML, CSS, and JavaScript.

## Features

* Add Student
* Get All Students
* Get Student by ID
* Update Student
* Delete Student
* Pagination
* Edit Student
* Student List with Table
* MySQL Database Integration

## Technologies Used

* Python
* FastAPI
* MySQL
* mysql-connector-python
* HTML
* CSS
* JavaScript

## Project Structure

```text
student-management/
│
├── main.py
├── router.py
├── services.py
├── schemas.py
├── api.py
├── index.html
├── student.html
├── script.js
├── student.js
├── .gitignore
└── README.md
```

## Database

The project uses MySQL.

### Student Table

| Column | Description       |
| ------ | ----------------- |
| id     | Auto Increment ID |
| name   | Student Name      |
| age    | Student Age       |
| course | Student Course    |
| email  | Student Email     |

## API Endpoints

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/student/`             | Add student                  |
| GET    | `/student/students`     | Get students with pagination |
| GET    | `/student/{student_id}` | Get student by ID            |
| PUT    | `/student/{student_id}` | Update student               |
| DELETE | `/student/{student_id}` | Delete student               |

## Pagination

Example:

```text
/student/students?page=1&limit=10
```

This returns 10 students per page.

## How to Run

Create and activate the virtual environment:

```powershell
python -m venv myenv
myenv\Scripts\Activate.ps1
```

Install the required packages:

```powershell
pip install fastapi uvicorn mysql-connector-python pydantic
```

Run the FastAPI server:

```powershell
uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

## Frontend

Open `index.html` to add or update students.

Open `student.html` to view students, edit, delete, and use pagination.

## Author

Kaviya
