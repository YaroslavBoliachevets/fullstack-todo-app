import sys
from pathlib import Path

# Принудительно добавляем родительскую папку (backend) в системный путь Python
sys.path.append(str(Path(__file__).parent.parent))

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from main import app
from database import get_session

# connect to db in memory RAM
sqlite_url = "sqlite:///:memory:"


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        sqlite_url,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        # prevent create new connection
    )
    # create clear db structure
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
        # drop all tests after
    SQLModel.metadata.drop_all(engine)


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
