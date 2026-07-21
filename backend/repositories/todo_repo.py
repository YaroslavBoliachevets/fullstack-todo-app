from sqlmodel import Session, select, col
from models.todo import Todo
from sqlalchemy import asc, desc


# only for working with SQLAlchemy/SQLModel
class TodoRepository:
    # particular session that we send when repo create
    def __init__(self, session: Session):
        self.session = session

    def exists_by_title(self, title: str) -> bool:
        # looking for todo with the same title  // STATMENT = SQL QUERY
        statment = select(Todo).where(col(Todo.title).ilike(title))
        result = self.session.exec(statment).first()
        # true/false
        return result is not None

    def get_by_title(self, title: str) -> Todo | None:
        statment = select(Todo).where(col(Todo.title).ilike(title))
        return self.session.exec(statment).first()

    def get_all(
        self,
        offset: int = 0,
        limit: int = 50,
        status: str | None = None,
        sort_by: str = "priority",
        order: str = "asc",
        search: str | None = None,
    ):
        query = select(Todo)

        if status:
            # transfer status str -> bool
            is_completed = status == "done"
            query = query.where(Todo.completed == is_completed)

        if search:
            query = query.where(col(Todo.title).ilike(f"%{search}%"))

        # sort_by
        if hasattr(Todo, sort_by):
            sort_column = getattr(Todo, sort_by)
        else:
            sort_column = Todo.created_at

        # order
        if order == "desc":
            query = query.order_by(desc(sort_column), desc(Todo.created_at))
        else:
            query = query.order_by(asc(sort_column), asc(Todo.created_at))

        query = query.offset(offset).limit(limit)
        return self.session.exec(query).all()

    def create(self, todo_data: dict):
        # **todo_data unbox dict to view as title="werty", priority=1
        todo = Todo(**todo_data)
        self.session.add(todo)
        self.session.commit()
        self.session.refresh(todo)
        return todo

    def update(self, todo_id: int, todo_data: dict):
        todo = self.session.get(Todo, todo_id)
        if not todo:
            return None

        for key, value in todo_data.items():
            setattr(todo, key, value)

        self.session.commit()
        self.session.refresh(todo)
        return todo

    def delete(self, todo_id: int) -> bool:
        todo = self.session.get(Todo, todo_id)
        if not todo:
            return False
        self.session.delete(todo)
        self.session.commit()
        return True
