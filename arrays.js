//| callback = (element?, index?, array?) => {}
//| Особенность для методов, которые в качестве параметра принимают callback и thisArg
//? Если добавить элемент во время вызова callback, то callback не будет вызван для этого элемента.
//? Если изменить элемент во время вызова callback, то callback будет вызван для этого элемента.
//? callback вызывается только для тех элементов, индекс, у которых имеет значение, то есть для дырок или удалённых индексов callback не вызывается.

//? Можно обращаться как по числовым индексам, так и заключать эти индексы в строки, так как индексы приведутся в строки.
// const arr = [1, 2];
// console.log(arr[0] === arr["0"]);
//? Через точечную нотацию мы не можем обращаться к индексам, так как это не валидное имя.
//? Через точечную нотацию мы можем добавлять элементу в массив, так как массив это объект.
// const arr = [];
// arr.a = "5";

//| empty
//? Массивы в JS это объекты, которые по индексу(ключу) хранят какое-то значение.
//? Empty обозначает отсутствие индекса(ключа), если обратиться по этому индексу мы получим undefined, так как этого значения просто нет.
//? 1. Получение с помощью new Array.
// const a = new Array(100);
//? 2. Получение через оператор запятая.
// const b = [1, 2, , 3, 4];
/*
    0: 1,
    1: 2,
    Индекса 2 не существует,
    3: 3,
    4: 4,
 */
//? 3. Получение через повышение свойства length.
// const c = [1, 2, 3, 4];
// c.length = 10;
//? 4. Получение с помощью намеренного создания разрыва в массиве.
// const d = [1, 2, 3];
// d[5] = 5
//? 5. Удаление индекса.
// const arr = [1, 2, 3];
// delete arr[1];
// arr;
//? Empty с разными циклами.
// const arr = [1, , 2];
// for (let i = 0; i < arr.length; i++) {
//   console.log(`key: ${i}, value: ${arr[i]}\n`);
// }

//? Работает только с перечисляемыми свойствами, а свойства-то по факту и нет.
// for (let key in arr) {
//   console.log(`key: ${key}, value: ${arr[key]}\n`);
// }

//? Работает с протоколом Итератор, поэтому может обрабатывать пустоты.
// for (let key of arr) {
//   console.log(`value: ${key}\n`);
// }

//| Итераторы, итерируемые объекты и псевдомассивы
//? Перебираемые (или итерируемые объекты) - объекты, которые реализуют внутри себя Symbol.iterator и позволяют использовать for of.
//? Массив и другие встроенные объекты реализуют по умолчанию Symbol.iterator.
// const arr = [1, 2, 3];
// for (let value of arr) {
//   console.log(value);
// }
//? for-of, spread, yield*, destructing - использование данного синтаксиса предполагает итерируемый тип.
//? 1. Когда цикл for..of запускается, то он вызывает Symbol.iterator или выбрасывает исключение. Этот метод возвращает итератор, объект у которого есть метод next;
//? 2. Дальше for..of работает только с объектом, который вернула функция выше;
//? 3. Для получения следующего значения вызывается метод next у итератора;
//? 4. Результат вызова next является объект вида {done: true | false, value: any}.

//? Вот таким способом из объекта можно сделать итерируемый объект.
//? В данном случае, range - итерируемый объект, а то, что он возвращает называется итератор.
// const range = {
//   start: 1,
//   end: 5,
//   [Symbol.iterator]() {
//     return {
//       current: this.start,
//       last: this.end,
//       next() {
//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       },
//     };
//   },
// };

// for (const value of range) {
//   value;
// }

//? Также мы можем использовать итератор напрямую.
// const someString = "abcdefgh";
// const strIterator = someString[Symbol.iterator]();
// while (true) {
//   const tempIterator = strIterator.next();
//   if (tempIterator.done) return;
//   console.log(tempIterator.value);
// }

