import React from 'react';

// Типизация children в TypeScript

// Базовая типизация
interface ContainerProps {
  children: React.ReactNode; // Может быть string, number, element, array и т.д.
}

export function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

// Ограничение типа children только для кнопок
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

interface ButtonGroupProps {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="button-group">{children}</div>;
}

// Использование PropsWithChildren
type CardProps = React.PropsWithChildren<{
  title: string;
}>;

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Function as children pattern
interface SomeData {
  name: string;
  age: number;
}

interface RenderPropProps {
  children: (data: SomeData) => React.ReactElement;
}

export function DataProvider({ children }: RenderPropProps) {
  const data: SomeData = { name: 'John', age: 30 };
  return <div>{children(data)}</div>;
}

// Демонстрация типизации
export function TypeScriptDemo() {
  const handleClick = () => console.log('Clicked!');

  return (
    <div className="demo-section">
      <h2>Примеры типизации children в TypeScript</h2>
      
      <div className="example">
        <h3>Базовая типизация с React.ReactNode</h3>
        <Container>
          <p>Любой контент может быть здесь</p>
          <span>Текст, числа: {42}</span>
        </Container>
      </div>

      <div className="example">
        <h3>Ограничение типа children</h3>
        <ButtonGroup>
          <Button onClick={handleClick}>Кнопка 1</Button>
          <Button onClick={handleClick}>Кнопка 2</Button>
        </ButtonGroup>
      </div>

      <div className="example">
        <h3>PropsWithChildren</h3>
        <Card title="Заголовок карточки">
          <p>Содержимое карточки</p>
        </Card>
      </div>

      <div className="example">
        <h3>Function as children pattern</h3>
        <DataProvider>
          {(data) => (
            <div>
              <h4>Имя: {data.name}</h4>
              <p>Возраст: {data.age}</p>
            </div>
          )}
        </DataProvider>
      </div>
    </div>
  );
}