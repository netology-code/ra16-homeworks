# Redux для управления состоянием в React

## Цели занятия

- Изучить концепцию Redux и принципы управления состоянием
- Освоить основные сущности Redux: Store, Actions, Reducers
- Научиться интегрировать Redux с React через react-redux
- Понять современные подходы к работе с Redux

## План занятия

1. Основы Redux
2. Интеграция с React через react-redux
3. Практический пример CRUD-приложения
4. Современные инструменты разработки

## 1. Основы Redux

### Проблема управления состоянием

В больших React-приложениях возникают сложности с передачей данных между компонентами:

```jsx
// Проблема: глубокая передача props
<App>
  <Header>
    <UserProfile user={user} />
  </Header>
  <Sidebar>
    <UserWidget user={user} />
  </Sidebar>
  <Content>
    <UserDashboard user={user} />
  </Content>
</App>
```

**Альтернативы:**
- Local state — подходит для простых случаев
- Props drilling — неудобно для глубокой вложенности
- Context API — хорошо для небольших и средних проектов
- **Redux** — для больших приложений с комплексной логикой

### Что такое Redux

**Redux** — предсказуемый контейнер состояния для JavaScript приложений. Реализует архитектурный паттерн Flux с односторонним потоком данных.

### Основные принципы Redux

1. **Single Source of Truth** — все состояние приложения хранится в одном Store
2. **State is Read-Only** — состояние можно изменить только через Actions
3. **Changes are Made with Pure Functions** — изменения выполняются через Reducers

### Основные сущности Redux

#### View (Представление)

- Визуальная часть приложения (React-компоненты)
- Только отображает данные из Store
- Подписывается на изменения состояния
- Генерирует Actions при взаимодействии пользователя

```jsx
const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};
```

#### Action (Действие)

JavaScript-объект, описывающий что произошло. Обязательное поле — `type`.

```javascript
// Простое действие
const addTodo = {
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Изучить Redux'
  }
};

// Action Creator
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: Date.now(),
    text
  }
});
```

#### Store (Хранилище)

Объект, который содержит состояние приложения и предоставляет методы для работы с ним:

- `getState()` — получить текущее состояние
- `dispatch(action)` — отправить действие
- `subscribe(listener)` — подписаться на изменения

```javascript
import { createStore } from 'redux';

const store = createStore(rootReducer);

// Отправка действия
store.dispatch(addTodo('Новая задача'));

// Получение состояния
const currentState = store.getState();
```

#### Reducer (Редуктор)

Чистая функция, которая принимает текущее состояние и действие, возвращает новое состояние:

```javascript
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    
    default:
      return state;
  }
};
```

**Важные правила Reducers:**
- Никогда не мутируют состояние
- Возвращают новый объект состояния
- Являются чистыми функциями (без side effects)

## 2. Интеграция с React

### Установка зависимостей

```bash
# Для нового проекта с Vite
npm create vite@latest my-app -- --template react
cd my-app
npm install redux react-redux

# Для существующего проекта
npm install redux react-redux
```

### Provider

Компонент, который предоставляет Store всему дереву компонентов:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Современные хуки React Redux

#### useSelector

Хук для получения данных из Store:

```jsx
import { useSelector } from 'react-redux';

const TodoList = () => {
  // Получаем часть состояния
  const todos = useSelector(state => state.todos);
  const completedCount = useSelector(state => 
    state.todos.filter(todo => todo.completed).length
  );
  
  return (
    <div>
      <p>Выполнено: {completedCount}</p>
      {/* рендер списка */}
    </div>
  );
};
```

#### useDispatch

Хук для отправки действий:

```jsx
import { useDispatch } from 'react-redux';
import { addTodo, removeTodo } from './actions';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
```

## 3. Практический пример: Управление услугами

### Структура проекта

```
src/
├── components/
│   ├── ServiceList.jsx
│   └── ServiceAdd.jsx
├── store/
│   └── index.js
├── reducers/
│   ├── serviceList.js
│   └── serviceAdd.js
└── actions/
    ├── actionTypes.js
    └── actionCreators.js
```

### Action Types

```javascript
// actions/actionTypes.js
export const ADD_SERVICE = 'ADD_SERVICE';
export const REMOVE_SERVICE = 'REMOVE_SERVICE';
export const CHANGE_SERVICE_FIELD = 'CHANGE_SERVICE_FIELD';
```

### Action Creators

```javascript
// actions/actionCreators.js
import { ADD_SERVICE, REMOVE_SERVICE, CHANGE_SERVICE_FIELD } from './actionTypes';

export const addService = (name, price) => ({
  type: ADD_SERVICE,
  payload: { name, price }
});

export const removeService = (id) => ({
  type: REMOVE_SERVICE,
  payload: { id }
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: { name, value }
});
```

### Reducers

