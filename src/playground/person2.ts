function UpperCase2(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let result = originalMethod.apply(this, args);
    return result.toUpperCase();
  };
}

class Person2 {
  constructor(public firstName: string, public lastName: string) {}

  @UpperCase2
  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

const person2 = new Person2("Da", "Faq");
console.log("fullname ->", person2.getFullName());
console.log("person ->", person2);
