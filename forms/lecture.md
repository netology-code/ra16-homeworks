# Работа с формами в React

## Цели занятия

- Изучить подходы к обработке форм в React
- Освоить работу с контролируемыми компонентами
- Понять применение неконтролируемых компонентов
- Научиться использовать useRef для работы с DOM

## План занятия

1. Контролируемые компоненты
2. Неконтролируемые компоненты
3. Совмещение подходов

## 1. Введение в формы React

### Отличия от HTML

HTML-формы — стандартные элементы для сбора данных от пользователей. В React они работают иначе, чем в обычном HTML, из-за особенностей обработки событий и управления состоянием.

### Пример HTML-формы

```html
<!-- Традиционная HTML-форма -->
<form action="/submit" method="POST">
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Отправить</button>
</form>

<script>
  // Обработка в JavaScript
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
  });
</script>
```

### Базовая форма в React

```tsx
export function Feedback() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Ваше имя</label>
      <input id="name" name="name" />

      <label htmlFor="score">Выберите уровень удовлетворенности</label>
      <select id="score" name="score">
        <option value="good">Хорошо</option>
        <option value="bad">Не очень</option>
      </select>

      <input type="checkbox" id="agreement" name="agreement" />
      <label htmlFor="agreement">Согласен на передачу данных</label>

      <button type="submit">Отправить</button>
    </form>
  );
}
```

## 2. Контролируемые компоненты

### Определение

В контролируемых компонентах React является "единственным источником истины" для значений формы. Состояние формы хранится в компоненте через `useState` и обновляется только через функцию-сеттер.

### Ключевые отличия

- **HTML**: элементы формы сами управляют своим состоянием
- **React**: явный контроль через `value` и `onChange`

### Пример контролируемой формы

```tsx
import { useState } from 'react';

interface FeedbackData {
  name: string;
  score: string;
  agreement: boolean;
}

export function FeedbackControlled() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    score: 'good',
    agreement: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Отправка данных на сервер
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Ваше имя</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="score">Уровень удовлетворенности</label>
        <select
          id="score"
          name="score"
          value={formData.score}
          onChange={handleChange}
        >
          <option value="good">Хорошо</option>
          <option value="neutral">Нейтрально</option>
          <option value="bad">Плохо</option>
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
        />
        <label htmlFor="agreement">
          Согласен на обработку данных
        </label>
      </div>

      <button
        type="submit"
        disabled={!formData.name || !formData.agreement}
      >
        Отправить
      </button>
    </form>
  );
}
```

### Преимущества контролируемых компонентов

- **Валидация в реальном времени** — проверка данных при каждом изменении
- **Условная логика** — динамическое отображение полей
- **Форматирование ввода** — маски телефона, автоформатирование
- **Состояние синхронизировано** — единый источник истины

### Пример с валидацией

```tsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setError('Email обязателен');
    } else if (!emailRegex.test(value)) {
      setError('Некорректный email');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        className={error ? 'error' : ''}
        placeholder="example@mail.com"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
```

## 3. Неконтролируемые компоненты

### Определение

DOM-элемент сам управляет своим состоянием (как в обычном HTML). React получает значения через `ref` когда это необходимо.

### Когда использовать

- **Файловый input** — `<input type="file">` всегда неконтролируемый
- **Интеграция с не-React библиотеками** — jQuery плагины, сторонние виджеты
- **Простые формы** — когда не нужна валидация в реальном времени

### useRef

```tsx
import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    };

    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Имя" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Ключевые особенности useRef

- Возвращает мутабельный объект `{ current: ... }`
- Сохраняется на протяжении всего жизненного цикла компонента
- Изменение `ref.current` НЕ вызывает ре-рендер
- React-способ работы с DOM вместо `document.querySelector()`

### Работа с файлами

```tsx
import { useRef, useState } from 'react';

