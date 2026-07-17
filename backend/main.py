from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlmodel import Session, select
from database import get_session
from models.todo import Todo


@asynccontextmanager
async def lifespan(app: FastAPI):
    # everything before startup
    yield
    # everything after stop startup


app = FastAPI(lifespan=lifespan)


@app.get("/todos")
# def same function
def get_todos(session: Session = Depends(get_session)):
    # 1 Depends(get_session) open session
    # 2 send it to session
    # 3 select(Todo) = "SELECT * FROM todo"
    # session.exec do it and return data
    return session.exec(select(Todo)).all()


@app.post("/todos")
def create_todo(todo: Todo, session: Session = Depends(get_session)):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo
