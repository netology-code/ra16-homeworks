import React from 'react';

// Пример: Sidebar с виджетами - Принцип единой ответственности (SRP)

// Универсальный виджет
interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <div className="widget">
      <h5 className="widget-title">{title}</h5>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}

// Контейнер для виджетов
interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return <aside className="sidebar">{children}</aside>;
}

// Компонент для списка тегов
interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="tag-block">
      {tags.map((tag, index) => (
        <button key={index} className="btn tag-btn">
          {tag}
        </button>
      ))}
    </div>
  );
}

// Компонент для социальных ссылок
interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="social-block">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Виджет новостей
interface NewsItem {
  title: string;
  url: string;
  date: string;
}

interface NewsWidgetProps {
  news: NewsItem[];
}

export function NewsWidget({ news }: NewsWidgetProps) {
  return (
    <ul className="news-list">
      {news.map((item, index) => (
        <li key={index} className="news-item">
          <a href={item.url}>{item.title}</a>
          <small className="news-date">{item.date}</small>
        </li>
      ))}
    </ul>
  );
}

// Демонстрация использования
export function SidebarDemo() {
  const tags = ['JavaScript', 'React', 'Node.js', 'TypeScript'];
  
  const socialData: SocialLink[] = [
    { name: 'VK', url: 'https://vk.com' },
    { name: 'Email', url: 'mailto:example@mail.ru' },
    { name: 'Telegram', url: 'https://t.me' }
  ];

  const newsData: NewsItem[] = [
    { 
      title: 'Релиз React 19', 
      url: '/news/react-19', 
      date: '2024-01-15' 
    },
    { 
      title: 'Новые возможности TypeScript', 
      url: '/news/typescript-new', 
      date: '2024-01-10' 
    },
    { 
      title: 'Обзор Vite 5.0', 
      url: '/news/vite-5', 
      date: '2024-01-05' 
    }
  ];

  return (
    <div className="demo-section">
      <h2>Пример композиции: Sidebar с виджетами</h2>
      
      <div className="layout-demo">
        <main className="main-content">
          <h3>Основной контент</h3>
          <p>Здесь располагается основное содержимое страницы...</p>
        </main>

        <Sidebar>
          <Widget title="Теги">
            <TagList tags={tags} />
          </Widget>
          
          <Widget title="Социальные сети">
            <SocialLinks links={socialData} />
          </Widget>
          
          <Widget title="Последние новости">
            <NewsWidget news={newsData} />
          </Widget>

          <Widget title="Произвольный контент">
            <div>
              <p>В виджет можно поместить любой контент:</p>
              <img 
                src="https://via.placeholder.com/150x100" 
                alt="Пример изображения"
                style={{ width: '100%', height: 'auto' }}
              />
              <button className="btn">Кнопка действия</button>
            </div>
          </Widget>
        </Sidebar>
      </div>

      <div className="code-explanation">
        <h3>Исходная разметка без компонентов:</h3>
        <pre className="code-block">
{`<aside>
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
</aside>`}
        </pre>
      </div>
    </div>
  );
}