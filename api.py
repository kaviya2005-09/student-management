import mysql.connector

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "admin",
    "database": "college_db"
}

def get_db():
    db = mysql.connector.connect(**DB_CONFIG)
    try:
        yield db
    finally:
        db.close()