//? Псевдомассивы - объекты, у которых по индексам расположены значения, также у них есть свойство length.

//| prototype.length
//? Устанавливает или возвращает число элементов в массиве.
//? Всегда больше, чем самый наибольший индекс в массиве.
//? Значение может быть от 0 до 2^32 - 1.
//? Invalid
// const a = new Array(-100);
//? Invalid
// const b = new Array(2 ** 32);
//? Valid
// const c = new Array(2 ** 32 - 1);
// console.log(c.length);

//? Может быть использовано для расширения или обрезки массива.
//? 1. При расширении новые элементы будет равны empty.
// const a = [1, 2, 3, 4];
// a.length = 5;
// console.log(a[4], a.length);
//? 2. При обрезки элементы пропадают из массива.
// const a = [];
// for (let i = 0; i < 100; i++) {
//   a[i] = i;
// }
// a.length = 10;
// console.log(a);

//| prototype[Symbol.iterator]()
//? Возвращает итератор.
//? По умолчанию возвращает тоже самое, что и функция prototype.values().
//? Но может быть переопределён.
// const a = [1, 2, 3, 4, 5];
// console.log(a[Symbol.iterator] === a.values);
//? Возвращается итератор.
// const iteratorArr = a[Symbol.iterator]();
//? Это работает, потому что у iteratorArr реализован метод [Symbol.iterator]
// for (let value of iteratorArr) {
//   console.log(value);
// }

//| prototype.at(index)
//? Если индекс положительный, то работает как [index].
//? Если индекс отрицательный, [arr.length - index].
//? Если же под индексом нет значения, то возвращается undefined.
// const arr = [1, 2, 3, 4];
// console.log(arr.at(arr.length - 1));

//| prototype.concat(value1)
//? Соединяет массив, у которого был вызван concat с переданными аргументами, может принимать также массивы и распакует их до 1 уровня.
//! Возвращает новый массив, не изменяя исходный.
//? Также concat копирует и ссылки на объект, поэтому если изменить объект в оригинале, то он будет изменён и в копии.
// console.log([1, 2, 3].concat(4, [5, 6, [1]]));
// const a = { a: 1 };
// const b1 = [1, 2, 3, a];
// const b2 = b1.concat(10);
// console.log(b1, b2);
// b2[3].a = 5;
// console.log(b1, b2);

//| prototype.copyWithin(target, start? = 0, end? = arr.length)
//? Вставляет в исходный массив начиная с позиции target элементы с позиции start и до end, причём не меняет длину исходного массива.
//? start, end и target, могут быть отрицательными, тогда они вычисляются, как [arr.length + index].s
//! Изменяет исходный массив и возвращает изменённый массив.
// const arr = [1, 2, 3, 4, 5];
// console.log(arr.copyWithin(1, 0, 3));
// console.log(arr.copyWithin(-3, -2, -1));
// console.log(arr);

//| prototype.entries() || prototype.keys() || prototype.values()
//? Каждое из методов возвращает итератор массива.
//? Каждый из методов не опускает пустоты.
// const arr = ['b', 1, 2, 3, , 4, 'a'];

//? Возвращает итератор с парой ключ, значений.
// const arrEntries = arr.entries();
// for (let [value, key] of arrEntries) {
//   console.log([value, key]);
// }

//? Возвращает итератор, который содержит ключи для каждого индекса в массиве.
// const arrKeys = arr.keys();
// for (let key of arrKeys) {
//   console.log(key);
// }

//? Возвращает итератор, который содержит значения для каждого индекса в массиве.
// const arrValues = arr.values();
// for (let value of arrValues) {
//   console.log(value);
// }

//| prototype.every(callback, thisArg?)
//? Проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.
//? Если все callback возвращают truthy значение, то возвращается true, иначе false.
//? thisArg - значение, которое используется как this внутри функции, работает некорректно если в качестве колбэка была передана стрелочная функция.
//! Не изменяет исходный массив.
//! Для пустого массива при любом условии возвращает true.
// console.log([].every(el => false));

