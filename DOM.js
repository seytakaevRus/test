const body = document.body;
const head = document.head;

//? DOM - объектная модель документа, которая представляет все содержимое страницы в виде объектов, который можно менять.
//? Если браузер сталкивается с некорректно написанным HTML-кодом, он автоматически корректирует его при построении DOM.

//| Типы узлов в DOM
//? 1. 1 = Узел элемента (body, head, el, ...).
// console.log(body.nodeType);
//? 2. 3 = Узел текста ('Лось', ...).
// console.log(body.firstChild.nodeType);
//? 3. 7 = Узел обработки инструкции (<?xml version="1.0"?>)
//? Правда поддерживается только в файлах формата XML, в HTML будет как комментарий.
// console.log(body.childNodes[1].nodeType);
//? 4. 8 = Комментарий.
// console.log(body.childNodes[1].nodeType);
//? 5. 9 = Узел документа, тега html.
// console.log(document.nodeType);
//? 6. 10 = Узел типа документа, хранится в document.doctype.
// console.log(document.doctype.nodeType);
//? 7. 11 = Узел фрагмента документа.
// const fragment = new DocumentFragment();
// console.log(fragment.nodeType);

//| Навигация по DOM-элементам
//? document - главная точка входа.
//? 1. Получить html.
// console.log(document.documentElement);
//? 2. Получить body.
// console.log(body);
//? 3. Получить head.
// console.log(head);

//|| Получение дочерних узлов
//! Если в название метода есть Element, значит он точно вернёт DOM-элемент, а не какой-нибудь текст, комментарий и т.д.
//? Дочерние узлы или дети - узлы, которые непосредственно вложены в элемент.
//? Потомки - все узлы, которые вложены в данный элемент.

//? Получения списка всех детей узла.
// console.log(body.childNodes);
//? Получает DOM-элементы узла.
// console.log(body.children);
//? Получения первого и последнего ребёнка у узла.
// console.log(body.firstChild, body.lastChild, body.firstElementChild);

//|| Получение родителя и соседних узлов
//? Соседи - узлы, у которых один и тот же родитель.
// console.log(head.nextSibling);
// console.log(head.nextElementSibling);
// console.log(body.previousSibling);
// console.log(body.parentNode);
// console.log(body.parentElement);

//| Поиск DOM-элементов
//? 1. Поиск по id
//? 1.1 id должно быть уникальным в пределах документа;
//? 1.2 Метод должен применяться только к документу;
// console.log(document.getElementById("myLi"));
//? 2. Поиск по селекторам.
//? 2.1 Нахождение всех элементов.
// console.log(body.querySelectorAll("li"));
//? 2.2 Нахождение первого элемента.
// console.log(body.querySelector("li"));
//? 3. Удовлетворяет ли элемент переданному селектору.
//? 3.1 Возвращает true или false.
//? 3.2 Начинает поиск с себя.
// console.log(body.matches("body#duck"));
//? 4. Возвращение ближайшего родителя, который удовлетворяет селектору.
//? 4.1 Возвращает null или элемент.
//? 4.2 Начинает поиск с себя.
// console.log(body.querySelector("li").closest("body"));
//? 5. Получить по тегу, классу или атрибуту name
//? 5.1 Методы возвращаю живую коллекцию, хранит текущее состояние документа и обновляются автоматически при его изменении.
// console.log(document.getElementsByClassName("red"));
// console.log(document.getElementsByTagName("li"));
//? Используется только с document.
// console.log(document.getElementsByName("LI"));
