import React from 'react';

// Props Forwarding и композиция

// Базовый компонент Message с множеством props
interface MessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  icon?: string;
  position?: string;
  timeout?: number;
  priority?: number;
}

export function Message(props: MessageProps) {
  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`message message-${props.type}`} data-position={props.position}>
      <span className="message-icon">
        {props.icon || iconMap[props.type]}
      </span>
      <span className="message-text">{props.text}</span>
      {props.timeout && (
        <small className="message-timeout">Исчезнет через {props.timeout}с</small>
      )}
      {props.priority && props.priority > 5 && (
        <span className="message-priority">Важное!</span>
      )}
    </div>
  );
}

// ❌ Плохое решение - ручной проброс всех props
interface ErrorMessageBadProps {
  text: string;
  icon?: string;
  position?: string;
  timeout?: number;
  priority?: number;
}

export function ErrorMessageBad(props: ErrorMessageBadProps) {
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

// ✅ Хорошее решение - Props Forwarding с Omit
interface ErrorMessageProps extends Omit<MessageProps, 'type'> {}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <Message
      {...props}
      type="error"
    />
  );
}

// Другие специализированные компоненты
interface SuccessMessageProps extends Omit<MessageProps, 'type'> {}

export function SuccessMessage(props: SuccessMessageProps) {
  return (
    <Message
      {...props}
      type="success"
    />
  );
}

interface WarningMessageProps extends Omit<MessageProps, 'type'> {}

export function WarningMessage(props: WarningMessageProps) {
  return (
    <Message
      {...props}
      type="warning"
    />
  );
}

// Чистый подход к композиции
export function InfoMessage(props: Omit<MessageProps, 'type'>) {
  const messageProps: MessageProps = {
    ...props,
    type: 'info'
  };
  
  return <Message {...messageProps} />;
}

// Демонстрация Props Forwarding
export function PropsForwardingDemo() {
  return (
    <div className="demo-section">
      <h2>Props Forwarding и композиция</h2>
      
      <div className="example">
        <h3>Базовый компонент Message</h3>
        <Message 
          type="info" 
          text="Базовое информационное сообщение" 
          timeout={5}
          priority={3}
        />
      </div>

      <div className="example">
        <h3>Специализированные компоненты</h3>
        <ErrorMessage 
          text="Произошла ошибка!" 
          priority={10}
          timeout={10}
        />
        <SuccessMessage 
          text="Операция выполнена успешно!" 
          icon="🎉"
        />
        <WarningMessage 
          text="Внимание! Проверьте данные" 
          position="top-right"
        />
        <InfoMessage 
          text="Дополнительная информация" 
        />
      </div>

      <div className="example">
        <h3>Порядок spread имеет значение</h3>
        <div className="code-example">
          <code>
            {`// type будет 'info' (из объекта)
<Message type="error" {...{type: 'info', text: 'Сообщение'}} />

// type будет 'error' (переопределяем)
<Message {...{type: 'info', text: 'Сообщение'}} type="error" />`}
          </code>
        </div>
      </div>
    </div>
  );
}