//? Без thisArg.
// const arr = [1, 2, 3, 4, -5];
// console.log(arr.every(value => {
//   console.log(value);
//   return value > 0;
// }));

//? С thisArg
// const arr = [1, -2, 3, -4, 5];
// console.log(
//   arr.every(
//     function (value) {
//       console.log(this);
//       return value > this.value;
//     },
//     {
//       value: -2,
//     }
//   )
// );

//| prototype.some(callback, thisArg?)
//? Проверяет, удовлетворяют ли какой-либо элемент массива условию, заданному в передаваемой функции.
//? Если хотя бы один callback возвращают truthy значение, то возвращается true, иначе false.
//? thisArg - значение, которое используется как this внутри функции, работает некорректно если в качестве колбэка была передана стрелочная функция.
//! Не изменяет исходный массив.
//! Для пустого массива при любом условии возвращает false.
// console.log([].some(el => true));

//? Без thisArg.
// const arr = [-1, , , , -2, 3, 4, -5];
// console.log(
//   arr.some(value => {
//     console.log(value);
//     return value > 0;
//   })
// );

//? С thisArg
// const arr = [-1, -2, 3, -4, 5];
// console.log(
//   arr.some(
//     function (value) {
//       console.log(this);
//       return value > this.value;
//     },
//     {
//       value: 0,
//     }
//   )
// );

//| prototype.fill(value, start? = 0, end? = arr.length)
//? Заполняет все элементы массивы от start до end value.
//? start и end могут быть отрицательными, тогда [index + arr.length].
//! Изменяет исходный массив и возвращает изменённый массив.
//! fill умеет работать с empty.
// const arr = [1, 2, 3, 4, 5];
// console.log(arr.fill(0, -2, -1));
// console.log(arr);
// console.log(arr.fill(null));
// console.log(arr);
//? Если аргумент у fill это объект, то каждый слот в массиве заполняется ссылкой на этот объект.
// const arr = [, , ,].fill({});
// arr[0].hi = "hi";
// arr;

//| prototype.filter(callback, thisArg?)
//? Вызывает callback для каждого элемента, и в зависимости от значения которое возвращает callback (значение будет преобразовано в true или false) добавляет в возвращаемый массив filter или нет.
//! Возвращает новый массив, не изменяя исходный.

// const words = [
//   "spray",
//   ,
//   ,
//   "limit",
//   "exuberant",
//   "destruction",
//   "elite",
//   {
//     length: 4,
//   },
// ];
// const deleteWords = words.filter((word, index, arr) => {
//   console.log(word);
//   if (typeof word == "object") word.length = 1;
//   return word.length < 6;
// });

// console.log(deleteWords);

//| prototype.find(callback, thisArg?)
//? Возвращает первый найденный элемент в массиве, который удовлетворяет условию переданному в callback функции, в противном случае возвращает undefined.
//? Посещает абсолютно все индексы, поэтому работает с дырками и с удалёнными тоже, но значение будет undefined.
//! Не изменяет исходный массив.
// const obj = {
//   value: "ahah",
// };
// const arr = [{ a: 1 }, , , , , { a: 2 }, { a: 3 }, { a: "ahah" }];
// console.log(
//   arr.find(function (obj) {
//     arr.unshift(666);;
//     return obj === 666;
//   }, obj)
// );

//| prototype.findIndex(callback, thisArg?)
//? Возвращает индекс элемента первого найденного элемента в массиве, который удовлетворяет условию переданному в callback функции, в противном случае возвращает -1.
//? Посещает абсолютно все индексы, поэтому работает с дырками и с удалёнными тоже, но значение будет undefined.
//! Не изменяет исходный массив.
// const obj = {
//   value: "ahah",
// };
// const arr = [{ a: 1 }, , , , , { a: 2 }, { a: 3 }, { a: "ahah" }];
// console.log(
//   arr.findIndex(function (obj) {
//     if (!obj) return;
//     return obj.a === this.value;
//   }, obj)
// );

