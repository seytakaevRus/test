//| Методы у инстансов класса Object:
//? 1. prototype.hasOwnProperty();
//? 2. prototype.isPrototypeOf();
//? 3. prototype.propertyIsEnumerable();
//? 4. prototype.toLocaleString();
//? 5. prototype.toString();
//? 6. prototype.valueOf().
//| Остальные методы являются статичными класса Object.

//| prototype.constructor
//? Возвращает ссылку на класс (функцию-конструктор), с помощью которого был создан данный объект.
//? Все объекту (кроме Object.create(null)) имеют это свойство.
// const a = {};
// console.log(a.constructor === Object);
// const b = new Object();
// console.log(b.constructor === Object);
// const c = [];
// console.log(c.constructor === Array);
// const d = new Array();
// console.log(d.constructor === Array);
// const e = Object.create(null);
// console.log(e.constructor);

//| Дескрипторы
// 1. Дескриптор данных - свойство, имеющее значение ({name: 'name'});
// 2. Дескриптор доступа - свойство, которое описывается парой set и get значений.
//! Одновременно свойство у объекта не может и свойством-доступа и свойством-данным.
//| Дескриптор данных и доступа могут иметь:
//? configurable - если true, свойство можно удалить, а эти дескрипторы можно изменять, иначе этого делать нельзя (доступно для изменения останутся лишь writable и value).
//? enumerable - если true, то может забираться Object.assign() и ... оператором, если же не является Symbol, то показывается в цикле for..in и Object.keys().
//| Дескриптор данных также может иметь:
//? value - значения свойства, может быть любым валидным JS свойством.
//? writable - если true, свойство можно изменить, иначе оно только для чтения.
//| Дескриптор доступа также может иметь:
//? set - функция, которая вызывается, когда свойству присваивается какое-то значения, в качестве аргумента принимает значение.
//? get - функция, которая вызывается, когда свойство пытаются прочитать.
//! Если в Object.defineProperty или Object.defineProperties не передать дескрипторы, то:
//? 1. configurable = false;
//? 2. enumerable = false;
//? 3. value = undefined;
//? 4. writable = false;
//? 5. set = undefined;
//? 6. get = undefined;
//! Важно понимать, что ниже записи идентичны.
// const obj1 = {};

// obj1.a = 5;

// Object.defineProperty(obj1, "a", {
//   value: 5,
//   enumerable: true,
//   writable: true,

//| Прототипное наследование
// const User = function ({ name, surname }) {
//   this.name = name;
//   this.surname = surname;
// };

// User.prototype.greeting = function () {
//   console.log(`Hello, ${this.name}.`);
// };

// const Guest = function ({ role }) {
//   this.role = role;
// };

// Guest.prototype.__proto__ = User.prototype;

// const user = new User({ name: "Ruslan", surname: "Seit-Akaev" });
// // console.log(user);
// user.greeting();

// const guest = new Guest({ name: "Vasya", surname: "Petrov", role: "guest" });
// console.log(guest);
// guest.name = 'B='
// guest.greeting();

//| Object.assign(target, ...source)
//? Копирует все перечисляемые свойства у объекта, только у него, не лезет в прототипы, с source в target объект.
//? Похожие свойства в source перезаписывают свойства в target.
//! Модифицирует target и возвращает его.
// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5, b: 3 };
// const newTarget = Object.assign(target, source);
// console.log(newTarget, target);
// console.log(target === newTarget);
//? Вместо target может быть {}.
// const obj = { a: 1 };
// const copy = Object.assign({}, obj);
// console.log(copy);
//? Копирует поверхностно, а значит ссылки на объекты будут также скопированы.
// const obj1 = { a: "a", b: 1, c: { c: 1 } };
// const obj2 = Object.assign({}, obj1);

// obj2.a = "A";
// console.log(obj1);
// console.log(obj2);

// obj2.c.c = "CCCC";
// console.log(obj1);
// console.log(obj2);
//? Чтобы сделать глубокое копирование, можно использовать JSON.
// const obj1 = { a: "a", b: 1, c: { c: 1 } };
// const obj2 = JSON.parse(JSON.stringify(obj1));

// obj2.a = "A";
// console.log(obj1);
// console.log(obj2);

