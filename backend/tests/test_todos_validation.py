def test_create_todo_invalid_title_empty(client):
    # Пытаемся создать задачу с пустой строкой вместо заголовка
    response = client.post("/todos", json={"title": "", "priority": 1})
    assert response.status_code == 422


def test_create_todo_invalid_title_too_long(client):
    # Заголовок длиннее 100 символов
    long_title = "A" * 101
    response = client.post("/todos", json={"title": long_title, "priority": 1})
    assert response.status_code == 422


def test_create_todo_invalid_priority_out_of_range(client):
    # Приоритет больше 10
    response = client.post("/todos", json={"title": "Normal Task", "priority": 11})
    assert response.status_code == 422


def test_create_todo_invalid_priority_negative(client):
    # Приоритет меньше 1
    response = client.post("/todos", json={"title": "Normal Task", "priority": 0})
    assert response.status_code == 422


# апдейт функция


def test_update_todo_invalid_title_empty(client):
    # 1. Создаем валидную задачу
    create_res = client.post("/todos", json={"title": "Original Title", "priority": 1})
    todo_id = create_res.json()["id"]

    # 2. Пытаемся обновить только заголовок пустой строкой
    response = client.patch(f"/todos/{todo_id}", json={"title": ""})
    assert response.status_code == 422


def test_update_todo_invalid_priority(client):
    # 1. Создаем задачу
    create_res = client.post("/todos", json={"title": "Task", "priority": 1})
    todo_id = create_res.json()["id"]

    # 2. Передаем неверный приоритет (больше 10)
    response = client.patch(f"/todos/{todo_id}", json={"priority": 15})
    assert response.status_code == 422


def test_update_todo_invalid_description_too_long(client):
    # 1. Создаем задачу
    create_res = client.post("/todos", json={"title": "Task", "priority": 1})
    todo_id = create_res.json()["id"]

    # 2. Передаем описание длиннее 200 символов
    response = client.patch(f"/todos/{todo_id}", json={"description": "A" * 201})
    assert response.status_code == 422


def test_update_todo_extra_fields_forbidden(client):
    # 1. Создаем валидную задачу
    create_res = client.post(
        "/todos", json={"title": "Task with extra fields", "priority": 1}
    )
    todo_id = create_res.json()["id"]

    # 2. Пытаемся передать несуществующее поле (например, "is_admin": True)
    response = client.patch(
        f"/todos/{todo_id}", json={"completed": True, "is_admin": True}
    )

    # 3. Pydantic должен отсечь запрос и вернуть 422 Unprocessable Entity
    assert response.status_code == 422
