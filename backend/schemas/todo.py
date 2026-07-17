from pydantic import BaseModel, Field


# models only for validation data in/out
class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    priority: int = Field(default=1, ge=1, le=10)


class TodoRead(TodoCreate):
    id: int
    completed: bool
