import sys
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from sqlmodel import SQLModel

# Добавляем корневую папку backend в sys.path, чтобы видеть database.py и models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Импортируем твой URL и модели
from database import DATABASE_URL
from models.todo import Todo

print(f"DEBUG: Todo model found: {Todo.__table__}")

# Настройка конфига
config = context.config
fileConfig(config.config_file_name)

# ПОДКЛЮЧАЕМ МЕТАДАННЫЕ
target_metadata = SQLModel.metadata

# Принудительно задаем URL из database.py
config.set_main_option("sqlalchemy.url", DATABASE_URL)


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
