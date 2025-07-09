from flask import Flask
from backend.database.db import init_db
from backend.routes.todo_routes import todo_bp

app = Flask(__name__)

# Initialize the database
init_db(app)

# Register the routes
app.register_blueprint(todo_bp)

if __name__ == '__main__':
    app.run(debug=True)