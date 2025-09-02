# Redux Toolkit для современной разработки

## Цели занятия

- Изучить преимущества Redux Toolkit над классическим Redux
- Освоить основные функции RTK: createSlice, configureStore, createAsyncThunk
- Научиться работать с RTK и TypeScript
- Понять современные паттерны разработки с Redux Toolkit

## План занятия

1. Введение в Redux Toolkit
2. createSlice — объединение actions и reducers
3. configureStore — упрощенная настройка Store
4. Работа с асинхронными операциями
5. TypeScript интеграция

## 1. Введение в Redux Toolkit

### Проблемы классического Redux

**Основные недостатки:**
- Слишком много шаблонного кода (boilerplate)
- Сложная настройка Store с middleware
- Отсутствие встроенных средств для асинхронных операций
- Необходимость дополнительных библиотек для базовой функциональности

### Что такое Redux Toolkit

**Redux Toolkit (RTK)** — официальная библиотека для эффективной работы с Redux. Создана командой Redux для решения проблем классического подхода.

**Ключевые особенности:**
- Упрощает типичные случаи использования Redux
- Включает лучшие практики по умолчанию
- Уменьшает количество кода
- Встроенная поддержка TypeScript

### Установка Redux Toolkit

```bash
# Для нового проекта с Vite (рекомендуется)
npm create vite@latest my-app -- --template react-redux-ts
cd my-app
npm run dev

# Для нового проекта с JavaScript
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @reduxjs/toolkit react-redux
npm run dev

# Для существующего проекта
npm install @reduxjs/toolkit react-redux

# Альтернативные менеджеры пакетов
yarn add @reduxjs/toolkit react-redux
pnpm add @reduxjs/toolkit react-redux
```

### Основные функции RTK

- `configureStore()` — упрощенная настройка Store
- `createSlice()` — объединяет actions и reducers
- `createAsyncThunk()` — для асинхронных операций
- `createEntityAdapter()` — для нормализации данных

## 2. createSlice — современный подход

### Проблема классического Redux

```typescript
// ❌ Классический Redux - много кода
interface CounterState {
  value: number;
}

const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';

interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

interface IncrementByAmountAction {
  type: typeof INCREMENT_BY_AMOUNT;
  payload: number;
}

type CounterAction = IncrementAction | DecrementAction | IncrementByAmountAction;

const initialState: CounterState = { value: 0 };

const counterReducer = (state = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY_AMOUNT:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
};

// Action creators
export const increment = (): IncrementAction => ({ type: INCREMENT });
export const decrement = (): DecrementAction => ({ type: DECREMENT });
export const incrementByAmount = (amount: number): IncrementByAmountAction => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount
});
```

### Решение через createSlice

```typescript
// ✅ Redux Toolkit - компактно и типобезопасно
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer позволяет "мутировать"
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Что такое Slice

**Slice** — это объект, который содержит:
- Начальное состояние
- Объект с reducer-функциями
- Имя slice'а

```typescript
const slice = createSlice({
  name: 'sliceName',
  initialState: initialData,
  reducers: {
    // reducer functions
  }
});
```

### Практический пример: Product Management

```typescript
// types/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductState {
  products: Product[];
  cart: CartItem[];
  total: number;
  loading: boolean;
}
```

```typescript
// features/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem, ProductState } from '../types/Product';

const initialState: ProductState = {
  products: [
    { id: '1', name: 'Apple', price: 20 },
    { id: '2', name: 'Banana', price: 3 },
    { id: '3', name: 'Orange', price: 10 }
  ],
  cart: [],
  total: 0,
  loading: false
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      
      state.total += action.payload.price;
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload);
      
      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.total -= item.price * item.quantity;
        state.cart.splice(itemIndex, 1);
      }
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      
      if (item) {
        const priceDiff = (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
        state.total += priceDiff;
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = productSlice.actions;
export default productSlice.reducer;
```

### Расширенные возможности createSlice

#### Кастомная подготовка Actions (prepare)

```typescript
const todoSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] as Todo[] },
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (text: string) => {
        return {
          payload: {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
          }
        };
      }
    }
  }
});
```

#### extraReducers для внешних Actions

```typescript
import { createAction } from '@reduxjs/toolkit';

