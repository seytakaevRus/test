//? 1. Обычный экспорт
// export const a = 5;
// export function hi() {
//   console.log("hi");
// }

//? 2. Дефолтный экспорт
// const someSecret = "secret";
// export default someSecret;
//? Экспортировать дефолтное значение можно только единожды в модуле.
// export default '1';

//? 3. Можно объявить значение, а потом экспортировать его как дефолтное.
// function myFunction() {
//   console.log("myFunction");
// }
// export { myFunction as default };

//? 4. Reexport.
// function function1() {
//   console.log("func1");
// }
// function function2() {
//   console.log("func2");
// }

// export { function1 as f1, function2 as f2 };

//? Какой-то сайд-эффект.
// console.log("Происходит что-то необъяснимое!");
