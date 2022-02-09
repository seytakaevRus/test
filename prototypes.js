//| Прототипы
//? JS часто описывают как язык прототипного наследования - каждый объект, имеет объект-прототип, который выступает как шаблон, от которого объект наследует методы и свойства.
//? Объект-прототип так же может иметь свой прототип и наследовать его свойства и методы и так далее, это называется цепочкой прототипов.
//? Свойства и методы определяются в свойстве prototype функции-конструктора объектов.
//? И связаны таким выражением.
// Object.prototype.getA = function () {
//   return this.a;
// };

// const a = {
//   a: "666",
// };
// console.log(a.getA());
// console.log(a.__proto__ === Object.prototype);
//| __proto__
//? __proto__ является свойством каждого объекта.
//? Именно из __proto__ берётся свойства или методы, если их нет у текущего объекта.
// const test = Object.create(null);
// Object.setPrototypeOf(test, { secret: "secret" });
//? Прототипом всего является null
// console.log(test.__proto__.__proto__.__proto__);
//| prototype
//? prototype есть только у функций и классов, правда нет у стрелочных функций.
//? Указывает на объект, у которого есть свойство constructor, которое указывает на исходную функцию-конструктор.

// function Person(name) {
//   this.name = name;
// }

// const human = new Person("Rus");
//? toString нет у human, поэтому:
//? 1. Ищется в Person.prototype;
//? 2. Затем в Person.prototype.__proto__, а это Object.prototype.
// console.log(human.toString());
// console.log(human.__proto__ === Person.prototype);
// console.log(Person.prototype.__proto__ === Object.prototype);
