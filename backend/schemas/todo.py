from pydantic import BaseModel, Field
from typing import Optional


# models only for validation data in/out
class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    priority: int = Field(default=1, ge=1, le=10)


class TodoRead(TodoCreate):
    id: int
    completed: bool


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[int] = None
    completed: Optional[bool] = None
