import sqlite3
import os

def init_db():
    # Create db directory if it doesn't exist
    if not os.path.exists('db'):
        os.makedirs('db')

    # Connect to database (creates it if it doesn't exist)
    conn = sqlite3.connect('db/app.db')
    
    # Read schema file
    with open('schema.sql') as f:
        conn.executescript(f.read())
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully!") 