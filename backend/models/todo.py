from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


# Todo interface // neon structure
class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    completed: bool = False
    priority: int = 1
    created_at: datetime = Field(default_factory=datetime.now)
