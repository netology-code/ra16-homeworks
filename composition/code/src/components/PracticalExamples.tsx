import React, { useState } from 'react';

// Практические примеры из лекции

// 1. Модальное окно с композицией
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

// 2. Композиция с условным рендерингом
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

// 3. Форма входа для демонстрации
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Вход в систему</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
}

// 4. Компонент уведомления
interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  onClose?: () => void;
}

export function Notification({ type, children, onClose }: NotificationProps) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">{icons[type]}</span>
      <div className="notification-content">{children}</div>
      {onClose && (
        <button className="notification-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}

// 5. Список с элементами
interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export function ListItem({ children, onClick, active }: ListItemProps) {
  return (
    <li 
      className={`list-item ${active ? 'active' : ''} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

interface ListProps {
  children: React.ReactNode;
}

export function List({ children }: ListProps) {
  return <ul className="list">{children}</ul>;
}

// Демонстрация практических примеров
export function PracticalExamplesDemo() {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const cardFooter = (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Открыть модальное окно
      </button>
      <button className="btn btn-secondary">
        Отмена
      </button>
    </div>
  );

  const handleItemClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className="demo-section">
      <h2>Практические примеры композиции</h2>

      <div className="example">
        <h3>1. Карточка с условным footer</h3>
        <div className="cards-row">
          <Card title="Карточка без footer">
            <p>Эта карточка не имеет нижнего блока (footer).</p>
          </Card>
          
          <Card title="Карточка с footer" footer={cardFooter}>
            <p>У этой карточки есть нижний блок с кнопками.</p>
          </Card>
        </div>
      </div>

      <div className="example">
        <h3>2. Уведомления разных типов</h3>
        {showNotification && (
          <div className="notifications">
            <Notification 
              type="success" 
              onClose={() => setShowNotification(false)}
            >
              <strong>Успех!</strong> Операция выполнена успешно.
            </Notification>
            
            <Notification type="error">
              <strong>Ошибка!</strong> Что-то пошло не так.
              <p>Проверьте правильность введенных данных.</p>
            </Notification>
            
            <Notification type="warning">
              <strong>Внимание!</strong> Это предупреждение.
            </Notification>
            
            <Notification type="info">
              <strong>Информация:</strong> Дополнительные сведения.
            </Notification>
          </div>
        )}
        
        {!showNotification && (
          <button 
            className="btn" 
            onClick={() => setShowNotification(true)}
          >
            Показать уведомления
          </button>
        )}
      </div>

      <div className="example">
        <h3>3. Интерактивный список</h3>
        <List>
          {['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'].map((item, index) => (
            <ListItem 
              key={index}
              onClick={() => handleItemClick(index)}
              active={activeItem === index}
            >
              <div>
                <strong>{item}</strong>
                {activeItem === index && (
                  <div className="item-details">
                    <p>Дополнительная информация для {item}</p>
                    <small>Нажмите еще раз, чтобы скрыть</small>
                  </div>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </div>

      <div className="example">
        <h3>4. Модальное окно</h3>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h2>Заголовок модального окна</h2>
          <p>Любой контент может быть размещен в модальном окне благодаря композиции.</p>
          <LoginForm />
        </Modal>
      </div>

      <div className="best-practices">
        <h3>Best Practices:</h3>
        <div className="practice-grid">
          <div className="practice-card">
            <h4>Используйте children когда:</h4>
            <ul>
              <li>Контент заранее неизвестен</li>
              <li>Нужна гибкость в размещении</li>
              <li>Создаете контейнеры</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h4>Используйте props когда:</h4>
            <ul>
              <li>Передаете данные, а не UI</li>
              <li>Нужен строгий контракт</li>
              <li>Контент предсказуем</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}