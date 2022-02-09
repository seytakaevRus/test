//| Функциональное наследование
// const Animal = function ({ color, age }) {
//   this.color = color;
//   this.age = age;

//   this.voice = function () {
//     console.log(`I'm ${this.age} years old and my color is ${this.color}`);
//   };
// };

// const Dog = function ({ name }) {
//   //? Вызываем родительский конструктор.
//   Animal.apply(this, arguments);
//   this.name = name;

//   //? Переопределение метода.
//   // this.voice = function () {
//   //   console.log(`My name is ${this.name}, I'm ${this.age} years old and my color is ${this.color}`);
//   // };

//   //? Расширение родительского метода.
//   const parentMethod = this.voice;
//   this.voice = function () {
//     console.log(`My name is ${this.name}`);
//     parentMethod.apply(this, arguments);
//   };
// };

// const animal = new Animal({
//   color: 'orange',
//   age: 5,
// });
// console.log(animal);
// animal.voice();

// const dog = new Dog({
//   name: 'Dog',
//   color: 'brown',
//   age: 12,
// });
// console.log(dog);
// dog.voice();

//| Прототипное наследование
// const Animal = function ({ color, age }) {
//   this.color = color;
//   this.age = age;
// };

// //? Благодаря этому метод voice добавляется в цепочку прототипов.
// Animal.prototype.voice = function () {
//   console.log(`I'm ${this.age} years old and my color is ${this.color}`);
// };

// const Dog = function ({ name }) {
//   //? Вызываем родительский метод.
//   Animal.apply(this, arguments);
//   this.name = name;
// };

// Object.setPrototypeOf(Dog.prototype, Animal.prototype);
// // console.log(Dog.prototype.constructor === Animal.prototype.constructor);

// // Dog.prototype = Object.create(Animal.prototype);
// // console.log(Dog.prototype.constructor === Animal.prototype.constructor);
// // Dog.prototype.constructor = Dog;

// //? Переопределение метода.
// // Dog.prototype.voice = function () {
// //   console.log(`My name is ${this.name}, I'm ${this.age} years old and my color is ${this.color}`);
// // };

// //? Расширение родительского метода.
// Dog.prototype.voice = function () {
//   console.log(`My name is ${this.name}`);
//   Animal.prototype.voice.call(this);
// };

// const animal = new Animal({
//   color: "orange",
//   age: 5,
// });
// console.log(animal);
// animal.voice();

// const dog = new Dog({
//   name: "Dog",
//   color: "brown",
//   age: 12,
// });
// console.log(dog);
// dog.voice();

//| Классовое наследование
// class Animal {
//   constructor({ color, age }) {
//     this.color = color;
//     this.age = age;
//   }

//   voice() {
//     console.log(`I'm ${this.age} years old and my color is ${this.color}`);
//   }
// }

// class Dog extends Animal {
//   constructor({ name, color, age }) {
//     super({ color, age });
//     this.name = name;
//   }

//   //? Переопределение метода.
//   // voice() {
//   //   console.log(
//   //     `My name is ${this.name}, I'm ${this.age} years old and my color is ${this.color}`
//   //   );
//   // }

//   //? Расширение метода.
//   voice() {
//     console.log(`My name is ${this.name}`);
//     super.voice();
//   }
// }

// const animal = new Animal({
//   color: "orange",
//   age: 5,
// });
// console.log(animal);
// animal.voice();

// const dog = new Dog({
//   name: "Dog",
//   color: "brown",
//   age: 12,
// });
// console.log(dog);
// dog.voice();
