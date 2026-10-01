from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date

app = FastAPI()


class StudentCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    email: EmailStr

    branch: str = Field(
        ...,
        pattern=r"^(CSE|ECE|IT|ME|CE)$"
    )

    enrollment_date: Optional[date] = None


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    branch: str
    enrollment_date: date


class Student:
    _id = 0

    def __init__(
        self,
        name: str,
        email: EmailStr,
        branch: str,
        enrollment_date: Optional[date]
    ):
        Student._id += 1

        self.id = Student._id
        self.name = name
        self.email = email
        self.branch = branch

        self.enrollment_date = (
            enrollment_date or date.today()
        )


@app.post(
    "/students",
    response_model=StudentResponse,
    status_code=201
)
def create_student(student: StudentCreate):

    student_data = student.model_dump()

    db_student = Student(**student_data)

    return db_student