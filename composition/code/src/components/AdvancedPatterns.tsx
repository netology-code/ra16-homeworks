import React, { useState, createContext, useContext } from 'react';

// Продвинутые паттерны композиции

// 1. Compound Components Pattern
interface SelectContextType {
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

function Select({ children, onValueChange, defaultValue = '' }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  return (
    <SelectContext.Provider value={{ selectedValue, onSelect: handleSelect }}>
      <div className="select-container">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
}

function SelectOption({ value, children }: SelectOptionProps) {
  const context = useContext(SelectContext);
  
  if (!context) {
    throw new Error('SelectOption must be used within Select');
  }

  const { selectedValue, onSelect } = context;
  const isSelected = selectedValue === value;

  return (
    <div 
      className={`select-option ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}

// Добавляем компоненты как свойства
Select.Option = SelectOption;

// 2. Slots Pattern
interface CardSlotProps {
  children: React.ReactNode;
}

function CardHeader({ children }: CardSlotProps) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }: CardSlotProps) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: CardSlotProps) {
  return <div className="card-footer">{children}</div>;
}

interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

// Добавляем слоты как свойства
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// 3. Render Props Pattern
interface DataProviderProps {
  children: (data: { items: string[], loading: boolean }) => React.ReactNode;
}

function DataProvider({ children }: DataProviderProps) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<string[]>([]);

  React.useEffect(() => {
    // Симуляция загрузки данных
    const timer = setTimeout(() => {
      setItems(['Элемент 1', 'Элемент 2', 'Элемент 3']);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <>{children({ items, loading })}</>;
}

interface DataDisplayProps {
  items: string[];
}

function DataDisplay({ items }: DataDisplayProps) {
  return (
    <ul className="data-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// 4. Higher-Order Component (HOC) для композиции
interface WithLoadingProps {
  isLoading?: boolean;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, ...componentProps } = props;
    
    if (isLoading) {
      return <div className="loading">Загрузка...</div>;
    }

    return <Component {...(componentProps as P)} />;
  };
}

// Компонент с HOC
interface UserListProps {
  users: string[];
}

function UserList({ users }: UserListProps) {
  return (
    <div>
      <h4>Список пользователей</h4>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

const UserListWithLoading = withLoading(UserList);

// Демонстрация всех паттернов
export function AdvancedPatternsDemo() {
  const [loading, setLoading] = useState(false);
  const users = ['Анна', 'Борис', 'Виктор'];

  const handleSelectChange = (value: string) => {
    console.log('Выбрано:', value);
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  return (
    <div className="demo-section">
      <h2>Продвинутые паттерны композиции</h2>

      <div className="example">
        <h3>1. Compound Components Pattern</h3>
        <Select onValueChange={handleSelectChange} defaultValue="2">
          <SelectOption value="1">Опция 1</SelectOption>
          <SelectOption value="2">Опция 2</SelectOption>
          <SelectOption value="3">Опция 3</SelectOption>
        </Select>
      </div>

      <div className="example">
        <h3>2. Slots Pattern</h3>
        <Card>
          <Card.Header>
            <h4>Заголовок карточки</h4>
          </Card.Header>
          <Card.Body>
            <p>Основной контент карточки располагается здесь.</p>
            <p>Можно добавить любое количество элементов.</p>
          </Card.Body>
          <Card.Footer>
            <button className="btn">Действие</button>
            <button className="btn btn-secondary">Отмена</button>
          </Card.Footer>
        </Card>
      </div>

      <div className="example">
        <h3>3. Render Props Pattern</h3>
        <DataProvider>
          {({ items, loading }) => 
            loading ? (
              <div>Загрузка данных...</div>
            ) : (
              <DataDisplay items={items} />
            )
          }
        </DataProvider>
      </div>

      <div className="example">
        <h3>4. Higher-Order Component (HOC)</h3>
        <button className="btn" onClick={toggleLoading}>
          {loading ? 'Остановить загрузку' : 'Начать загрузку'}
        </button>
        <UserListWithLoading users={users} isLoading={loading} />
      </div>

      <div className="pattern-explanation">
        <h3>Объяснение паттернов:</h3>
        <ul>
          <li><strong>Compound Components:</strong> Группа компонентов, работающих вместе через контекст</li>
          <li><strong>Slots:</strong> Именованные области для размещения контента</li>
          <li><strong>Render Props:</strong> Передача функции рендеринга для гибкого управления отображением</li>
          <li><strong>HOC:</strong> Функция высшего порядка для добавления логики к компонентам</li>
        </ul>
      </div>
    </div>
  );
}