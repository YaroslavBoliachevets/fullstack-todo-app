from fastapi import FastAPI, Depends, HTTPException, Query
from sqlmodel import Session
from database import get_session
from repositories.todo_repo import TodoRepository
from schemas.todo import TodoCreate, TodoRead, TodoUpdate
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://fullstack-todo-app-5sju.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


@app.post("/todos", response_model=TodoRead)
def create_todo(todo_in: TodoCreate, session: Session = Depends(get_session)):
    repo = TodoRepository(session)

    # check same title
    if repo.exists_by_title(todo_in.title):
        raise HTTPException(status_code=400, detail="This task already exists")

    # todo_in.model_dump() simplify obj pydantic -> dictionary
    return repo.create(todo_in.model_dump())


# response_model=list[TodoRead] DTO that back TodoRead data
@app.get("/todos", response_model=list[TodoRead])
def get_todos(
    offset: int = 0,
    limit: int = 50,
    # /todos?status=done / optional
    status: Optional[str] = Query(None, enum=["done", "undone"]),
    sort_by: str = Query("priority", enum=["priority", "created_at"]),
    order: str = Query("asc", enum=["asc", "desc"]),
    session: Session = Depends(get_session),
    search: str | None = None,
):
    repo = TodoRepository(session)
    return repo.get_all(
        offset=offset,
        limit=limit,
        status=status,
        sort_by=sort_by,
        order=order,
        search=search,
    )


@app.delete("/todos/{todo_id}")
def del_todos(todo_id: int, session: Session = Depends(get_session)):
    repo = TodoRepository(session)
    # return repo.delete(todo_id)

    # if false than
    if not repo.delete(todo_id):
        raise HTTPException(status_code=404, detail="Task has not found")

    return {"message": "Task deleted"}


@app.patch("/todos/{todo_id}")
def update_todo(
    todo_id: int, todo_data: TodoUpdate, session: Session = Depends(get_session)
):
    repo = TodoRepository(session)

    # exclude None in query  / leave only sended data
    payload = todo_data.model_dump(exclude_unset=True)
    if not payload:
        raise HTTPException(status_code=400, detail="No data provided for update")

    if "title" in payload:
        existing_todo = repo.get_by_title(payload["title"])
        if existing_todo and existing_todo.id != todo_id:
            raise HTTPException(
                status_code=400, detail="Task with this title already exists"
            )

    update_todo = repo.update(todo_id, payload)
    if not update_todo:
        raise HTTPException(status_code=404, detail="Task has not found")

    return update_todo
