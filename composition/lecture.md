# Композиция компонентов в React

## Цели занятия

- Научиться использовать children и типизировать их в TypeScript
- Освоить паттерны композиции: Compound Components, Slots, Props Forwarding
- Понять, когда выбрать композицию вместо пропсов

## План занятия

1. Children prop и вложенные элементы
2. Props Forwarding и композиция
3. Паттерны композиции
4. Best Practices

## 1. Композиция через children

### Проблема

При создании переиспользуемых компонентов часто возникает проблема масштабирования. Например, создавая модальное окно для одной акции, мы быстро сталкиваемся с необходимостью создавать похожие компоненты для других целей.

```tsx
// Первая версия - жестко заданный контент
export default function TodayOfferModal() {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>Только сегодня и только сейчас!</h2>
        <a href="/today/">Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// Дублирование для другой акции
export default function DiscountOfferModal() {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>Самые большие скидки!</h2>
        <a href="/discount/">Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}
```

### Эволюция решений

#### 1. Props для данных

Первая попытка - вынести изменяемые данные в props:

```tsx
interface OfferModalProps {
  title: string;
  link: string;
}

export default function OfferModal({ title, link }: OfferModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>{title}</h2>
        <a href={link}>Узнать подробнее</a>
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}
```

**Проблема:** Что если вместо ссылки нужна форма или другой контент?

#### 2. Компонент как prop

```tsx
interface OfferModalProps {
  body: React.ReactNode;
}

export default function OfferModal({ body }: OfferModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        {body}
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// Использование
<OfferModal body={<SubscriptionForm />} />
```

**Проблема:** JSX внутри атрибута выглядит неестественно.

#### 3. Решение через children (рекомендуется)

```tsx
interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        {children}
      </div>
      <button className="btn btn-close">Закрыть</button>
    </div>
  );
}

// Использование - естественный синтаксис
<Modal>
  <h2>Выбери свой абонемент!</h2>
  <SubscriptionForm />
</Modal>
```

### Типизация children в TypeScript

```tsx
// Базовая типизация
interface ContainerProps {
  children: React.ReactNode; // Может быть string, number, element, array и т.д.
}

// Ограничение типа children
interface ButtonGroupProps {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
}

// Использование PropsWithChildren
type CardProps = React.PropsWithChildren<{
  title: string;
}>;

// Function as children pattern
interface RenderPropProps {
  children: (data: SomeData) => React.ReactElement;
}
```

## 2. Props Forwarding и композиция

### Что такое композиция компонентов

**Композиция компонентов** — это создание сложных компонентов путем объединения простых. В React это основной способ переиспользования кода.

### Проблема специализированных компонентов

Представим компонент Message с множеством props:

```tsx
interface MessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  icon?: string;
  position?: string;
  timeout?: number;
  priority?: number;
}

export default function Message(props: MessageProps) {
  return (
    <div className={`message message-${props.type}`}>
      {/* Реализация */}
    </div>
  );
}
```

Как создать ErrorMessage, который всегда имеет `type="error"`?

### Плохое решение - ручной проброс

```tsx
// ❌ Приходится дублировать все props
interface ErrorMessageProps {
  text: string;
  icon?: string;
  position?: string;
  timeout?: number;
  priority?: number;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Message
      type="error"
      text={props.text}
      icon={props.icon}
      position={props.position}
      timeout={props.timeout}
      priority={props.priority}
    />
  );
}
```

### Хорошее решение - Props Forwarding

```tsx
// ✅ Используем spread operator и типы TypeScript
interface ErrorMessageProps extends Omit<MessageProps, 'type'> {}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Message
      {...props}
      type="error"
    />
  );
}
```

### Порядок spread имеет значение

```tsx
const message = { type: 'info', text: 'Сообщение' };

// type будет 'info' (из объекта)
<Message type="error" {...message} />

// type будет 'error' (переопределяем)
<Message {...message} type="error" />
```

### Чистый подход к композиции

```tsx
export default function ErrorMessage(props: ErrorMessageProps) {
  const messageProps: MessageProps = {
    ...props,
    type: 'error'
  };
  
  return <Message {...messageProps} />;
}
```

## 3. Паттерны композиции

### Принцип единой ответственности (SRP)

Каждый компонент должен отвечать только за одну задачу. Это основа хорошей композиции.

### Пример: Sidebar с виджетами

#### Исходная разметка без компонентов

```jsx
<aside>
  <div className="widget">
    <h5>Теги</h5>
    <div className="tag-block">
      <button className="btn">JavaScript</button>
      <button className="btn">Node.JS</button>
    </div>
  </div>
  <div className="widget">
    <h5>Социальные сети</h5>
    <ul className="social-block">
      <li><a href="#">VK</a></li>
      <li><a href="#">Email</a></li>
    </ul>
  </div>
</aside>
```

