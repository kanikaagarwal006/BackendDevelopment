from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import date

# Create database connection
engine = create_engine("sqlite:///students.db")
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    students = relationship("Student", back_populates="department")
    courses = relationship("Course", back_populates="department")


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    branch = Column(String(50))
    enrollment_date = Column(Date)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student")


class Course(Base):
    __tablename__ = "courses"

    id = Column(String(10), primary_key=True)
    title = Column(String(100), nullable=False)
    credits = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")


class Enrollment(Base):
    __tablename__ = "enrollments"

    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    course_id = Column(String(10), ForeignKey("courses.id"), primary_key=True)
    semester = Column(String(20))
    grade = Column(String(2))

    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


# Create tables
Base.metadata.create_all(engine)


# CREATE
print("\n--- CREATE ---")

new_student = Student(
    name="Aarav",
    email="Aarav@upes.ac.in",
    branch="CSE",
    enrollment_date=date(2024, 8, 1),
    department_id=1
)

session.add(new_student)
session.commit()

print("Student added and committed to the database.")


# READ
print("\n--- READ ---")

students = session.query(Student).filter(Student.branch == "CSE").all()
student = session.query(Student).filter_by(id=1).first()

print(f"Retrieved student (ID 1): {student.name if student else 'Not Found'}")
print(f"Retrieved all CSE students: {[s.name for s in students]}")


# UPDATE
print("\n--- UPDATE ---")

if student:
    student.branch = "ECE"
    session.commit()
    print(f"Student {student.name} branch updated to ECE in the database.")


# DELETE
print("\n--- DELETE ---")

student_to_delete = session.query(Student).filter_by(name="Aarav").first()

if student_to_delete:
    session.delete(student_to_delete)
    session.commit()
    print("Student 'Aarav' deleted from the database.")