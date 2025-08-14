# Props и TypeScript в React

## Цели занятия

- Изучить механизм props в React
- Освоить практические приёмы обработки props
- Научиться типизировать компоненты с TypeScript
- Понять преимущества компонентов без состояния

## План занятия

1. Props
2. Списки и ключи
3. Передача состояния

## 1. Props

### Определение

**Props** — входные данные React-компонентов, передаваемые от родительского компонента дочернему. Props предназначены только для чтения и не должны изменяться внутри компонента.

### Задача компонентов

Компоненты обеспечивают переиспользование кода в React-приложениях. Это ускоряет разработку и упрощает поддержку кода.

### Пример базового компонента

```jsx
function UserProfile() {
    const user = {
        name: 'Vasya',
        status: 'React Developer',
        avatar: 'https://dummyimage.com/200x100',
    };

    return (
        <div className="card">
            <img src={user.avatar} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.status}</p>
            </div>
        </div>
    );
}
```

### Передача данных через props

```jsx
function App() {
    const user = {
        name: 'Vasya',
        status: 'React Developer',
        avatar: 'https://dummyimage.com/200x100',
    };

    return <UserProfile user={user} />;
}

function UserProfile(props) {
    const { user } = props;

    return (
        <div className="card">
            <img src={user.avatar} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.status}</p>
            </div>
        </div>
    );
}
```

### Возможности Props

- Передаются как атрибуты элемента: `<UserProfile user={user} />`
- Фигурные скобки `{}` передают JavaScript-выражения, без них значение интерпретируется как строка
- Можно передавать любые типы данных: примитивы, объекты, массивы, функции
- Доступны как первый аргумент функции-компонента

### Практический пример: компонент карточки пользователя

```jsx
// Передача различных типов данных через props
function UserCard({ name, age, isActive, hobbies, onClick }) {
    return (
        <div className="user-card" onClick={onClick}>
            <h2>{name}</h2>
            <p>Возраст: {age}</p>
            <p>Статус: {isActive ? 'Активен' : 'Неактивен'}</p>
            <ul>
                {hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
        </div>
    );
}

// Использование
function App() {
    const handleClick = () => console.log('Карточка нажата');

    return (
        <UserCard
            name="Иван"
            age={25}
            isActive={true}
            hobbies={['React', 'TypeScript', 'Node.js']}
            onClick={handleClick}
        />
    );
}
```

## 2. TypeScript в React

### Проблема

JavaScript не проверяет типы данных во время написания кода. Легко передать неправильные props, что приводит к ошибкам во время выполнения.

### Решение

TypeScript добавляет статическую типизацию. IDE подсвечивает ошибки типов до запуска кода. При сборке TypeScript компилируется в обычный JavaScript.

### Основные концепции TypeScript для React

#### Базовые типы

```tsx
// Примитивные типы
let name: string = 'React';
let count: number = 42;
let isActive: boolean = true;

// Массивы
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ['a', 'b', 'c'];

// Объекты
interface User {
    id: number;
    name: string;
    email?: string; // опциональное свойство
}
```

#### Типизация функций

```tsx
// Обычная функция
function add(a: number, b: number): number {
    return a + b;
}

// Стрелочная функция
const multiply = (a: number, b: number): number => a * b;

// Функция с callback
function processData(
    data: string,
    callback: (result: string) => void
): void {
    callback(data.toUpperCase());
}
```

#### Типизация React-компонентов

```tsx
// Интерфейс для props
interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary'; // Union type
}

// Функциональный компонент
const Button = ({
                    label,
                    onClick,
                    disabled = false,
                    variant = 'primary'
                }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
        >
            {label}
        </button>
    );
};
```

#### Типизация useState

```tsx
import { useState } from 'react';

function Counter() {
    // Автоматический вывод типа
    const [count, setCount] = useState(0);

    // Явное указание типа
    const [user, setUser] = useState<User | null>(null);

    // Массив объектов
    const [items, setItems] = useState<string[]>([]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}
```

#### Generics (обобщения)

```tsx
// Generic компонент для списка
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}

// Использование
<List
    items={[1, 2, 3]}
    renderItem={(num) => <span>{num * 2}</span>}
/>
```

### Установка TypeScript в React-проект