#### Декомпозиция на компоненты

```tsx
// Универсальный виджет
interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <div className="widget">
      <h5>{title}</h5>
      {children}
    </div>
  );
}

// Контейнер для виджетов
interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return <aside>{children}</aside>;
}

// Использование
<Sidebar>
  <Widget title="Теги">
    <TagList tags={['JavaScript', 'React', 'Node.js']} />
  </Widget>
  <Widget title="Социальные сети">
    <SocialLinks links={socialData} />
  </Widget>
</Sidebar>
```

### Подходы к выделению компонентов

1. **От большего к меньшему** - начинаем с крупных контейнеров
2. **От меньшего к большему** - сначала выделяем мелкие переиспользуемые части
3. **Комбинированный подход** - чередуем оба метода

## 4. Продвинутые паттерны (обзор)

### Compound Components

Группа компонентов, работающих вместе:

```tsx
<Select>
  <Select.Option value="1">Опция 1</Select.Option>
  <Select.Option value="2">Опция 2</Select.Option>
</Select>
```

### Slots Pattern

Именованные области для контента:

```tsx
<Card>
  <Card.Header>Заголовок</Card.Header>
  <Card.Body>Основной контент</Card.Body>
  <Card.Footer>Подвал</Card.Footer>
</Card>
```

### Render Props

Передача функции рендеринга:

```tsx
<DataProvider>
  {(data) => <DataDisplay items={data} />}
</DataProvider>
```

## Best Practices

### Когда использовать композицию

1. **Используйте children когда:**
    - Контент заранее неизвестен
    - Нужна гибкость в размещении контента
    - Создаете контейнерные компоненты

2. **Используйте props когда:**
    - Передаете данные, а не UI
    - Нужен строгий контракт компонента
    - Контент предсказуем и однотипен

### Типизация в TypeScript

```tsx
// Для любого контента
children: React.ReactNode

// Для одного элемента
children: React.ReactElement

// Для функции
children: (props: T) => React.ReactNode

// Для текста
children: string

// Опциональные children
children?: React.ReactNode
```

### Антипаттерны

1. **Избегайте глубокой вложенности компонентов**
   ```tsx
   // ❌ Плохо
   <A><B><C><D><E>Контент</E></D></C></B></A>
   ```

2. **Не злоупотребляйте props forwarding**
   ```tsx
   // ❌ Передача всех props без контроля
   <Component {...props} {...moreProps} {...evenMoreProps} />
   ```

3. **Не используйте индексы как ключи в динамических списках**
   ```tsx
   // ❌ Плохо
   {items.map((item, index) => <Item key={index} />)}
   
   // ✅ Хорошо
   {items.map(item => <Item key={item.id} />)}
   ```

## Практические примеры

### Модальное окно с композицией

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

// Использование
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <h2>Заголовок модального окна</h2>
  <p>Любой контент здесь</p>
  <LoginForm />
</Modal>
```

### Композиция с условным рендерингом

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}
```

## Итоги

1. **Композиция** — основной способ построения UI в React
2. **Children prop** позволяет создавать гибкие компоненты-контейнеры
3. **Props forwarding** помогает создавать специализированные версии компонентов
4. **Принцип единой ответственности** — ключ к хорошей архитектуре
5. **TypeScript** обеспечивает типобезопасность при композиции

Композиция делает компоненты переиспользуемыми, тестируемыми и поддерживаемыми. Это фундаментальный паттерн React-разработки.

## Дополнительные материалы

### Официальная документация React

- [Composition vs Inheritance](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) — почему React предпочитает композицию
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — основы работы с props
- [Children Prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) — передача JSX как children
- [Component Composition](https://react.dev/learn/thinking-in-react) — мышление в React
- [Extracting Components](https://react.dev/learn/your-first-component#when-and-how-to-create-a-component) — когда и как создавать компоненты

### Другое
- [Typing Children](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#typing-component-props) — типизация children prop
- [Component Composition Patterns](https://www.patterns.dev/react/compound-pattern) — каталог паттернов React

### Библиотеки UI для изучения примеров композиции компонентов\
- [Radix UI](https://www.radix-ui.com/) — unstyled компоненты с отличной композицией
- [Headless UI](https://headlessui.com/) — компоненты без стилей от создателей Tailwind
- [Arco Design](https://arco.design/) — дизайн-система с хорошими примерами композиции
- [React Aria](https://react-spectrum.adobe.com/react-aria/) — доступные компоненты от Adobe