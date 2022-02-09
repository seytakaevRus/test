//| Стрелочные функции
//? Имеют более короткий синтаксис в отличии от традиционных функций, но также имеют ряд ограничений:
//? 1. У стрелочных функций нет своего this, поэтому с ними методы call, apply, bind не возымеют никакого эффекта.
// const a = { secret: "rus" };
// const test = () => {
//   console.log(this);
// };

// test.call(a);
// test.apply(a);
// test.bind(this)();
//? 2. Стрелочная функция не может быть использована в качестве функции-конструктора (нет своего this).
// const test = name => {
//   this.name = name;
// };
// const testObj = new test("a");
//? 3. В отличие от обычных функций и классов у стрелочных функций нет свойства prototype.
// const test = () => {};
// console.log(test.prototype);
//? 4. Стрелочные функции лучше не использовать в качестве методов у объектов, так как у них нет this.
// const obj = {
//   data: "data",
//   logDataSimple() {
//     console.log(this, this.data);
//   },
//   logDataArrow: () => {
//     console.log(this, this.data);
//   },
// };

// obj.logDataSimple();
// obj.logDataArrow();
//? 5. Не имеют итерируемого объекта arguments.
// const test1 = () => {
//   console.log(arguments);
// };

// const test2 = function () {
//   console.log(arguments);
// };

// test1(1, 2, 3);
// test2(3, 4, 5);
//? 6. Не может быть использована в качестве генератора.
//! Дописать про yield, когда разберусь с генераторами.
//? 7. Чтобы вернуть объект из стрелочной функции (укороченная запись) его нужно заключить в скобки.
// const test1 = () => {
//   return {
//     a: "a",
//   };
// };

// const test2 = () => ({ a: "a" });

// console.log(test1());
// console.log(test2());

//| Классы
//? Классы это всего лишь функции, поэтому могут быть объявлены как:
//? 1. Class Declaration;
//? В отличие от функций Hoisting у Class Declaration отсутствует.
// class A {}
//? 2. Class Expression;
// const A = class {};

//| constructor
//? Специальный метод у class для создания и инициализации объекта класса.
// class Polygon {
//   constructor() {
//     this.name = "Polygon";
//   }
// }

// const pol = new Polygon();
// console.log(pol.name);

//? Если конструктор не задан, то используется по умолчанию пустой конструктор.
//? Если мы используем наследование, то в дочернем классе мы должны вызвать родительский конструктор с помощью super, причём сделать это нужно до использования this.
// class Polygon {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }
// }

// class Square extends Polygon {
//   constructor(width, height) {
//     super(width, height);
//     this.name = "square";
//   }
// }

// const p = new Polygon(1, 2);
// console.log(p);

// const s = new Square(1, 2);
// console.log(s);

//| static
//? Служит для объявления полей и методов класса, которые будут доступны только через класс, а не через его инстанс.
// class Triple {
//   static customName = "Tripler";
//   static description = "I triple any number you provide";
//   static calculate(n = 1) {
//     return n * 3;
//   }
// }

// class SquaredTriple extends Triple {
//   static longDescription;
//   static description = "I square the triple of any number you provide";
//   static calculate(n) {
//     return super.calculate(n) * super.calculate(n);
//   }
// }

// console.log(Triple.description);
// console.log(Triple.calculate());
// console.log(Triple.calculate(6));

// const tp = new Triple();

// console.log(SquaredTriple.calculate(3));
// console.log(SquaredTriple.description);
// console.log(SquaredTriple.customName);
// console.log(tp.calculate());

//| Блоки static
//? Особая функция внутри класса, которая обеспечивает более гибкую инициализацию статических свойств, чем можно достичь с помощью инициализации для каждого поля.
//? static выполняется во время создания класса, поэтому сначала выполнится static {}, а потом конструктор.
// class A {
//   static choice;
//   static a = false;
//   static {
//     if (this.a) {
//       this.choice = "cool";
//     } else {
//       this.choice = "bad";
//     }
//     //? Внутри блока static this указывает на сам класс.
//     console.log(this);
//   }
// }

// console.log(A.choice);
//? Также с помощью static можно получить значение из родительского класса.
// class A {
//   static fieldA = "A.fieldA";
// }

// class B extends A {
//   static fieldB;
//   static {
//     this.fieldB = super.fieldA;
//   }
//   getStatic() {
//     console.log(B.fieldB);
//   }
// }

// const b = new B();
// b.getStatic();
// console.log(B.fieldB);

//| extends
//? Позволяет создать класс, который будет наследоваться от другого класса.
//? Перезаписывает цепочку прототипов.
//? По факту и статические методы/поля, и публичные методы/поля могут передаваться между классами, если есть extends.
// class A {
//   //? Находится в A.prototype.constructor.sPropA, поэтому может быть получен:
//   //? 1. A.sPropA;
//   //? 2. new A().constructor.sPropA;
//   //? 3. B.sPropA;
//   //? 4. new B().constructor.sPropA.
//   static sPropA = "static propA";
//   static hi() {
//     console.log("hi");
//   }
//   //? К приватным полям можно получить доступ только внутри класса.
//   //? Или снаружи класса, используя соответствующий метод.
//   #prPropA = "private propA";
//   //? Публичное свойство будет доступно у инстанса класса A.
//   //? Также может быть получено у дочернего класса b.pubPropA;
//   pubPropA = "public prop A";

//   getPrivateFieldA() {
//     return this.#prPropA;
//   }
// }

// class B extends A {
//   //? Находится в B.prototype.constructor.sPropB, поэтому может быть получен:
//   //? 1. B.sPropB;
//   //? 2. new B().constructor.sPropB.
//   static sPropB = "static propB";
//   //? К приватным полям можно получить доступ только внутри класса.
//   #prPropB = "private propB";
//   //? Публичное свойство будет доступно у инстанса класса B
//   pubPropB = "public prop B";
// }

// console.log(Object.getPrototypeOf(B.prototype) === A.prototype);
// console.log(Object.getPrototypeOf(A.prototype) === Object.prototype);

// const a = new A();
// const b = new B();

// console.log(a.pubPropA);
// console.log(b.pubPropB);

// console.log(a.getPrivateFieldA());
// console.log(b.getPrivateFieldA());

//| Геттеры и сеттеры
// class Square {
//   #length;
//   constructor(length) {
//     this.#length = length;
//   }

//   get area() {
//     return this.#length ** 2;
//   }

//   set area(area) {
//     this.#length = Math.sqrt(area);
//   }

//   get length() {
//     return this.#length;
//   }
// }

// const sqr = new Square(5);
// console.log(sqr.area);
// sqr.area = 144;

//| Объектные литералы
//? Ключом у объекта может быть либо строка, либо Symbol.
//? Остальные типы будут преобразованы к строке.
// const obj = {
//   7: "seven",
// };
// console.log(obj[7]);
// console.log(typeof Object.getOwnPropertyNames(obj)[0] === "string");
//? К некоторым ключам объекта можно обратиться только через [].
// const obj = {
//   "": "Empty string",
//   "!": "Bang",
// };

// console.log(obj[""]);
// // console.log(obj."");
// console.log(obj["!"]);
// // console.log(obj."!");
//? Также были добавлены некоторые штуки.
// const handler = "handler";
// const obj = {
//   //? свойство __proto__.
//   __proto__: Object.prototype,
//   //? Сокращение синтаксиса для handler: handler.
//   handler,
//   //? Сокращение синтаксиса для методов method: function () {}
//   method() {
//     //? Добавление super, оказывается его можно не только в классах использовать.
//     console.log(super.__proto__ === Object.prototype);
//   },
//   //? Добавление вычисляемых свойств.
//   ["duck" + 123]: "duck",
// };

// obj.method();
// console.log(obj["duck123"]);

//| Интерполяция строк
//? Существует 2 вида интерполяции строк:
//? 1. Нетегированное;
//? 2. Тегированное.
//| Нетегированный шаблон
//? Такие строки поддерживаю перевод строки при помощи Enter, хотя можно и использовать \n
// const data1 = "data1";
// const data2 = "data2";
// console.log(`Some data: ${data1}\n
// and more data: ${data2}`);
//? Вложенная интерполяция.
// const large = "large";
// const small = "small";
// const classes = `header-${false ? `${large}` : `${small}`}`;
// console.log(classes);

//| Тегированный шаблон
// const person = "Mike";
// const age = 28;

// function myTag(strings, personExp, ageExp) {
//   //? Первый параметр это массив строк.
//   console.log(strings);
//   const [str0, str1, str2] = strings;
//   //? Остальные аргументы включают в себя значения, которые были переданы через ${}.
//   console.log(personExp, ageExp);

//   return `${str0}${personExp}${str1}cool boy${str2}`;
// }

// const output = myTag`That ${person} is a ${age}.`;
// console.log(output);
//? Тегированной функции не обязательно возвращать строку.
//? Специальное свойство raw позволяет получать строку без экранирования символов.
// function tag(strings) {
//   console.log(strings.raw[0], strings[0]);
// }

// tag`\n, \r, \0xx0, bla bla \u`;

//? Некоторые юникод последовательности можно видеть при помощи raw.
//? Работает только с тегированными шаблонами, у нетегированных ошибка.
// let bad = `bad escape sequence: \unicode`;
// console.log(bad);

//| Деструктуризация
//? Позволяет распаковывать значения из массива или объекта в переменные.
//| Деструктуризация в массиве
//? 1. Базовая деструктуризация массива.
// let a, b;
// const arr = [1, 2, 3, 4, 5];
// const [x, y] = arr;
// [a, b] = arr;
// console.log(x, a);
// console.log(y, b);
//? Если количество левых переменных выше, чем количество элементов в массиве, но оставшиеся переменные будет заполнены undefined.
// const [a, b, c] = [1, 2];
// console.log(a, b, c);

//? 2. Переменные по умолчанию.
//? Если переменной может быть присвоено undefined, то используется значение по умолчанию.
// const [a = 1, b = 2, c = 3] = [666];
// console.log(a, b, c);

//? 3. Обмен значениями 2 элементов.
// let a = 1,
//   b = 3;
// [b, a] = [a, b];
// console.log(a, b);
//? Можно так менять значения в массиве.
// const arr = [1, 2, 3];
// [arr[0], arr[2]] = [arr[2], arr[0]];
// console.log(arr);

//? 4. Возвращение функции.
// function test() {
//   return [1, 2];
// }

// const [a, b] = test();
// console.log(a, b);

//? 5. Игнорирование некоторых значений.
// const arr = [1, 2, 3];

// const [a, , b] = arr;
// console.log(a, b);

// const [, , c] = arr;
// console.log(c);

//| Деструктуризация в объекте
//? 1. Базовая деструктуризация.
// const user = {
//   id: 42,
//   bool: true,
// };

// const { id, bool } = user;
// console.log(id);
// console.log(bool);

//? 2. Деструктуризация отдельно от объявления.
// let bool, id;

// ({bool, id}) = {
//   id: 42,
//   bool: true
// }

// console.log(id, bool);

//? 3. Создание псевдонимов.
//? {name: newName} = obj.
// const obj = {
//   p: 42,
//   q: true,
// };
// const { p: foo, q: bar } = obj;
// console.log(foo, bar);

//? 4. Значения по умолчанию.
// const { a = 10, b = 3, c } = { c: 1, a: 3 };
// console.log(a, b, c);

//? 5. Сочетания псевдонимов и значений по умолчанию.
// const { a: aa = 5, b: bb = 5 } = { a: 1 };
// console.log(aa);
// console.log(bb);

//? 6. Вложенная деструктуризация.
// const user = {
//   id: 42,
//   displayName: "jdoe",
//   fullName: {
//     firstName: "John",
//     lastName: "Doe",
//   },
// };

