import os
import mysql.connector

DB_CONFIG = {
    "host": os.getenv("MYSQL_HOST"),
    "port": int(os.getenv("MYSQL_PORT")),
    "user": os.getenv("MYSQL_USER"),
    "password": os.getenv("MYSQL_PASSWORD"),
    "database": os.getenv("MYSQL_DATABASE"),
    "ssl_disabled": False
}

def get_db():
    db = mysql.connector.connect(**DB_CONFIG)

    try:
        yield db
    finally:
        db.close()