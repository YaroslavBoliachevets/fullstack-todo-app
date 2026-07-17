from sqlmodel import Session, select
from models.todo import Todo


# only for working with SQLAlchemy/SQLModel
class TodoRepository:
    # particular session that we send when repo create
    def __init__(self, session: Session):
        self.session = session

    def get_all(self, offset: int = 0, limit: int = 50):
        return self.session.exec(select(Todo).offset(offset).limit(limit)).all()

    def create(self, todo_data: dict):
        # **todo_data unbox dict to view as title="werty", priority=1
        todo = Todo(**todo_data)
        self.session.add(todo)
        self.session.commit()
        self.session.refresh(todo)
        return todo