//? Вариант 1.
// const { fullName } = user;
// const { lastName, firstName } = fullName;
// console.log(fullName, lastName, firstName);

//? Вариант 2.
// const {
//   fullName: { firstName: name = 5 },
// } = user;

// console.log(name);

//? Ещё пример.
// const metadata = {
//   title: "Scratchpad",
//   translations: [
//     {
//       locale: "de",
//       localization_tags: [],
//       last_edit: "2014-04-14T08:43:37",
//       url: "/de/docs/Tools/Scratchpad",
//       title: "JavaScript-Umgebung",
//     },
//   ],
//   url: "/en-US/docs/Tools/Scratchpad",
// };

// const {
//   title: englishTitle,
//   translations: [{ title: localeTitle }],
// } = metadata;

// console.log(englishTitle);
// console.log(localeTitle);

//? 7. Деструктуризация и for..of.
// const people = [
//   {
//     name: "Mike Smith",
//     family: {
//       mother: "Jane Smith",
//       father: "Harry Smith",
//       sister: "Samantha Smith",
//     },
//     age: 35,
//   },
//   {
//     name: "Tom Jones",
//     family: {
//       mother: "Norah Jones",
//       father: "Richard Jones",
//       brother: "Howard Jones",
//     },
//     age: 25,
//   },
// ];

// for (const {
//   name,
//   family: { father: f },
// } of people) {
//   console.log(`Name: ${name}, Father: ${f}`);
// }

//? 8. Вычисляемое свойство.
// const key = "z";
// const { [key]: foo } = { z: "bar" };
// console.log(foo);

//? 9. Использование оператора rest.
// const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };
// console.log(a, b, rest);

//? 10. Игнорирование значений.
//? Достаточно указать нужные свойства, чтобы игнорировать.
// const { a, c } = { a: 1, b: 2, c: 3 };
// console.log(a, c);

//? 11. Деструктуризация может лезть в цепочку прототипов???
// const a = {
//     a: "a",
//   },
//   b = {
//     b: "b",
//   };

// Object.setPrototypeOf(b, a);
// console.log(b.__proto__ === a);

// const { a: c, b: d } = b;
// console.log(c, d);

//| Значения по умолчанию
//? Присваиваются переменным, если значения параметром не передано или передано явно undefined.
//? 1. Другие falsy значения будут иметь больший приоритет, чем значение по умолчанию.
// function test(a = 1) {
//   console.log(a);
// }

// test();
// test(undefined);
// test(NaN);

//? 2. Дефолтные параметры могут получать доступ к другим дефолтным параметрам.
// function test(a = 1, b = a, c = b) {
//   console.log(a, b, c);
// }

// test();
// test(null);

//? 3. Дефолтные параметры создаются при каждом вызове функции.
// function append(value, array = []) {
//   array.push(value);
//   console.log(array);
// }

// append(1);
// append(2);

//? 4. Создаётся 2 области видимости:
//? 4.1. в дефолтных параметрах;
//? 4.2. в теле функции;
//? И вторая область находится внутри первой, поэтому из первой нельзя получить доступ во вторую.
// function f(a = () => test) {
//   const test = "test";
//   a();
// }

// f();

//| Spread оператор
//? Позволяет распаковывать итерируемые объекты, такие как массивы и строки.
//? 1. Spread в вызовах функциях.
// function test(x, y, z) {
//   console.log(x, y, z);
// }
// test(6, ...[1, 2, 3], 5);
//? Раньше для таких целей использовался метод apply.
// function test(x, y, z) {
//   console.log(x, y, z);
// }
// test.apply(null, [1, 2, 3]);

//? 2. Spread в массивах.
//? Может быть использован взамен метод push, concat, unshift и т.д.
// const arr = [3, 4, 5];
// const test = [1, 2, ...arr, 6];
// console.log(test);
//? Может быть использован в качестве копирования массива, правда только до 1 уровня.
// const arr1 = [1, 2, 3];
// const arr2 = [...arr1];
// console.log(arr1 === arr2);

