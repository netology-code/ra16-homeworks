# useJsonFetch

## Общее описание

Нужно реализовать **хук `useJsonFetch`**, который делает запрос по адресу `url` и возвращает три значения:

* `data` — полученные данные,
* `loading` — показывает, что запрос выполняется,
* `error` — информация об ошибке, если запрос завершился неудачно.

На странице нужно показать работу этого хука на примерах:

1. успешный запрос,
2. запрос с ошибкой,
3. демонстрация состояния загрузки.

---

## Техническое задание

### Состав программы

* Хук `useJsonFetch(url, options)` — основной функционал.
* Компонент для отображения результата работы хука.
* Главный компонент `App` с несколькими примерами.

### Функциональные требования

* При вызове `useJsonFetch` выполняется запрос по `url`.
* Пока запрос выполняется → `loading = true`.
* Если ответ успешный (код 200–299) → данные сохраняются в `data`.
* Если произошла ошибка (например, сервер вернул код 404 или нет сети) → информация об ошибке сохраняется в `error`.
* Хук можно использовать в любых компонентах.

### Требования к коду

* Использовать React (функциональные компоненты).
* Применять хуки `useState` и `useEffect`.
* Запросы выполнять через `fetch`.
* Код должен быть простым и понятным.

---

## Пример использования

```jsx
// App.js
import useJsonFetch from './useJsonFetch';

function DataViewer({ url }) {
  const [data, loading, error] = useJsonFetch(url);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function App() {
  return (
    <div>
      <h3>Успешный запрос</h3>
      <DataViewer url="https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json" />

      <h3>Ошибка</h3>
      <DataViewer url="https://example.com/wrong-url" />
    </div>
  );
}
```