// Внешние actions
const resetApp = createAction('app/reset');
const incrementBy = createAction<number>('incrementBy');

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, (state) => {
        state.value = 0;
      })
      .addCase(incrementBy, (state, action) => {
        state.value += action.payload;
      });
  }
});
```

#### Связь между Slice'ами

```typescript
// userSlice.ts
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 } as UserState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Реагируем на actions из другого slice
    builder.addCase(counterSlice.actions.increment, (state) => {
      state.age += 1;
    });
  }
});
```

## 3. configureStore — упрощенная настройка

### Базовая настройка Store

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import productReducer from '../features/productSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    user: userReducer
  },
  // DevTools включены автоматически в development
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Типизированные хуки

```typescript
// hooks/redux.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Настройка Middleware

```typescript
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    // reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
});
```

### Middleware по умолчанию

RTK автоматически включает:
- **redux-thunk** — для асинхронных операций
- **serializableStateInvariantMiddleware** — проверка сериализуемости
- **immutableStateInvariantMiddleware** — проверка иммутабельности

## 4. Работа с асинхронными операциями

### createAsyncThunk — современный подход

```typescript
// api/todosAPI.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const todosAPI = {
  fetchTodos: async (): Promise<Todo[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  fetchTodoById: async (id: number): Promise<Todo> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todo ${id}`);
    }
    return response.json();
  },

  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    return response.json();
  }
};
```

```typescript
// features/todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { todosAPI, Todo } from '../api/todosAPI';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null
};

// Асинхронные thunk'и
export const fetchTodos = createAsyncThunk
  Todo[], // возвращаемый тип
  void, // тип аргумента
  { rejectValue: string } // тип для reject
>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      return await todosAPI.fetchTodos();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTodoById = createAsyncThunk
  Todo,
  number,
  { rejectValue: string }
>(
  'todos/fetchById',
  async (todoId, { rejectWithValue }) => {
    try {
      return await todosAPI.fetchTodoById(todoId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Network error');
    }
  }
);

export const createTodo = createAsyncThunk
  Todo,
  Omit<Todo, 'id'>,
  { rejectValue: string }
>(
  'todos/createTodo',
  async (todoData, { rejectWithValue }) => {
    try {
      return await todosAPI.createTodo(todoData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create todo');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch todos';
      })
      
      // Fetch todo by ID
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        const existingIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (existingIndex !== -1) {
          state.todos[existingIndex] = action.payload;
        } else {
          state.todos.push(action.payload);
        }
      })
      
      // Create todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  }
});