//? 3. Spread в объектах.
//? Копирует собственные перечисляемые свойства с переданного объекта.
//? Проводит копию 1 уровня.
// const obj1 = {
//   a: "a",
// };
// Object.defineProperty(obj1, "b", {
//   value: "b",
// });

// const obj2 = {
//   foo: "foo",
//   ...obj1,
// };

// console.log(obj2);

// const test = [1, 2, 3];
// const obj = {
//   a: "a",
//   arr: test,
// };

// const copObj = { ...obj };
// copObj.arr.push(666);
// console.log(copObj.arr[3], obj.arr[3]);

//| Rest параметр
//? При объявлении функции позволяет собрать все переданные аргументы в массив.
// function sumAll(...rest) {
//   return rest.reduce((prev, value) => prev + value, 0);
// }

// console.log(sumAll());
// console.log(sumAll(1, 2, 3, 4));
//? Может быть только 1 rest параметр в объявлении функции, и он должен быть последним.
// function test(...rest, a) {
//   console.log(a, rest);
// }

// test(1, 2, 3, 4, 5);
//? Когда не было rest, то использовался arguments, но в отличие от rest, arguments является не настоящим массивом.

//| let и const
//? Новый способ объявлении переменной, в отличие от var определяет блочную область видимости.
//? 1. Переменная, объявленная с помощью let или const, имеет блочную область видимости, она будет существовать в рамках блока, функции или модуля.
//? Переменная с var существует в пределах функции или модуля.
// function varTest() {
//   console.log(window.x);
//   var x = 1;
//   {
//     var x = 2;
//     console.log(x);
//   }
//   console.log(x);
// }

// varTest();

// function letTest() {
//   let x = 1;
//   {
//     let x = 2;
//     console.log(x);
//   }
//   console.log(x);
// }

// letTest();

//? 2. Переменная, объявленная через let и const не появляется у window.
//? Если же переменную с var объявить в начале файла, то оно видна у объекта window.
// let x = 5;
// var y = 6;
// console.log(window.x);
// console.log(window.y);

//? 3. Нельзя переопределить переменную, объявленная через let, const.
//? А с var можно.
// let x = 5;
// let x = 6;

// const a = 1;
// const a = 2;

// var y = 10;
// var y = 11;
//? А также нельзя переопределить так.
// var z = 5;
// let z = 10;

//? 4. Нельзя обратиться к переменной let и const до объявления (временная зона).
// console.log(a, b);

// let a = 5;
// const b = 6;

//? 5. Переменную, объявленную через let, можно перезаписать, а вот если через const, то нельзя.
// let a = 5;
// a = 6;
// const b = 7;

//? 7. Переменная, объявленная через const, обязательно должно быть проинициализирована, иначе будет ошибка.
// const a;

//| Итераторы и for..of
//? Перебираемые (или итерируемые объекты) - объекты, которые реализуют внутри себя Symbol.iterator и позволяют использовать for..of.
//? Массив и другие встроенные объекты реализуют по умолчанию Symbol.iterator.
//? for-of, spread, yield*, destructing - использование данного синтаксиса предполагает итерируемый тип.
//? 1. Когда цикл for..of запускается, то он вызывает Symbol.iterator или выбрасывает исключение. Этот метод возвращает итератор, объект у которого есть метод next;
//? 2. Дальше for..of работает только с объектом, который вернула функция выше;
//? 3. Для получения следующего значения вызывается метод next у итератора;
//? 4. Результат вызова next является объект вида {done: true | false, value: any}.

// const range = {
//   //? range является итерируемым объектом, потому что реализует метод Symbol.iterator.
//   [Symbol.iterator]() {
//     let start = 1,
//       end = 5;
//     return {
//       //? А возвращает итератор, который реализует метод next()
//       next() {
//         if (start < end) {
//           return {
//             done: false,
//             value: start++,
//           };
//         } else {
//           return {
//             done: true,
//           };
//         }
//       },
//     };
//   },
// };

