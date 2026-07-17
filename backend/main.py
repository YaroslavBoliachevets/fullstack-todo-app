from fastapi import FastAPI, Depends
from sqlmodel import Session
from database import get_session
from repositories.todo_repo import TodoRepository
from schemas.todo import TodoCreate, TodoRead

app = FastAPI()


@app.post("/todos", response_model=TodoRead)
def create_todo(todo_in: TodoCreate, session: Session = Depends(get_session)):
    repo = TodoRepository(session)
    # todo_in.model_dump() simplify obj pydantic -> dictionary
    return repo.create(todo_in.model_dump())


# response_model=list[TodoRead] DTO that back TodoRead data
@app.get("/todos", response_model=list[TodoRead])
def get_todos(
    offset: int = 0, limit: int = 50, session: Session = Depends(get_session)
):
    repo = TodoRepository(session)
    return repo.get_all(offset=offset, limit=limit)