```bash
# Создание нового проекта с Vite и TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# Альтернативный способ с выбором шаблона
npm create vite@latest
# Затем выбрать: React -> TypeScript + SWC

# Добавление TypeScript в существующий проект
npm install --save-dev typescript @types/react @types/react-dom
npx tsc --init
# далее нужно настроить webpack / vite / или другой сборщик
```

## 3. Атрибуты без значений

HTML поддерживает атрибуты без значений:

```html
<textarea disabled></textarea>
<input required>
```

В JSX атрибут без значения автоматически получает значение `true`:

```jsx
// Эквивалентные записи
<Button primary />
<Button primary={true} />
```

### Значения по умолчанию

React рекомендует использовать значения по умолчанию через деструктуризацию:

```tsx
interface UserInfoProps {
    name?: string;
    img?: string;
}

function UserInfo({
                      name,
                      img = 'https://dummyimage.com/100x100/000/ffffff&text=default'
                  }: UserInfoProps) {
    return (
        <div className="card">
            <img src={img} className="card-img-top" alt="User avatar" />
            <div className="card-body">
                <h6 className="card-title">{name || 'Гость'}</h6>
            </div>
        </div>
    );
}
```

### Практический пример: конфигурируемая кнопка

```tsx
interface ButtonProps {
    label: string;
    primary?: boolean;
    disabled?: boolean;
    large?: boolean;
}

function Button({
                    label,
                    primary = false,
                    disabled = false,
                    large = false
                }: ButtonProps) {
    const classNames = [
        'btn',
        primary && 'btn-primary',
        large && 'btn-large'
    ].filter(Boolean).join(' ');

    return (
        <button className={classNames} disabled={disabled}>
            {label}
        </button>
    );
}

// Использование
<Button label="Отправить" primary large />
```

## 4. Паттерны компонентов

### Презентационные компоненты

Отвечают только за внешний вид. Получают данные через props, не имеют собственной бизнес-логики.

**Характеристики:**
- Не содержат состояния (или минимальное UI-состояние)
- Легко тестируются
- Высокая переиспользуемость

```tsx
interface ProductCardProps {
    title: string;
    price: number;
    imageUrl: string;
    onAddToCart: () => void;
}

const ProductCard = ({
                         title,
                         price,
                         imageUrl,
                         onAddToCart
                     }: ProductCardProps) => (
    <div className="product-card">
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{price} ₽</p>
        <button onClick={onAddToCart}>В корзину</button>
    </div>
);
```

### Компоненты-контейнеры

Управляют данными и бизнес-логикой. Загружают данные, обрабатывают события, передают props в презентационные компоненты.

**Характеристики:**
- Содержат useState, useEffect
- Работают с API
- Обрабатывают пользовательские действия
- Редко переиспользуются

```tsx
const ProductListContainer = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const handleAddToCart = (productId: number) => {
        // Логика добавления в корзину
        console.log(`Добавлен товар ${productId}`);
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    onAddToCart={() => handleAddToCart(product.id)}
                />
            ))}
        </div>
    );
};
```

## 5. Списки и ключи

### Зачем нужны ключи

При рендеринге списков React требует уникальный атрибут `key` для каждого элемента. Ключи помогают React эффективно обновлять DOM при изменении списка.

### Правильное использование ключей

```tsx
const users = [
    { id: 'u123', name: 'Ларичев Иван' },
    { id: 'u456', name: 'Морозов Алексей' },
    { id: 'u789', name: 'Бурмистров Роман' }
];

return (
    <ul>
        {users.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
);
```

### Хорошие и плохие ключи

**Хорошие ключи:**
- Уникальные ID из базы данных
- UUID
- Стабильные идентификаторы

**Плохие ключи:**
- Индексы массива (при изменении порядка элементов)
- Math.random() (нестабильные)
- Временные метки (если генерируются при каждом рендере)

### Проблемы с индексами как ключами

```tsx
// ПЛОХО: использование индекса
items.map((item, index) => <Item key={index} {...item} />)

// Проблемы:
// 1. При удалении элемента все последующие получают новые индексы
// 2. При сортировке React не понимает, какой элемент куда переместился
// 3. Компоненты со state теряют данные при изменении порядка
```

### Пример: TodoList с правильными ключами