```javascript
// reducers/serviceList.js
import { nanoid } from 'nanoid';
import { ADD_SERVICE, REMOVE_SERVICE } from '../actions/actionTypes';

const initialState = [
  { id: nanoid(), name: 'Замена стекла', price: 21000 },
  { id: nanoid(), name: 'Замена дисплея', price: 25000 },
];

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      const { name, price } = action.payload;
      return [
        ...state, 
        { 
          id: nanoid(), 
          name, 
          price: Number(price) 
        }
      ];
    
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return state.filter(service => service.id !== id);
    
    default:
      return state;
  }
}
```

```javascript
// reducers/serviceAdd.js
import { CHANGE_SERVICE_FIELD } from '../actions/actionTypes';

const initialState = { 
  name: '', 
  price: '' 
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    
    default:
      return state;
  }
}
```

### Создание Store

```javascript
// store/index.js
import { createStore, combineReducers } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceAddReducer from '../reducers/serviceAdd';

const rootReducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer
});

const store = createStore(rootReducer);

export default store;
```

### Компоненты

```jsx
// components/ServiceList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeService } from '../actions/actionCreators';

const ServiceList = () => {
  const services = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  
  const handleRemove = (id) => {
    dispatch(removeService(id));
  };
  
  return (
    <ul>
      {services.map(service => (
        <li key={service.id}>
          {service.name} - {service.price}₽
          <button 
            onClick={() => handleRemove(service.id)}
            aria-label={`Удалить ${service.name}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ServiceList;
```

```jsx
// components/ServiceAdd.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService } from '../actions/actionCreators';

const ServiceAdd = () => {
  const formData = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.name.trim() && formData.price.trim()) {
      dispatch(addService(formData.name, formData.price));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название услуги"
        required
      />
      <input 
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Цена"
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ServiceAdd;
```

## 4. Инструменты разработки

### Redux DevTools

```javascript
// store/index.js - современный подход
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  // DevTools включены автоматически в development
  devTools: process.env.NODE_ENV !== 'production'
});
```

**Возможности DevTools:**
- Просмотр всех Actions и состояний
- Time-travel debugging
- Экспорт/импорт состояния
- Hot reload для reducers

### Middleware

Функции, которые расширяют возможности dispatch:

```javascript
// Простой logger middleware
const logger = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
```

## Лучшие практики

### Структура состояния

```javascript
// Хорошо - нормализованная структура
const state = {
  users: {
    byId: {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Jane' }
    },
    allIds: [1, 2]
  },
  ui: {
    loading: false,
    error: null
  }
};

// Плохо - вложенные массивы объектов
const state = {
  users: [
    { id: 1, name: 'John', posts: [...] },
    { id: 2, name: 'Jane', posts: [...] }
  ]
};
```

### Именование Actions

```javascript
// Хорошо - описательные имена
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Плохо - неясные имена
const LOADING = 'LOADING';
const DATA = 'DATA';
const ERROR = 'ERROR';
```

### Обработка асинхронных операций

```javascript
// Action creators для асинхронных операций
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    
    try {
      const response = await api.getUsers();
      dispatch({ 
        type: 'FETCH_USERS_SUCCESS', 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_USERS_FAILURE', 
        payload: error.message 
      });
    }
  };
};
```

## Redux vs Context API

### Когда использовать Context API

- Небольшие и средние проекты
- Простая логика состояния
- Нечастые обновления состояния
- Нет необходимости в middleware

### Когда использовать Redux

- Большие приложения с сложной логикой
- Частые обновления состояния
- Необходимость в отладке (time-travel)
- Требуется middleware (например, для API)
- Команда разработчиков предпочитает предсказуемость

## Современное состояние Redux

### Redux Toolkit — современный стандарт

В реальных проектах чистый Redux практически не используется — вместо него применяется **Redux Toolkit (RTK)**, который решает проблемы избыточного кода и сложной настройки. Классический Redux важен для понимания концепций, но для продуктивной разработки используется RTK.

**Следующий шаг изучения:**
Redux Toolkit — `createSlice()`, `configureStore()`, работа с асинхронными операциями и современные паттерны разработки.

## Итоги

### Ключевые концепции

1. **Redux** — предсказуемый контейнер состояния с односторонним потоком данных
2. **Store** — единое место хранения состояния приложения
3. **Actions** — объекты, описывающие изменения
4. **Reducers** — чистые функции для обновления состояния
5. **react-redux** — библиотека для интеграции Redux с React

### Преимущества Redux

- Предсказуемое управление состоянием
- Централизованное хранение данных
- Отличные инструменты разработки
- Богатая экосистема middleware
- Time-travel debugging

### Недостатки Redux

- Много шаблонного кода
- Сложность настройки для простых случаев
- Крутая кривая обучения
- Избыточность для небольших проектов

## Дополнительные материалы

### Официальная документация

- [Redux Official Documentation](https://redux.js.org/) — основная документация Redux
- [React Redux](https://react-redux.js.org/) — документация по интеграции с React
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) — инструменты разработчика

### Рекомендуемые материалы

- [Redux Fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview) — подробный туториал по основам
- [Redux Style Guide](https://redux.js.org/style-guide/) — лучшие практики от создателей Redux
- [Thinking in Redux](https://redux.js.org/understanding/thinking-in-redux) — философия и принципы Redux