// for (const value of range) {
//   console.log(value);
// }

//| Reflect
//? Api, которое предоставляет методы для перехватываемых JS операций.
// class Student {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     console.log(`Hi! My name is ${this.name}`);
//   }
// }

// class ProtoStudent {
//   university = "Ufu";
// }

//? Создание инстанса с помощью constructor.
// const student = Reflect.construct(Student, ["Rus"]);

//? Вызов метода класса с нужным контекстом с помощью apply.
// Reflect.apply(student.greet, { name: "Tesla" }, []);
// student.greet.apply({ name: "Tesla" });

//? Собственные ключи у объекта с помощью ownKeys.
// console.log(Reflect.ownKeys(student));
// console.log(Object.getOwnPropertyNames(student));

//? Запретить добавление новых свойств.
// console.log(student);
// Reflect.preventExtensions(student);
// Object.preventExtensions(student);
// student.age = 18;
// console.log(student);

//| Proxy
//? Класс позволяющий добавлять ловушки на определённые объекты.
// const validator = {
//   get(target, prop) {
//     return prop in target ? target[prop] : `Поле ${prop} в объекте нет`;
//   },

//   set(target, prop, value) {
//     if (value.length > 2) {
//       // target[prop] = value;
//       Reflect.set(target, prop, value);
//     } else {
//       console.log(
//         "Длина должна быть больше 2х символов. Сейчас " + value.length
//       );
//     }
//   },
// };

// const form = {
//   login: "tester",
//   password: "12345",
// };

// const formProxy = new Proxy(form, validator);
// console.log(formProxy.login);
// console.log(formProxy.notUsed);

// formProxy.password = "123";
// formProxy.password = "1";
// console.log(formProxy.password);

// function log(message) {
//   console.log("[Log]: ", message);
// }

// const proxy = new Proxy(log, {
//   apply(target, thisArg, argArray) {
//     if (argArray.length === 1) {
//       Reflect.apply(target, thisArg, argArray);
//     } else {
//       console.log("Количество аргументов не совпадает");
//     }
//   },
// });

// proxy("Custom message");
// proxy("1", "2");

//| import и export
//? Чтобы использовать импорт, допустим в браузере, необходимо подключить скрипт с атрибутом typ="module".
//? Причём то, что мы импортируем мы не можем изменять, оно только для чтения.
//? При импорте модуля выполняется  весь код, который находится в нём
//? 1. Полный импорт контента из модуля.
// import * as myModule from "./ES6_modules/module.js";
// myModule.hi();
// console.log(myModule.a);
//? Дефолтное значение будет доступно под свойство default.
// console.log(myModule.default);

//? 2. Именованый импорт c псевдонимами.
// import { a as coolVariable, hi as niceMethod } from "./ES6_modules/module.js";
// niceMethod();
// console.log(coolVariable);

//? 3. Импорт модуля, если нужен только сайд эффект в нём и не нужно ничего импортировать.
// import "./ES6_modules/module.js";

//? 4. Импортируем дефолтные значения.
// import someSecret from "./ES6_modules/module.js";
// console.log(someSecret);
//? Если мы импортируем дефолтное значение, мы можем назвать его как угодно.
// import vau from "./ES6_modules/module.js";
// console.log(vau);

//? 5. Импорт дефолтного значения вместе с именованными.
// import someSecret, { a as coolVariable, hi } from "./ES6_modules/module.js";
// console.log(someSecret);
// console.log(coolVariable);

//? 6. Динамический импорт.
// const choice = true;
// if (choice) {
//   (async () => {
//     const module = await import("./ES6_modules/module.js");
//     console.log(module);
//   })();
// } else {
//   console.log("Импорта не будет");
// }

//? 7. Импортирование реэкспорта.
// import { f1, f2 } from "./ES6_modules/reexport.js";
// f1();
// f2();

//| Map и Set
//| Map
//? Различие между Map и объектом.
//? 1. Ключи у Map могут быть любым валидным значением, объектом, функцией и т.д.
//? У объекта же только строкой или символом.
// const a = { a: 'a' };
// const m = new Map();
// const o = {};
// m.set(a, 'Object a');
// o[a] = 'Object a';

