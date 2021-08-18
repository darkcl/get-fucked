import "reflect-metadata";

function UpperCase(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let result = originalMethod.apply(this, args);
    return result.toUpperCase();
  };
}

class Person {
  constructor(public firstName: string, public lastName: string) {}

  @UpperCase
  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

const person = new Person("Da", "Faq");
console.log("fullname ->", person.getFullName());
console.log("person ->", person);
