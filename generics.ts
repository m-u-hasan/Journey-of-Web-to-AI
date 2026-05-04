//Basic Generic Function

function identity<T>(value: T): T {
  return value;
}

// Generic Interface
let num = identity<number>(10);
let str = identity<string>("Hello TS");

console.log(num);
console.log(str);
//Generic Interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 100 };
const stringBox: Box<string> = { value: "TypeScript" };

console.log(numberBox.value);
console.log(stringBox.value);
//Generic Class
class Box<T> {
  private value: T;

  setValue(value: T): void {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const box = new Box<string>();
box.setValue("Hello Generics");

console.log(box.getValue());