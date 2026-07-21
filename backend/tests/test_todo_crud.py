def test_create_todo(client):
    # 1. ЧТО ОТПРАВЛЯЕМ: симулируем отправку POST-запроса от клиента с JSON-данными
    response = client.post("/todos", json={"title": "Test Task 1", "priority": 1})

    # 2. ЧТО ОЖИДАЕМ: проверяем статус ответа (200 OK означает, что всё прошло успешно)
    assert response.status_code == 200

    # Достаем тело ответа (то, что бэкенд вернул нам в формате JSON)
    data = response.json()

    # 3. ПРОВЕРКИ (ASSERT'Ы): сверяем каждое поле с тем, что должно было вернуться
    assert data["title"] == "Test Task 1"  # Название совпадает с тем, что отправили
    assert data["priority"] == 1  # Приоритет совпадает
    assert data["completed"] is False  # Задача по умолчанию создается невыполненной
    assert "id" in data  # База данных обязана была сгенерировать уникальный ID


def test_create_duplicate_todo(client):
    client.post("/todos", json={"title": "Unique Task", "priority": 1})
    response_second = client.post(
        "/todos", json={"title": "Unique Task", "priority": 2}
    )

    assert response_second.status_code == 400
    assert response_second.json()["detail"] == "This task already exists"


def test_delete_todo(client):
    # 1. Создаем задачу, чтобы получить её ID
    create_res = client.post("/todos", json={"title": "Task to delete", "priority": 1})
    todo_id = create_res.json()["id"]

    # 2. Удаляем её
    delete_res = client.delete(f"/todos/{todo_id}")
    assert delete_res.status_code == 200
    assert delete_res.json() == {"message": "Task deleted"}

    # 3. Пытаемся удалить несуществующую (или уже удаленную) задачу — ждем 404
    not_found_res = client.delete(f"/todos/{todo_id}")
    assert not_found_res.status_code == 404


def test_update_todo(client):
    # 1. Создаем задачу
    create_res = client.post("/todos", json={"title": "Task to update", "priority": 1})
    todo_id = create_res.json()["id"]

    # 2. Обновляем поля через PATCH
    update_res = client.patch(
        f"/todos/{todo_id}", json={"completed": True, "title": "Updated Task Title"}
    )

    assert update_res.status_code == 200
    data = update_res.json()
    assert data["completed"] is True
    assert data["title"] == "Updated Task Title"


def test_get_todos_with_filters_and_pagination(client):
    # 1. Создаем две разные задачи
    client.post("/todos", json={"title": "Task One", "priority": 1})
    client.post("/todos", json={"title": "Task Two", "priority": 5})

    # 2. Получаем список, чтобы найти ID первой задачи и отметить её выполненной
    all_todos = client.get("/todos").json()
    # Как работает (next + генератор): Конструкция перебирает словари (t) в списке all_todos, находит тот, у которого title равен "Task One", и вытаскивает оттуда значение ключа id. Встроенная функция next() возвращает первый найденный элемент.
    task_one_id = next(t["id"] for t in all_todos if t["title"] == "Task One")

    update_res = client.patch(f"/todos/{task_one_id}", json={"completed": True})
    assert update_res.status_code == 200

    # 3. Проверяем фильтрацию: запрашиваем только выполненные (done)
    done_response = client.get("/todos?status=done")
    assert done_response.status_code == 200
    done_data = done_response.json()
    assert len(done_data) == 1
    assert done_data[0]["title"] == "Task One"

    # 4. Проверяем пагинацию: ограничиваем выдачу до 1 элемента (limit=1)
    limit_response = client.get("/todos?limit=1")
    assert limit_response.status_code == 200
    assert len(limit_response.json()) == 1