export function FileUploader() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = () => {
    const files = fileRef.current?.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setSelectedFiles(fileNames);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      const formData = new FormData();

      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      // Отправка файлов на сервер
      console.log('Uploading files:', selectedFiles);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fileInput">Выберите файлы</label>
      <input
        type="file"
        id="fileInput"
        ref={fileRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*,.pdf"
      />

      {selectedFiles.length > 0 && (
        <div>
          <h4>Выбранные файлы:</h4>
          <ul>
            {selectedFiles.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" disabled={selectedFiles.length === 0}>
        Загрузить
      </button>
    </form>
  );
}
```

### Управление фокусом и медиа

```tsx
function MediaPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const focusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  return (
    <div>
      <video ref={videoRef} src="video.mp4" />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>

      <input ref={inputRef} type="text" placeholder="Нажмите кнопку для фокуса" />
      <button onClick={focusInput}>Фокус на поле</button>
    </div>
  );
}
```

## 4. Совмещение подходов

### Гибридная форма

Комбинирование контролируемых и неконтролируемых компонентов в одной форме.

```tsx
import { useState, useRef } from 'react';

interface ProfileData {
  name: string;
  bio: string;
  avatar: File | null;
}

function ProfileForm() {
  // Контролируемые поля
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  // Неконтролируемое поле для файла
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleAvatarChange = () => {
    const file = avatarRef.current?.files?.[0];
    if (file) {
      // Создаем превью для отображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);

    const avatarFile = avatarRef.current?.files?.[0];
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    // Отправка на сервер
    console.log('Submitting profile...');

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="bio">О себе</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          maxLength={200}
        />
        <span>{bio.length}/200</span>
      </div>

      <div>
        <label htmlFor="avatar">Аватар</label>
        <input
          id="avatar"
          type="file"
          ref={avatarRef}
          onChange={handleAvatarChange}
          accept="image/*"
        />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
        )}
      </div>

      <button type="submit" disabled={!name}>
        Сохранить профиль
      </button>
    </form>
  );
}
```

## 5. Рекомендации по выбору подхода

### Используйте контролируемые компоненты когда:

- Нужна валидация в реальном времени
- Требуется форматирование ввода
- Поля зависят друг от друга
- Нужно отслеживать изменения для аналитики
- Требуется сложная бизнес-логика

### Используйте неконтролируемые компоненты когда:

- Работаете с файлами
- Интегрируетесь со сторонними библиотеками
- Нужен прямой доступ к DOM (фокус, скролл)
- Форма простая и не требует валидации
- Производительность критична (большие формы)

## Итоги

### Ключевые концепции

1. **Контролируемые компоненты** — основной способ работы с формами в React. Значение всегда синхронизировано с state.

2. **Неконтролируемые компоненты** — для особых случаев: файлы, медиа-элементы, управление фокусом.

3. **useRef** — сохраняет мутабельное значение между рендерами, но не вызывает ре-рендер при изменении.

4. **Гибридный подход** — комбинирование обоих подходов в сложных формах.

5. **Философия React** — декларативный подход предпочтительнее императивного. Используйте ref только когда декларативный подход невозможен.

### Практические навыки

- Создание контролируемых форм с валидацией
- Работа с файловыми input через ref
- Управление фокусом и медиа-элементами
- Комбинирование подходов в сложных формах
- Правильный выбор между контролируемыми и неконтролируемыми компонентами

## Дополнительные материалы

### Официальная документация React

- [Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) — управление input через state
- [Uncontrolled Components](https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form) — чтение значений при отправке формы
- [useRef Hook](https://react.dev/reference/react/useRef) — работа с мутабельными значениями и DOM
- [File Input](https://react.dev/reference/react-dom/components/input#file-input) — особенности работы с файлами
- [Form Validation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) — подходы к валидации

### Библиотеки для работы с формами

- [React Hook Form](https://react-hook-form.com/) — производительная библиотека с минимальными ре-рендерами
- [Formik](https://formik.org/) — популярная библиотека с богатым функционалом
- [React Final Form](https://final-form.org/react) — модульная библиотека для сложных форм
- [Zod](https://zod.dev/) — валидация схем с TypeScript