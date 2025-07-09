# To-Do List Application

This is a simple To-Do List application built using Python for the backend and SQL for the database management. The application allows users to create, read, update, and delete to-do items.

## Project Structure

```
todo-list-app
├── backend
│   ├── app.py                # Entry point for the backend application
│   ├── models
│   │   └── todo.py           # Defines the Todo model
│   ├── routes
│   │   └── todo_routes.py     # Contains route definitions for the API
│   ├── database
│   │   └── db.py             # Manages database connection and configuration
│   └── requirements.txt       # Python dependencies for the backend
├── frontend
│   ├── static
│   │   └── main.js           # JavaScript code for frontend interactions
│   ├── templates
│   │   └── index.html        # Main HTML template for the frontend
│   └── package.json          # Configuration file for frontend dependencies
└── README.md                 # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-list-app
   ```

2. Navigate to the backend directory and install the required Python packages:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Set up the database by running the necessary migrations (if applicable).

4. Navigate to the frontend directory and install the required JavaScript packages:
   ```
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server:
   ```
   cd backend
   python app.py
   ```

2. In a separate terminal, start the frontend application:
   ```
   cd frontend
   npm start
   ```

3. Open your web browser and go to `http://localhost:3000` to access the To-Do List application.

## Features

- Add new to-do items
- Update existing to-do items
- Delete to-do items
- Mark to-do items as completed

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see in the application.