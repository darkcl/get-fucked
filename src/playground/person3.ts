function UpperCase(target, name, desc) {
  return {
    enumerable: false,
    configurable: false,
    get: function () {
      return desc.get.call(this).toUpperCase();
    },
    set: function (name) {
      desc.set.call(this, name.split(" "));
    },
  };
}

class Person {
  constructor(public firstName: string, public lastName: string) {}

  @UpperCase
  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  set fullName([firstName, lastName]) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

var person = new Person("Da", "Faq");
console.log("fullname ->", person.fullName);
console.log("person ->", person);

person.fullName = "But why";
console.log("fullname ->", person.fullName);
