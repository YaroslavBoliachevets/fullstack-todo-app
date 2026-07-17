import os
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv

load_dotenv()

# take dburl from  .env
DATABASE_URL = os.getenv("DATABASE_URL")

# create engine to connect to PostgreSQL
engine = create_engine(DATABASE_URL, echo=True)


# init tables in Postgres
def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    # open session
    with Session(engine) as session:
        # function on pause, send session to route, route is working with db/ after - close session
        yield session