//| prototype.flat(index? = 1)
//? Возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" с глубины depth.
//! Не изменяет исходный массив.
//? depth = 0, возвращает исходный массив;
// console.log([1, 2, [3, 4]].flat(1));
// console.log([1, 2, [3, 4, [5, 6]]].flat(1));
// console.log([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(4));
//? При depth = Infinity массив преобразуется в массив с глубиной 0.
// console.log([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(Infinity));
//! Может удалять пустоты в массиве.
// console.log([1, , 2, , 3, , 4, [[, , , ,], , ,]].flat(1));

//| prototype.flatMap(callback, thisArg?)
//! Возвращает новый массив, не изменяя исходный.
//? Сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в новый массив.
//? По факту на каждой итерации map перед возвращением результата применяется функция flat с параметром depth = 1.
// const arr = ["it's Sunny in", "", "California"];
// console.log(
//   arr.flatMap(value => {
//     return [value];
//   })
// );

//| prototype.forEach(callback, thisArg?)
//? Выполняет callback для каждого элемента массива.
//? Возвращает undefined.
//! Не изменяет исходный массив.
//? Нет способа досрочно выйти из цикла.
// const arr = [1, , , 2];
// arr.forEach(value => {
//   console.log(value);
// });

//| Array.from(arrayLike, mapFn?, thisArg?)
//? Создаёт массив из массивоподобного или итерируемого объекта arrayLike.
//? mapFn - функция, которая будет вызвана для каждого элемента созданного массива.
//? Возвращает новый экземпляр Array.
// console.log(Array.from("abcd"));
// console.log(Array.from({ length: 3, 0: 1, 1: 1, 2: 2 }));
// const someObj = {
//   length: 3,
//   0: 1,
//   1: 3,
//   2: 5,
// };
// const wrong = {
//   value: 5,
// };
// const newArr = Array.from(
//   someObj,
//   function (el) {
//     return el ** this.value;
//   },
//   wrong
// );
// newArr;

//| prototype.includes(searchElement, fromIndex? = 0)
//? Определяет содержит ли массив определённый элемент или нет, возвращает true или false.
//? При отрицательном fromIndex поиск начинается с fromIndex + array.length, если полученная сумма меньше нуля, то поиск по всему массиву).
//? Если fromIndex > array.length, то вернётся сразу false.
// console.log([NaN, 1, 2, 3].includes(NaN, 0));
// console.log([undefined, 1, 2, 3].includes(undefined, -1001));

//| prototype.indexOf(searchElement, fromIndex? = 0)
//? Поиск ведётся справа налево и возвращается первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
//? При сравнении используется строгое равно ===.
//? При отрицательном fromIndex поиск начинается с fromIndex + array.length, если полученная сумма меньше нуля, то поиск по всему массиву).
//? Если fromIndex > array.length, то вернётся сразу -1.
// const array = ['a', 'b', 'a', 'c', 'a', 'a'];
// console.log(array.indexOf('a', 2));
// console.log(array.indexOf("a", -1));
// console.log(array.indexOf("b", -5000));

//| Array.isArray(obj)
//? Возвращает true, если переданный объект является массивом и false, если он не является массивом.
//? В отличие от instanceof умеет работать с iframes.
// console.log(Array.isArray([1, 2, 3]));
// console.log(Array.isArray(Array.from({ 0: 1, 1: 2, length: 2 })));

//| prototype.join(separator? = ',')
//! Не изменяет исходный массив.
//? Объединяет все элементы массива (или массивоподобного объекта) в строку, разделёнными separator.
//? Если array.length == 0, то будет возвращена пустая строка.
//? undefined или null преобразуется в пустую строку.
// console.log([null, 1, 2, , 3, undefined].join('!'));
// console.log(Array.from({ 0: 1, 1: 1, 3: 10, length: 4 }).join('!'));

