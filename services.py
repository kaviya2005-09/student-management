def create_student(db, student):
    cursor = db.cursor()
    cursor.execute(("""insert into student(name,age,course,email)values(%s, %s, %s,%s)"""), (student.name,student.age,student.course,student.email))
    db.commit()
    student_id = cursor.lastrowid
    cursor.close()
    return { 
        "id" : student_id,       
        "name" : student.name,
        "age" : student.age,
        "course" : student.course,
        "email" : student.email
           }

def get_student(db):
    cursor = db.cursor(dictionary=True)

    cursor.execute("select*from student")

    students = cursor.fetchall()
    cursor.close()
    return students

def get_students(db,student_id):
    cursor = db.cursor(dictionary=True)
    cursor.execute("select*from student where id = %s",(student_id,))
    student = cursor.fetchone()
    cursor.close()
    return student

def update_student(db,student_id,student):
    cursor = db.cursor()
    cursor.execute(("""update student set name =%s, age=%s, course=%s, email=%s where id=%s"""),(student.name,student.age,student.course,student.email,student_id))
    db.commit()

    affected_row = cursor.rowcount
    cursor.close()
    return affected_row

def delete_student(db,student_id):
    cursor = db.cursor()
    cursor.execute(("delete from student where id=%s"),(student_id,))
    db.commit()
    affected_row = cursor.rowcount
    cursor.close()
    return affected_row

def get_studen(db,page,limit):
    cursor = db.cursor(dictionary=True)
    offset = (page - 1) * limit
    cursor.execute(("select*from student limit %s offset %s"),(limit,offset))
    students = cursor.fetchall()
    cursor.close()
    return students

def get_student_by_id(db, student_id):

    cursor = db.cursor(dictionary=True)

    query = """
        SELECT *
        FROM student
        WHERE id = %s
    """

    cursor.execute(query, (student_id,))

    student = cursor.fetchone()

    cursor.close()

    return student