export const { clearError, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

### Использование в компонентах

```typescript
// components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTodos, fetchTodoById, createTodo, clearError, toggleTodo } from '../features/todosSlice';

const TodoList: React.FC = () => {
  const { todos, loading, error } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const [todoId, setTodoId] = useState<string>('');
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFetchTodo = async () => {
    if (todoId.trim()) {
      const result = await dispatch(fetchTodoById(Number(todoId)));
      
      if (fetchTodoById.fulfilled.match(result)) {
        console.log('Todo fetched successfully:', result.payload);
        setTodoId('');
      } else {
        console.error('Failed to fetch todo:', result.payload);
      }
    }
  };

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim()) {
      const result = await dispatch(createTodo({
        title: newTodoTitle,
        completed: false,
        userId: 1
      }));
      
      if (createTodo.fulfilled.match(result)) {
        setNewTodoTitle('');
      }
    }
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  if (loading && todos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      
      {error && (
        <div style={{ color: 'red' }}>
          Error: {error}
          <button onClick={() => dispatch(clearError())}>Clear</button>
        </div>
      )}

      {/* Fetch specific todo */}
      <div>
        <input 
          type="number"
          value={todoId}
          onChange={(e) => setTodoId(e.target.value)}
          placeholder="Enter todo ID"
        />
        <button onClick={handleFetchTodo} disabled={loading}>
          Fetch Todo
        </button>
      </div>

      {/* Create new todo */}
      <div>
        <input 
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New todo title"
        />
        <button onClick={handleCreateTodo} disabled={loading}>
          Create Todo
        </button>
      </div>

      {/* Todo list */}
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => handleToggle(todo.id)}
          >
            #{todo.id}: {todo.title}
            {todo.completed && ' ✅'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

## 5. TypeScript интеграция

### Полная настройка с TypeScript

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todosSlice';
import { counterSlice } from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    counter: counterSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Для использования с RTK Query
export type AppStore = typeof store;
```

### Typed useSelector и useDispatch

```typescript
// hooks/typed-hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Альтернативный подход с дженериками
export const useTypedSelector = <T>(selector: (state: RootState) => T): T => 
  useSelector(selector);
```

### Типизация для сложных случаев

```typescript
// features/usersSlice.ts
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

interface UsersState {
  entities: Record<string, User>;
  ids: string[];
  filters: {
    role?: User['role'];
    searchTerm: string;
  };
}

const initialState: UsersState = {
  entities: {},
  ids: [],
  filters: {
    searchTerm: ''
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.entities[user.id] = user;
      state.ids.push(user.id);
    },
    updateUser: (state, action: PayloadAction<Partial<User> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      if (state.entities[id]) {
        Object.assign(state.entities[id], updates);
      }
    },
    setRoleFilter: (state, action: PayloadAction<User['role'] | undefined>) => {
      state.filters.role = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    }
  }
});

// Селекторы с мемоизацией
export const selectUsers = (state: RootState) => state.users;
export const selectAllUsers = (state: RootState) => 
  state.users.ids.map(id => state.users.entities[id]);

export const selectFilteredUsers = createSelector(
  [selectAllUsers, (state: RootState) => state.users.filters],
  (users, filters) => {
    return users.filter(user => {
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesSearch = !filters.searchTerm || 
        user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesRole && matchesSearch;
    });
  }
);

export const { addUser, updateUser, setRoleFilter, setSearchTerm } = usersSlice.actions;
export default usersSlice.reducer;
```

## Лучшие практики

### Структура проекта

```
src/
├── app/
│   ├── store.ts
│   └── hooks.ts
├── features/
│   ├── todos/
│   │   ├── todosSlice.ts
│   │   ├── TodoList.tsx
│   │   └── api.ts
│   └── users/
│       ├── usersSlice.ts
│       └── UserProfile.tsx
├── shared/
│   ├── api/
│   └── types/
└── App.tsx
```

### Именование

```typescript
// Хорошо - описательные имена
const todosSlice = createSlice({
  name: 'todos',
  // ...
});

export const fetchUserProfile = createAsyncThunk(
  'users/fetchProfile',
  // ...
);

// Плохо - сокращения и неясные имена
const tSlice = createSlice({
  name: 't',
  // ...
});
```

### Обработка ошибок

```typescript
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    error: null as string | null,
    lastAction: null as string | null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Универсальная обработка для всех async thunks
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.lastAction = action.type;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error?.message || 'Unknown error';
        }
      );
  }
});
```

## Итоги

### Преимущества Redux Toolkit

1. **Меньше кода** — автоматическая генерация action creators и типов
2. **Встроенные лучшие практики** — Immer, DevTools, middleware
3. **TypeScript из коробки** — отличная поддержка типизации
4. **Упрощенная настройка** — configureStore вместо множества конфигураций
5. **Современный подход** — createAsyncThunk для асинхронности

### Ключевые функции

- `createSlice()` — объединяет actions и reducers
- `configureStore()` — упрощенная настройка Store
- `createAsyncThunk()` — для асинхронных операций
- Встроенный Immer для безопасных "мутаций"
- Redux DevTools настроены автоматически

### Миграция с классического Redux

Redux Toolkit полностью совместим с классическим Redux. Можно мигрировать постепенно, заменяя по одному slice за раз.

**Современный стандарт:** Все новые проекты должны использовать Redux Toolkit. Классический Redux важен для понимания концепций, но RTK — это инструмент для продуктивной разработки.

## Дополнительные материалы

### Официальная документация

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) — основная документация RTK
- [Redux Toolkit TypeScript Guide](https://redux-toolkit.js.org/usage/usage-with-typescript) — использование с TypeScript
- [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) — работа с асинхронными операциями

### Продвинутые темы

- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) — для работы с API
- [Entity Adapter](https://redux-toolkit.js.org/api/createEntityAdapter) — для нормализации данных
- [Redux Toolkit Examples](https://github.com/reduxjs/redux-toolkit/tree/master/examples) — примеры использования