Страница интернет-магазина
===

Необходимо создать React-компонент `ShopItemClass` (class-based компонент), с помощью которого мы могли бы реализовывать представление информации о товарах из нашего каталога на сайте в таком виде (компонент обведён пунктирной линией):
![Внешний вид страницы после реализации компонента](./assets/preview.png)

## Пример использования
```jsx
const item = {
  brand: 'Tiger of Sweden',
  title: 'Leonard coat',
  description: 'Minimalistic coat in cotton-blend',
  descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
  price: 399,
  currency: '£'
}

// Внутри компонента App
return (
  <div className="container">
    <div className="background-element">
    </div>
    <div className="highlight-window">
      <div className='highlight-overlay'></div>
    </div>
    <div className="window">
      <ShopItemClass item={item} />
    </div>
  </div>
)
```

## Описание компонента

Компонент должен иметь один props `item`, в котором он ожидает объект с информацией о товаре со следующими свойствами:
- `brand` — название производителя товара;
- `title` — название товара;
- `description` — краткое описание товара;
- `descriptionFull` — подробное описание товара;
- `price` — цена товара;
- `currency` — валюта товара.

Компонент должен создавать DOM элемент следующей структуры:
```html
<div class="main-content">
  <h2>Tiger of Sweden</h2>
  <h1>Leonard coat</h1>
  <h3>Minimalistic coat in cotton-blend</h3>
  <div class="description">
    Men's minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.
  </div>
  <div class="highlight-window mobile"><div class="highlight-overlay"></div></div>
  <div class="divider"></div>
  <div class="purchase-info">
    <div class="price">£399.00</div>
    <button>Добавить в корзину</button>
  </div>
</div>
```

Соответственно название производителя необходимо подставить в `h2`, название товара в `h1`, краткое описание в `h3`, подробное описание в `div.description`, цену и валюту в `div.price`. При этом символ валюты должен следовать перед ценой, а цена должна быть представлена с двумя числами после запятой.

## Реализация

Реализуйте полноценный проект с помощью `vite`

Используйте расположенный в этом каталоге CSS для стилизации.

## Структура проекта

```
my-vite-project/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── components/
│       └── ShopItemClass.jsx
└── node_modules/
```
## Чек-лист самопроверки

### 1. Структура проекта

* [ ] В проекте используется Vite для сборки React-приложения.
* [ ] В папке `src/components/` лежит файл `ShopItemClass.jsx`.
* [ ] Все стили проекта находятся в файле `src/App.css`.

### 2. Компонент ShopItemClass

* [ ] Компонент принимает один проп `item` — объект с полями:

  * `brand` (строка) — название производителя товара
  * `title` (строка) — название товара
  * `description` (строка) — краткое описание товара
  * `descriptionFull` (строка) — подробное описание товара
  * `price` (число) — цена товара
  * `currency` (строка) — символ валюты товара

* [ ] В JSX корректно отображаются все поля объекта `item`:

  * `brand` отображается внутри тега `<h2>`
  * `title` — в `<h1>`
  * `description` — в `<h3>`
  * `descriptionFull` — в `<div className="description">`

* [ ] Цена отображается в блоке `<div className="price">` в формате:

  * Валютный символ стоит перед числом (например, `£399.00`)
  * Цена показана с двумя знаками после запятой (использован метод `toFixed(2)`)

* [ ] Внутри компонента присутствует разметка:

  * `<div className="highlight-window mobile">` с вложенным `<div className="highlight-overlay">`
  * `<div className="divider"></div>`
  * `<div className="purchase-info">`, внутри которого есть цена и кнопка "Добавить в корзину"

* [ ] Разметка и структура DOM полностью соответствуют макету из задания.

### 3. Стилизация

* [ ] Все стили прописаны в `App.css` и корректно применяются к компоненту.
* [ ] Стили не конфликтуют с другими элементами и корректно отображаются на странице.

### 4. Запуск и функциональность

* [ ] Приложение успешно запускается командой `npm run dev` или `yarn dev`.
* [ ] В браузере отображается компонент с данными товара согласно макету.
* [ ] В коде отсутствуют синтаксические ошибки и предупреждения.

### 5. Особенности классового компонента

* [ ] Компонент `ShopItemClass` реализован как **классовый компонент**, а не функциональный (`class` вместо `function`).
* [ ] Компонент **наследуется от `React.Component`** (или `Component`, если используется деструктуризация импорта).
* [ ] Компонент содержит обязательный метод **`render()`**, внутри которого возвращается JSX-разметка.