// obj2.c.c = "CCCC";
// console.log(obj1);
// console.log(obj2);
//? Копирует также get, set функции и Symbol, если они перечисляемые.
// const obj1 = {
//   get a() {
//     return "1";
//   },
//   set a(value) {
//     console.log(value);
//   },
//   [Symbol("foo")]: "foo",
// };

// const obj2 = Object.assign({}, obj1);
// console.log(obj2);
// console.log(obj2.a);
// console.log((obj2.a = 555));

//| Object.defineProperty(obj, propertyName, descriptor)
//? Создаёт свойство и непереданные дескрипторы становятся в false или undefined.
//! Модифицирует obj и возвращает его.
// const object1 = {};
// Object.defineProperty(object1, "property1", {
//   value: 42,
// });

// console.log(object1);
//? Если свойство есть, то просто модифицирует переданный дескриптор.

//| Object.defineProperties(obj, props)
//? Делает тоже самое, что и Object.defineProperty, только для нескольких свойств.
// const obj = {};
// Object.defineProperties(obj, {
//   property1: {
//     value: true,
//     writable: true,
//   },
//   property2: {
//     value: "Hello",
//     writable: false,
//   },
// });
// console.log(obj);

//| Object.entries(obj)
//? Возвращает массив, где каждый элемент это пара вида [ключ, значение].
//! Работает только со свойствами, у которых enumerable равняется true.
// const obj = {};
// Object.defineProperties(obj, {
//   property1: {
//     value: true,
//     writable: true,
//     enumerable: true,
//   },
//   property2: {
//     value: "Hello",
//     writable: false,
//   },
// });
// obj.property3 = "Hi";
// console.log(obj);
// console.log(Object.entries(obj));

//| Object.fromEntries(entries)
//? Преобразует массив из пар [ключ, значения] в объект.
//? Также может преобразовать инстанс Map в объект.
// const myEntries = [
//   ["foo", "foo"],
//   ["bar", "bar"],
// ];
// const obj = Object.fromEntries(myEntries);
// console.log(obj);
//? Можно делать подобные вещи.
// const object1 = { a: 1, b: 2, c: 3 };
// const object2 = Object.fromEntries(
//   Object.entries(object1).map(([key, value]) => [key, value * 2])
// );
// console.log(object2);

//| Object.keys(obj)
//? Возвращает массив из ключей obj.
//! Работает только со свойствами, у которых enumerable равняется true.
// const obj = {};
// Object.defineProperties(obj, {
//   property1: {
//     value: true,
//     writable: true,
//     enumerable: true,
//   },
//   property2: {
//     value: "Hello",
//     writable: false,
//   },
// });
// obj.property3 = "Hi";
// console.log(obj);
// console.log(Object.keys(obj));

//| Object.values(obj)
//? Возвращает массив из значений obj.
//! Работает только со свойствами, у которых enumerable равняется true.
// const obj = {};
// Object.defineProperties(obj, {
//   property1: {
//     value: true,
//     writable: true,
//     enumerable: true,
//   },
//   property2: {
//     value: "Hello",
//     writable: false,
//   },
// });
// obj.property3 = "Hi";
// console.log(obj);
// console.log(Object.values(obj));

//| prototype.propertyIsEnumerable(propertyName)
//? Проверяет, является ли свойство перечисляемым.
//? Возвращает true или false.
//? Если этого свойства нет у самого объекта, то возвращается false, то есть в прототипы он не смотрит.
// const obj = { a: "1" };
// const obj2 = Object.create(obj);
// console.log(obj.propertyIsEnumerable("a"));
// console.log(obj.propertyIsEnumerable("b"));

//| prototype.toString()
//? Отвечает за преобразование объекта в примитив.
//? По умолчанию объект в превращается в [object Object].
// console.log({ a: 'a' }.toString());
//? Обычно вызывается при преобразовании объекта в примитив:
//? 1. Явно, используя String().
//? 2. Неявно, используя интерполяцию, оператор '+'
//? Может быть перезаписано.
// const obj = {
//   name: 'Gabby',
//   breed: 'Lab',
//   color: 'chocolate',
//   sex: 'female',
// };

