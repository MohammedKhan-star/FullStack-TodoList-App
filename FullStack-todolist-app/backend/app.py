from flask import Flask, request, jsonify;
from flask_cors import CORS
import sqlite3

app=Flask(__name__)
CORS(app)

def init_db():
    with sqlite3.connect('database.db')as conn:
        conn.execute('''
                     CREATE TABLE IF NOT EXISTS tasks(
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     title TEXT NOT NULL,
                     completed BOOLEAN NOT NULL DEFAULT 0
                     )''')
init_db()

@app.route('/')
def home():
    return "🎯 Flask ToDo API is running! Visit /tasks to see tasks."

@app.route('/tasks',methods=['GET'])
def get_tasks():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM tasks')
        tasks = cursor.fetchall()
        return jsonify([{'id': row[0], 'title': row[1], 'completed': row[2]} for row in tasks])

@app.route('/tasks',methods=['POST'])
def add_task():
     data=request.get_json()
     title=data['text']
     with sqlite3.connect('database.db')as conn:
         cursor=conn.cursor()
         cursor.execute("INSERT INTO tasks (title,completed) VALUES(?,?)",(title,False)
                        )
         conn.commit()
         task_id=cursor.lastrowid
     return jsonify({'id': task_id, 'title': title, 'completed': False}), 201
    

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    title = data.get('completed')
    completed = data.get('completed', False)
    
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        if title is not None:
            cursor.execute("UPDATE tasks SET title=?, completed=? WHERE id=?", (title, completed, task_id))
        else:
            cursor.execute("UPDATE tasks SET completed=? WHERE id=?", (completed, task_id))
        conn.commit()
        
    return jsonify({"message": "Task updated successfully"})
    
@app.route('/tasks/<int:task_id>',methods=['DELETE'])
def delete_task(task_id):
    with sqlite3.connect('database.db')as conn:
        conn.execute("DELETE FROM tasks WHERE id=?", (task_id,))
        conn.commit()
    return jsonify({"message": "Task deleted successfully"})
    
if __name__=="__main__":
    app.run(debug=True)
