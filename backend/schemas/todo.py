from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# models only for validation data in/out
class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    priority: int = Field(default=1, ge=1, le=10)
    description: str | None = Field(default=None, max_length=200)


class TodoRead(TodoCreate):
    id: int
    completed: bool
    created_at: datetime
    description: str | None = None


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[int] = None
    completed: Optional[bool] = None
    description: Optional[str] = None