// obj.toString = function () {
//   return 'Dog ' + this.name + ' is a ' + this.sex + ' ' + this.color + ' ' + this.breed;
// };

// console.log(obj + '');
// console.log(String(obj));

//| prototype.valueOf()
//? Отвечает за преобразование объекта в примитив.
//? По умолчанию просто возвращает
// console.log({ a: 'a' }.valueOf());
//? Обычно вызывается при преобразовании объекта в примитив:
//? 1. Явно, используя Number().
//? 2. Неявно, оператор '+', '>'.
// const obj = {
//   name: 'Gabby',
//   breed: 'Lab',
//   color: 'chocolate',
//   sex: 'female',
// };

// obj.valueOf = function () {
//   return 4;
// };

// console.log(obj.valueOf());
// console.log(Number(obj));
// console.log(obj + 4);

//| Object.preventExtensions(obj)
//? 1. Запрещает добавлять новые свойства в объект.
//! Изменяет переданный объект и возвращает его.
// const obj = { a: 'a' };
// console.log(Object.preventExtensions(obj));
//? Не могу добавить новое свойство.
// obj.b = 'b';
// console.log(obj);
//? Также нельзя изменить прототип у non-extensible объекта.
// Object.setPrototypeOf(obj, { b: 'b' });
//? Удалять всё ещё можно.
// delete obj.a;
// console.log(obj);

//| Object.isExtensible()
//? Может ли объект расширяться или нет.
//? Возвращает true или false.
// const obj = { a: 'a' };
// console.log(Object.isExtensible(obj));
// Object.preventExtensions(obj);
// console.log(Object.isExtensible(obj));

//| Object.seal(obj)
//? 1. Делает preventExtensions;
//? 2. Помечает существующим свойствам configurable помечается как false.
//! Изменяет переданный объект и возвращает его.
// const obj = { a: 'a' };
// console.log(Object.seal(obj));
//? configurable ставится в false.
// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
//? Поэтому свойство нельзя удалить.
// delete obj.a;
// console.log(obj);
//? И изменить дескрипторы нельзя, кроме value и writable
// Object.defineProperty(obj, 'a', {
//   writable: false,
// });

//| Object.isSealed(obj)
//? Запечатан ли объект?
//? Возвращает true или false.
// const obj = { a: 'a' };
// console.log(Object.isSealed(obj));
// Object.seal(obj);
// console.log(Object.isSealed(obj));

//| Object.freeze(obj)
//? 1. Делает preventExtensions;
//? 2. Делает seal.
//? 3. Также выставляет writable в false
//! Изменяет переданный объект и возвращает его.
// const obj = { a: 'a' };
// console.log(Object.freeze(obj));
//? writable становится в false.
// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
//? Поэтому свойство нельзя изменить.
// obj.a = 42;
// console.log(obj);

//| Object.isFrozen(obj)
//? Заморожен ли объект?
//? Возвращает true или false.
// const obj = { a: 'a' };
// console.log(Object.isFrozen(obj));
// Object.freeze(obj);
// console.log(Object.isFrozen(obj));

//? Чтобы isSealed или isFrozen возвращали true не обязательно использовать соответствующие методы.

//? Чтобы isSealed выдавал true, достаточно:
//? 1. Object.Сделать preventExtensions();
//? 2. Поставить всем свойствам объекта configurable в false.
// const obj = { b: 'b' };
// console.log(Object.isSealed(obj));
// Object.preventExtensions(obj);
// Object.defineProperty(obj, 'b', {
//   configurable: false,
// });
// console.log(Object.isSealed(obj));
// console.log(Object.getOwnPropertyDescriptor(obj, 'b'));

//? Чтобы isFrozen выдавал true, достаточно:
//? 1. Object.Сделать preventExtensions();
//? 2. Поставить всем свойствам объекта configurable в false.
//? 3. Поставить всем свойствам объекта writable в false.
// const obj = { b: 'b' };
// console.log(Object.isFrozen(obj));
// Object.preventExtensions(obj);
// Object.defineProperty(obj, 'b', {
//   configurable: false,
//   writable: false,
// });
// console.log(Object.isFrozen(obj));
// console.log(Object.getOwnPropertyDescriptor(obj, 'b'));