```tsx
interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: '1', text: 'Изучить React', completed: false },
        { id: '2', text: 'Написать компонент', completed: true },
        { id: '3', text: 'Протестировать код', completed: false }
    ]);

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}  // Используем стабильный id
                    todo={todo}
                />
            ))}
        </ul>
    );
}

function TodoItem({ todo }: { todo: Todo }) {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
        </li>
    );
}
```

## 6. Передача состояния

### Пример: Список покупок

Создадим приложение для управления списком покупок с возможностью отмечать купленные товары и удалять ненужные.

#### Типы данных

```typescript
// types/PurchaseType.ts
export type PurchaseModel = {
    id: number;
    name: string;
    done?: boolean;
};
```

#### Компонент элемента списка

```tsx
// components/PurchaseItem.tsx
interface PurchaseItemProps {
    item: PurchaseModel;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

function PurchaseItem({ item, onToggle, onRemove }: PurchaseItemProps) {
    const { id, name, done } = item;

    const handleToggle = () => onToggle(id);
    const handleRemove = () => onRemove(id);

    return (
        <li>
      <span style={{ textDecoration: done ? 'line-through' : 'none' }}>
        {name}
      </span>
            <button onClick={handleToggle}>
                {done ? 'Отменить' : 'Купить'}
            </button>
            <button onClick={handleRemove}>Удалить</button>
        </li>
    );
}
```

#### Компонент списка

```tsx
// components/PurchaseList.tsx
import { useState } from 'react';

function PurchaseList() {
    const [items, setItems] = useState<PurchaseModel[]>([
        { id: 1, name: 'Молоко', done: false },
        { id: 2, name: 'Хлеб', done: false },
        { id: 3, name: 'Яйца', done: true }
    ]);

    const onItemToggle = (id: number) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, done: !item.done }
                    : item
            )
        );
    };

    const onItemRemove = (id: number) => {
        setItems(prevItems =>
            prevItems.filter(item => item.id !== id)
        );
    };

    return (
        <ul>
            {items.map(item => (
                <PurchaseItem
                    key={item.id}
                    item={item}
                    onToggle={onItemToggle}
                    onRemove={onItemRemove}
                />
            ))}
        </ul>
    );
}
```

### Важные принципы

1. **Состояние хранится в родительском компоненте** — PurchaseList владеет данными
2. **Props read-only** — PurchaseItem не изменяет полученные данные
3. **Обратная связь через функции** — дочерний компонент вызывает функции из props для изменения состояния
4. **Иммутабельные обновления** — используем map и filter для создания новых массивов

## Итоги

### Ключевые концепции

1. **Props** — механизм передачи данных от родительского компонента дочернему. Props неизменяемы.

2. **TypeScript** — добавляет проверку типов на этапе компиляции, предотвращая ошибки до запуска кода.

3. **Ключи (key)** — уникальные идентификаторы элементов списка, необходимые для оптимизации рендеринга.

4. **Паттерны компонентов** — разделение на презентационные компоненты и контейнеры упрощает тестирование и переиспользование.

5. **Передача состояния** — состояние хранится в родительском компоненте, дочерние компоненты получают данные и функции-обработчики через props.

## Дополнительные материалы

### Официальная документация React

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — подробное руководство по работе с props
- [Using TypeScript](https://react.dev/learn/typescript) — официальное руководство по использованию TypeScript в React
- [Conditional Rendering](https://react.dev/learn/conditional-rendering) — техники условного рендеринга компонентов
- [Rendering Lists](https://react.dev/learn/rendering-lists) — правильная работа со списками и ключами
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) — принципы создания чистых компонентов


### Официальная документация TypeScript
- [React](https://www.typescriptlang.org/docs/handbook/react.html)

### Дополнительные ресурсы

- [EN - Презентационные компоненты и контейнеры](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) — подробный разбор паттерна разделения компонентов (ранее "умные и глупые компоненты")
- [YT - АйТи Синяк - Все ли вы знаете о React key?](https://www.youtube.com/watch?v=OtAlPwW8DNU)
- [prop-types](https://www.npmjs.com/package/prop-types) — проверка типов в `runtime`, ранее было частью `react`, было актуально до того как `typescript` стал стандартом
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) — шпаргалка для разработчиков React, начинающих работать с TypeScript