// console.log();
// m;
// console.log(o);

//? 2. Порядок ключей в Map определяется порядком их добавления.
// const m = new Map();
// m.set('a', 'a');
// m.set('b', 'b');
// m.set('c', 'c');
// console.log(m);

//? 3. У Map можно узнать размер, объекта только вручную делать.
// const m = new Map();
// m.set('a', 'a');
// m.set('b', 'b');
// m.set('c', 'c');
// console.log(m.size);

//? 4. Map это итерируемый объект, в отличие от обычного, где нужно реализовывать Symbol.iterator.
// const m = new Map();
// m.set('a', 'a');
// m.set('b', 'b');
// m.set('c', 'c');

// for (const [key, value] of m) {
//   console.log(key, value);
// }

//? 5. Лучше производительность в сценарии, где нужно часто добавлять или удалять ключ/значение.

//? 6. Нет нативной поддержки сериализации и парсинга, как для объекта с JSON.parse и JSON.stringify.

//? 7. Map может быть преобразован в массив с помощью Array.from.
// const m = new Map([
//   [1, 'one'],
//   [2, 'two'],
// ]);

// console.log(Array.from(m));
//| Set
//? Итерируемый объект, который может хранить только уникальные значения примитивы или ссылки.
// const mySet = new Set();
// mySet.add(1);
//? 5 будет отображено только единожды в mySet.
// mySet.add(5);
// mySet.add(5);
// mySet.add('some text');
//? Объекты ниже не равны друг другу, поэтому они оба будут сохранены в mySet.
// const o = { a: 1, b: 2 };
// mySet.add(o);
// console.log(mySet.has(o));
// mySet.add({ a: 1, b: 2 });
// console.log(mySet);
// console.log(mySet.has('some text'));
// console.log(mySet.size);
// mySet.delete(1);
// console.log(mySet.has(1));
// console.log(mySet.size);
// console.log(mySet);

// const mySet = new Set([1, 2, 3, 4, 5, 1, 1, NaN, NaN]);
//? Итерируемые методы.
// for (const key of mySet.keys()) {
//   key;
// }
// for (const key of mySet.values()) {
//   key;
// }
// for (const [key, value] of mySet.entries()) {
//   console.log([key, value]);
// }
//? Преобразование в массив.
// const mySet = new Set([1, 2, 3, 4, 5, 1, 1, NaN, NaN]);
// console.log(Array.from(mySet));

//| WeakMap и WeakSet
//| WeakMap
//? Объект, у которого в качестве ключей могут быть только объекты, а значения могут быть произвольных типов.
//? Если мы используем объект, как ключ в Map, то пока существует Map, также будет существовать и этот объект.
//? Он занимает место в памяти и не может быть удалён сборщиком мусора.
// let john = {
//   name: 'John',
// };

// const map = new Map();
// map.set(john, '...');

//? Перезаписали ссылку на объект.
// john = null;

//? Объект john всё ещё будет сохранён внутри объекта Map, доступен через map.keys();
// console.log(map.keys());

//? WeakMap не хранит ссылку на объект, как это делает Map, поэтому при отсутствии ссылки на объект, который использовался в качестве ключа, объект будет удалён из памяти.
// let john = {
//   name: 'John',
// };

// const wMap = new WeakMap();
// wMap.set(john, '...');

//? Перезаписали ссылку на объект.
// john = null;

//? Не сразу, но через некоторое время объект будет удалён.
// setInterval(() => {
//   console.log(wMap);
// }, 10);

//? В отличие от Map:
//? 1. В качестве ключей могут быть только объекты, никаких примитивов;
//? 2. Не является итерируемым;
//? 3. Поддерживает методы get, set, delete, has;
//? 4. Если ссылок снаружи на объект нет, то объект будет удалён сборщиком мусором.
//? Пример использования weakMap хранилище посещения пользователем, если пользователь будет удалён из кода, то и из WeakMap он будет удалён.
//? Ибо нет смысла хранить количество посещений, если такого человека даже нет.