//| Object.getOwnPropertyDescriptor(obj, propName)
//? Возвращает конфигурацию свойства propName у obj.
// const object = {
//   [Symbol.for('foo')]: 'foo',
// };
// console.log(Object.getOwnPropertyDescriptor(object, Symbol.for('foo')));

//| Object.getOwnPropertyDescriptors(obj)
//? Возвращает конфигурацию всех свойств у obj.
// const object = {
//   [Symbol.for('foo')]: 'foo',
//   a: 'a',
// };
// console.log(Object.getOwnPropertyDescriptors(object));

//| Object.getOwnPropertyNames(obj)
//? Возвращает массив, состоящих из свойств obj, не важно перечисляемые они или нет, не показывает Symbol.
// const obj = {};

// obj.a = 'a';
// Object.defineProperty(obj, 'b', {
//   value: 'b',
// });
// obj[Symbol.for('c')] = 'c';

// console.log(Object.getOwnPropertyNames(obj));

//| Object.getOwnPropertySymbols(obj)
//? Возвращает массив свойств obj, которые были созданы с помощью Symbol.
// const obj = {};

// obj.a = 'a';
// Object.defineProperty(obj, 'b', {
//   value: 'b',
// });
// obj[Symbol('c')] = 'c';
// obj[Symbol.for('d')] = 'd';

// console.log(Object.getOwnPropertySymbols(obj));

//| Object.getPrototypeOf(obj)
//? Возвращает прототип obj.
//? По факту, getter для __proto__, но напрямую читать или изменять __proto__ не рекомендуется.
// const prototype1 = { prop: 'prop' };
// const object1 = Object.create(prototype1);
// console.log(Object.getPrototypeOf(object1) === object1.__proto__);

// const nullObject = Object.create(null);
// console.log(Object.getPrototypeOf(nullObject));

//| Object.setPrototypeOf(obj, prototype);
//? Задаёт prototype у obj.
//? prototype это объект или null.
//! Возвращает переданный объект.
// const prototype = { prop: 'prop' };
// const obj = {};

// console.log(Object.setPrototypeOf(obj, prototype));
// console.log(obj.__proto__ === prototype);

//| prototype.hasOwnProperty(propName)
//? Указывает, если у объекта такое свойство или нет, не смотрит в прототип.
//? Возвращает true или false.
//? Также работает, если свойство присвоено null или undefined.
// const obj = {};
// obj.prop1 = 42;
// Object.defineProperty(obj, "prop2", {
//   value: undefined,
// });
// obj.prop3 = null;

// console.log(obj.hasOwnProperty("prop1"));
// console.log(obj.hasOwnProperty("toString"));
// console.log(obj.hasOwnProperty("hasOwnProperty"));
// console.log(obj.hasOwnProperty("prop2"));
// console.log(obj.hasOwnProperty("prop3"));

//| Object.hasOwn(obj, propName)
//? Возвращает true, если свойство принадлежит объекту, иначе, если оно наследуется или его не существует возвращает false.
//? По факту делает тоже самое, что и prototype.hasOwnProperty().
//? Но умеет работать с объектами Object.create(null).
// const example = {};
// console.log(Object.hasOwn("prop"));

// example.prop = "exists";
// console.log(Object.hasOwn(example, "prop"));

// example.prop = null;
// console.log(Object.hasOwn(example, "prop"));

// example.prop = undefined;
// console.log(Object.hasOwn(example, "prop"));

//? Работа с Object.create(null).
// const test = Object.create(null);
// test.prop1 = 'prop1';
//? Ошибка.
// console.log(test.hasOwnProperty('prop1'));
//? Отработает верно.
// console.log(Object.hasOwn(test, 'prop1'));

//| prototype.isPrototypeOf(object)
//? Метод проверяет, является ли один something.prototype прототипом object.
//? Возвращает false или true.
// function Foo() {}
// const foo = new Foo();

// console.log(Foo.prototype.isPrototypeOf(foo));

//| Object.is(value1, value2)
//? Сравнивает 2 значения и возвращает true или false.
//? В отличие от '===' NaN равен NaN и -0 не равен +0.
// console.log(NaN === NaN);
// console.log(-0 === +0);
// console.log(Object.is(NaN, NaN));
// console.log(Object.is(-0, +0));

