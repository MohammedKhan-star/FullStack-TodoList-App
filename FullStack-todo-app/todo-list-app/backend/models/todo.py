class Todo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Todo {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

    @classmethod
    def create(cls, title, description=None):
        new_todo = cls(title=title, description=description)
        db.session.add(new_todo)
        db.session.commit()
        return new_todo

    @classmethod
    def update(cls, todo_id, title=None, description=None, completed=None):
        todo = cls.query.get(todo_id)
        if todo:
            if title is not None:
                todo.title = title
            if description is not None:
                todo.description = description
            if completed is not None:
                todo.completed = completed
            db.session.commit()
        return todo

    @classmethod
    def delete(cls, todo_id):
        todo = cls.query.get(todo_id)
        if todo:
            db.session.delete(todo)
            db.session.commit()
        return todo