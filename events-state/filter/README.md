Портфолио с фильтрами
===
## 1. Описание задания
Вам предстоит создать веб-приложение для отображения портфолио проектов с возможностью их фильтрации по категориям. Основная цель — отработать навыки управления состоянием и взаимодействия компонентов в React. Приложение должно быть реализовано как набор компонентов с чётким разделением ответственности между ними. Внешний вид и функциональность должны соответствовать макету на изображении:

![portfolio-all](./assets/portfolio-all.png)

## 2. Состав компонентов
Архитектура приложения должна состоять из трёх компонентов:

- **Portfolio (компонент с состоянием):** главный компонент, который управляет логикой всего приложения. Он хранит в себе состояние (активный фильтр) и передаёт данные и функции дочерним компонентам.

- **Toolbar (компонент без состояния):** отвечает за отображение панели с кнопками-фильтрами. Получает список фильтров, информацию о выбранном фильтре и функцию для обработки клика.

- **ProjectList (компонент без состояния):** отвечает исключительно за отображение списка карточек проектов, которые он получает от родительского компонента.

## 3. Функциональные требования
**1. Инициализация:**

- Компонент `Portfolio` при инициализации содержит полный список проектов и устанавливает фильтр по умолчанию в `"All"`.

**2. Взаимодействие `Portfolio` и `Toolbar`:**

- `Portfolio` передаёт в `Toolbar` список уникальных категорий для фильтров через пропс `filters`.

- `Portfolio` передаёт в `Toolbar` текущий активный фильтр через пропс `selected`.

- `Portfolio` передаёт в `Toolbar` функцию-обработчик для смены фильтра через пропс `onSelectFilter`.  

Пример использования компонента `Toolbar`:
```
<Toolbar
  filters={["All", "Websites", "Flayers", "Business Cards"]}
  selected="All"
  onSelectFilter={(filter) => {console.log(filter);}}/>
```

В этом примере при выборе фильтра его название будет выведено в консоль. Например, «Business Cards».

**3. Обработка действий пользователя:**

- При нажатии на кнопку фильтра в `Toolbar` вызывается переданный обработчик `onSelectFilter`, который получает в качестве аргумента название выбранной категории (например, "Websites").

- В `Toolbar` активный фильтр должен визуально выделяться (например, другим цветом фона или текста).

**4. Управление состоянием:**

- Получив новый фильтр, `Portfolio` обновляет своё внутреннее состояние (`state`), сохраняя новое значение активного фильтра.

**5. Фильтрация и отображение проектов:**

- Компонент `Portfolio` фильтрует общий список проектов в соответствии с активным фильтром из своего состояния.

- Отфильтрованный список проектов передаётся в компонент `ProjectList` через пропс `projects`.

- `ProjectList` отображает полученный список проектов.

Пример:
![portfolio-cards.png](./assets/portfolio-cards.png)

## 4. Требования к коду
- Компонент `Portfolio` должен быть реализован как классовый компонент для управления состоянием.

- Компоненты `Toolbar` и `ProjectList` должны быть функциональными (stateless) компонентами.

- Для передачи данных от родителя к дочерним компонентам используйте пропсы (props).

- Для передачи данных от дочернего компонента (`Toolbar`) к родителю (`Portfolio`) используйте механизм обратного вызова (callback function).

<details> <summary>Набор данных для отображения</summary>
  
```js
  [{
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/mon.jpg",
  category: "Business Cards"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/200.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/emi_haze.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/codystretch.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_003.jpg",
  category: "Business Cards"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290.png",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/200.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/transmission.jpg",
  category: "Business Cards"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_1.png",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_2.png",
  category: "Flayers"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/the_ninetys_brand.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/dia.jpg",
  category: "Business Cards"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_350x197.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/emi_haze.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/transmission.jpg",
  category: "Business Cards"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_350x197_1.jpg",
  category: "Websites"
}, {
  img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_3.png",
  category: "Flayers"
}]
```

</details>

## 5. Критерии оценивания
**Зачёт:**

- Приложение полностью разделено на три компонента (`Portfolio`, `Toolbar`, `ProjectList`).

- Состояние (state) хранится и изменяется только в главном компоненте `Portfolio`.

- Данные и функции-обработчики корректно передаются через пропсы.

- Фильтрация проектов работает при клике на кнопки, список обновляется.

- Активный фильтр визуально выделен.

**На доработку:**

- Архитектура приложения не соответствует заданию (неверное количество или иерархия компонентов).

- Обнаружены ошибки в управлении состоянием (например, state используется в `Toolbar` или `ProjectList`).

- Приложение не реагирует на действия пользователя или работает с ошибками.

- Внешний вид не соответствует макету (например, активный фильтр не выделен).