//| Object.create(proto, propertiesObject?)
//? Создаёт новый объект, используя переданный объект как прототип новому.
// const person = {
//   isHuman: false,
//   printIntroduction: function () {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//   },
// };

// const me = Object.create(person);
//? Теперь прототипом у me является person.
// console.log(me.__proto__ === person);

// me.name = 'Ruslan';
// me.isHuman = true;
// me.printIntroduction();

//? В качестве прототипа можно передать null, тогда у нового объекта не будет прототипа.
// const test = Object.create(null);
// test.a = 'a';
// console.log(test.__proto__);
// console.log(Object.hasOwn(test, 'a'));

// const test = Object.create(null, {
//   a: {
//     value: 'a',
//     enumerable: true,
//   },
//   b: {
//     value: 'b',
//     enumerable: true,
//   },
// });
//? Ошибка.
// console.log(test.toString());
// Object.setPrototypeOf(test, Object.prototype);
//? Сработает нормально.
// console.log(test.toString());

//| typeof
//? Возвращает строку, обозначающую тип данного значения.
// console.log(typeof undefined);
// console.log(typeof null);
// console.log(typeof true);

//? NaN, Infinity и -Infinity также являются числами.
// console.log(typeof 1);
// console.log(typeof NaN);
// console.log(typeof Infinity);
// console.log(typeof -Infinity);

// console.log(typeof 1n);
// console.log(typeof 'a');
// console.log(typeof Symbol('1'));
// console.log(typeof (() => {}));

//? [] является объектом, чтобы отличить его нужно использовать Array.isArray
// console.log(typeof Object.create(null));
// console.log(typeof []);
// console.log(Array.isArray([]));

//| Comma operator
//? Вычисляет каждый из операндов слева направо и возвращает значение последнего оператора.
// let x = 1;
// let newX = (x++, x);
// console.log(newX, x);
//? Зачастую используется в циклах for.
// for (let i = 0, j = 9; j <= 9; i++, j--) {
//   console.log('a[' + i + '][' + j + '] = ' + a[i][j]);
// }
//? Можно объявлять переменные так с помощью этого оператора.
// let a = 1,
//   b = 2;

//| instanceof
//? object instanceof constructor
//? Проверяет появляется ли constructor.prototype в цепочке прототипов у object.
// function Car(make, model, year) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
// }

// const auto = new Car('Honda', 'Accord', 1998);
// console.log(auto instanceof Car);
// console.log(auto.__proto__ === Car.prototype);
//? Ещё пример.
// function C() {}
// function D() {}

// let o = new C();
// console.log(o instanceof C);
// console.log(o instanceof D);
// console.log(o instanceof Object);

// C.prototype = {};
// let o2 = new C();
// console.log(o2 instanceof C);
// console.log(o instanceof C);

//| Оператор in
//? prop in object
//? Возвращает true, если prop лежит в object или в цепочке его прототипов.
// const obj = {
//   a: 'a',
//   length: 1,
// };
// console.log('a' in obj);
//? Проверяет также в цепочке прототипов.
// console.log('toString' in obj);
//? Чтобы этого избежать нужно использовать Object.hasOwn().
// console.log(Object.hasOwn('toString'));

// const obj = {
//   a: 'a',
//   d: 'd'
// };

// for (let key in obj) {
//     obj.b = 'b';
//     console.log(key);
//     obj.c = 'c';
// }

//| for..in и for..of
//? for..in проходит по всем перечисляемым свойствам объекта и не Symbol, также лезит в цепочку прототипов.
// const test = Object.defineProperties(
//   {},
//   {
//     a: {
//       value: 'a',
//       enumerable: true,
//     },
//     b: {
//       value: 'b',
//       configurable: true,
//       writable: true,
//     },
//   }
// );
// const prototype = {
//   c: 'c',
// };
// Object.defineProperty(prototype, 'd', {
//   value: 'd',
// });
// Object.setPrototypeOf(test, prototype);
// console.log(prototype.isPrototypeOf(test));
// for (const key in test) {
//   key;
// }

//? for..of проходит по объектам, которые являются итерируемыми.
// const iterable = 'abcdefgh';
// for (const value of iterable) {
//   value;
// }
