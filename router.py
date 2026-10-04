from fastapi import APIRouter,Depends,HTTPException,Query
from api import get_db
from schemas import StudentCreate,StudentResponse
from services import (create_student,get_student,get_students,update_student,delete_student,get_studen, get_student_by_id)

router = APIRouter(prefix="/student", tags=["Students"])

@router.post("/",response_model=StudentResponse)
def create(student: StudentCreate, db=Depends(get_db)):
    return create_student(db, student)

@router.get("/",response_model=list[StudentResponse])
def get_detail(db=Depends(get_db)):
    return get_student(db)

@router.post("/{student_id}",response_model=StudentResponse)
def get_one(student_id: int, db=Depends(get_db)):
    student = get_students(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="student not found")
    return student

@router.put("/{student_id}")
def update(student_id: int,student: StudentCreate,db=Depends(get_db)):
    affected_row = update_student(db, student_id, student)
    if affected_row == 0:
        raise HTTPException(status_code=404, detail="student not found")
    return {"message":"student updated successfully",
            "affected_row": affected_row}

@router.delete("/{student_id}")
def delete(student_id: int, db=Depends(get_db)):
    affected_row = delete_student(db,student_id)
    if affected_row == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "student deleted successfully",
            "affected_row": affected_row}

@router.get("/students")
def get_all(page: int = Query(1,ge=1),limit: int = Query(10,ge=1),db=Depends(get_db)):
    return get_studen(db,page,limit)

@router.post("/students/page")
def get_page(page :int,db = Depends(get_db)):
    limit = 10
    return get_studen(db,page,limit)

@router.get("/{student_id}")
def get_student(
    student_id: int,
    db=Depends(get_db)
):

    stud = get_student_by_id(db, student_id)

    if stud is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return stud