//| prototype.lastIndexOf(searchElement, fromIndex? = array.length)
//? Поиск ведётся слева направо и возвращается первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
//? При сравнении используется строгое равно ===.
//? При отрицательном fromIndex поиск начинается с fromIndex + array.length, если полученная сумма меньше нуля, то возвращается -1).
//? Если fromIndex больше, чем array.length, то поиск ведётся по всему массиву.
//? Если fromIndex >= array.length, то просматривается весь массив.
// const array = ['a', 'b', 'a', 'c', 'a', 'a', 'c'];
// console.log(array.lastIndexOf('c'));
// console.log(array.lastIndexOf("a", -1));
// console.log(array.lastIndexOf("a", -5));
// console.log(array.lastIndexOf('a', 90000));

//| prototype.map(callback, thisArg?)
//? Вызывает callback для каждого элемента.
//? Не вызывает callback для пустых слотов.
//! Возвращает новый массив, не изменяя исходный.
// const arr = [1, 2, 3, 2, 4, , ,];
// arr.map(value => console.log(value));

// const arr = [
//   { key: 1, value: 10 },
//   { key: 2, value: 20 },
//   { key: 3, value: 30 },
// ];

// console.log(
//   arr.map(({ key, value }) => {
//     return { key: value };
//   })
// );

//| Array.of(value1, value2...)
//? Создаёт массив из переданных аргументов, по факту тот же new Array, только по другому обрабатывает единственное число.
// console.log(new Array(3));
// console.log(Array.of(3));
// console.log(Array.from(3));

//| prototype.pop()
//? Удаляет последний элемент в массиве и возвращает его, меняет свойство arr.length.
//? Если массив пустой, то возвращает undefined.
// const arr1 = [, ,];
// console.log(arr1.pop());
// const arr2 = [1, 2, 3, 4, 5];
// console.log(arr2.pop());

//| prototype.push()
//? Добавляет один или несколько элементов в конец массиве и возвращает новую длину, меняя свойство arr.length.
// const arr = [1, 2, 3, 4];
// console.log(arr.push([5], ...[7, 8], 'ab'));
// console.log(arr);

//| prototype.reduce(callback, initialValue?)
//? callback = (prevValue, currValue, currIndex, array) => {}
//! Не изменяет исходный массив, возвращает 1 значение.
//? Будет ошибка, если вызвать на пустом массиве без initialValue.
// [].reduce(() => {},);
//? Не вызывается для пустых слотов.
// const array = [1, 2, 3, , , 4, 5];
//? Если не задано начальное значения, то вначале prevValue = arr[0], currValue = arr[1]
// array.reduce((prevValue, currValue) => {
//   console.log(prevValue, currValue);
//   return prevValue + currValue;
// });
//? Если же задано начальное значение, то prevValue = initialValue, а currValue = arr[0]
// array.reduce((prevValue, currValue) => {
//   console.log(prevValue, currValue);
//   return prevValue + currValue;
// }, 0);

//| prototype.reduceRight(callback, initialValue?)
//? callback = (prevValue, currValue, currIndex, array) => {}
//! Не изменяет исходный массив, возвращает 1 значение.
//? Будет ошибка, если вызвать на пустом массиве без initialValue.
// [].reduceRight(() => {});
//? Не вызывается для пустых слотов.
// const array = [1, 2, 3, , , 4, 5];
//? Если не задано начальное значения, то вначале prevValue = arr.at(-1), currValue = arr.at(-2)
// array.reduceRight((prevValue, currValue) => {
//   console.log(prevValue, currValue);
//   return prevValue + currValue;
// });
//? Если же задано начальное значение, то prevValue = initialValue, а currValue = arr.at(-1)
// array.reduceRight((prevValue, currValue) => {
//   console.log(prevValue, currValue);
//   return prevValue + currValue;
// }, 0);