//| WeakSet
//? В отличие от Set:
//? 1. В качестве значений могут быть только объекты, никаких примитивов;
//? 2. Не является итерируемым;
//? 3. Поддерживает методы add, has и delete;
//? 4. Если ссылок снаружи на объект нет, то объект будет удалён сборщиком мусором.

// const visitedSet = new WeakSet();

// let john = { name: "John" };
// const pete = { name: "Pete" };
// const mary = { name: "Mary" };

// visitedSet.add(john);
// visitedSet.add(pete);
// visitedSet.add(john);

// console.log(visitedSet.has(john));
// console.log(visitedSet.has(mary));

// john = null;

// setInterval(() => {
//   console.log(visitedSet);
// }, 10);

//| Генератор
//? function* объявляет функцию-генератор, которая может вернуть объект-генератор, с помощью которого мы и можем управлять выполнением функции.
// function* generateSequence() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// const generator = generateSequence();
// console.log(generator);
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
//? Основным методом генератора является функция next(). При вызове этой функции запускается выполнение кода до ближайшего yield <значение>, это значение возвращается в качества свойства value во внешнюю среду.
//? Результатом метода next является объект с 2 свойствами:
//? 1. value - значение из yield;
//? 2. done - true, если выполнение функции завершено, иначе false.
//! Функции-генератор нельзя использовать с оператором new.

//| Итерируемые генераторы
//? Генераторы являются перебираемыми объектами, поэтому могут взаимодействвать с for..of и ...
// function* generateSequence() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let generator = generateSequence();

//? Использование for..of.
// for (const value of generator) {
//   console.log(value);
// }
//? Или оператора ...
// const arr = [...generator];
// console.log(arr);

//| Упрощение сосздание итерируемого объекта.
//? Создание итерируемого объекта без помощи генератора.
// const range = {
//   [Symbol.iterator]() {
//     let start = 1;
//     let end = 5;
//     return {
//       current: start,
//       next() {
//         if (this.current < end) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       },
//     };
//   },
// };
//? При помощи генератора.
// const range = {
//   *[Symbol.iterator]() {
//     const start = 1,
//       end = 5;
//     for (let i = start; i < end; i++) {
//       yield i;
//     }
//   },
// };

// console.log([...range]);
// for (const value of range) {
//   console.log(value);
// }

//| Композиция генераторов
//? С помощью yield* мы можем вкладывать генераторы друг в друга.
//? Не использует память для хранения промежуточных вызовов.

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) yield i;
// }

// function* generatePasswordCodes() {
//   //? Делегируем выполнение другому генератору.
//   // yield* generateSequence(48, 57);
//   //? Как будто мы пишем такой синтаксис.
//   // for (let i = 48; i <= 57; i++) yield i;
// }

// let str = "";

// for (const code of generatePasswordCodes()) {
//   code;
//   str += String.fromCharCode(code);
// }

// console.log(str);

//? yield* может работать также с другими итериуремыми объектами.
// function* test() {
//   yield* "abcdefg";
// }

// for (const char of test()) {
//   console.log(char);
// }

//| yield - дорога в обе стороны.
// function* counter(value) {
//   let step;
//   let temp = value;

//   while (true) {
//     step = yield ++temp;

//     if (step) {
//       temp += step;
//     }
//   }
// }

// const g = counter(0);
//? Первый вызов next всегда без аргументов.
//? Выполняется код до 1 yield и возвращается значение, указанное после yield.
// console.log(g.next().value);
//? При следующем вызове значение, которое мы передали извне уйдёт в генератор.
// console.log(g.next(10).value);

//| return
//? return в генераторе делает выход из него и возвращает объект:
//? 1. value возвращённое значение в генераторе;
//? 2. done true
// function* test() {
//   yield "A";
//   return "B";
//   yield "unreachable";
// }

// const g = test();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