//| prototype.reverse()
//? Реверсирует массив (делает так, чтобы элементы массивы были в обратном порядке).
//! Изменяет массив и возвращает изменённый массив.
// const arr = [1, 2, 3, 4, 5, 6, null, ,];
// console.log(arr.reverse());
// arr

//| prototype.shift()
//? Удаляет первый элемент массива и возвращает его же, изменяет длину массива.
//? Если массив пустой, возвращает undefined.
// console.log([].shift());
// const arr = [1, 2, 3];
// console.log(arr.shift(), arr);

//| prototype.slice(start? = 0, end? = arr.length)
//? Создаёт поверхностную копию, начиная со start длиной end - start.
//! Не изменяет исходный массив, а создаёт новый.
//? Если end или start отрицательный, то индекс будет равен arr.length + index.
// const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.slice(-2));
// console.log(arr.slice(1, 4));
//? Так как создаётся поверхностная копия, то копируются и ссылки на объекты.
// const someObj = { value: 20 };
// const arr1 = [1, 2, 3, someObj, 4, 5, 6];
// const arr2 = arr1.slice(3, 4);
// console.log(arr2);
// arr2[0].value = 666;
// console.log(arr1);
// console.log(arr2);
// console.log(someObj);

//| prototype.sort(callback?)
//? callback = (firstEl, secondEl) => {}
//! Изменяет массив и возвращает изменённый массив.
//? По умолчанию сортирует в возрастающем порядке и конвертирует элементы в строки.
// console.log([1, 2, 11, 22, 111].sort());
//? callback(a, b) должен возвращать значение > 0, < 0, или 0
//? 1. > 0, то b идёт перед a.
//? 2. < 0, то b идёт после a.
//? 3. === 0, то a и b равны.

//? Если нужно сравнивать числа, то можно просто передавать a - b.
// const numbers = [4, 2, 5, 1, 3];
// console.log(numbers.sort((a, b) => a - b));

//| prototype.splice(start, deleteCount?, item1?, item2?, ...)
//? Начиная с индекса start удаляет количество элементов равное deleteCount и добавляет элементы.
//! Изменяет массив на месте.
//? Возвращает удалённые элементы.
// const arr = [1, 2, 3, 4];
//? Если start > arr.length, то вставляет просто в конец элементы.
// arr.splice(30, 0, 1);
// console.log(arr);
//? Если start отрицательный, то индекс вычисляется как start + arr.length.
// arr.splice(-2, 1, "a", "b");
// console.log(arr);

//| prototype.toLocaleString(locales?, options?)
//? Возвращает строку, которая представляет элемент массива. Элементы конвертируются в строки используя метод toLocaleString для своего типа, отделяются локальной специальной строкой (такой как запятая).
//? locales - задаёт локаль в виде языкового тега.
//? options -  набор опций.
//! Возвращает новый массив, не изменяя исходный.
// const arr = [1, 'a', new Date()];
// console.log(
//   arr.toLocaleString('ru', {
//     timeZone: 'UTC',
//   })
// );
// console.log(arr);

// const prices = ['￥7', 500, 8123, 12, new Date()];
// console.log(
//   prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY', timeZone: 'UTC' })
// );

//| prototype.toString()
//? Возвращает строковое представление массива.
//? Вызывает автоматически у массива, когда его нужно преобразовать в примитив.
//? Используется метод join, с разделителем в виде запятой.
// const arr = [1, 2, , , , 'a', '1a'];
// console.log(arr.toString());

//| prototype.unshift(el1, el2, ...)
//! Не меняет исходный массив.
//? Добавляет элементы массива в начало.
//? Возвращает новую длину массива.
// const arr = [4, 5, 6];
// console.log(arr.unshift(1, 2, 3), arr);
