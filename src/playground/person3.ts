function UpperCase3(target, name, desc) {
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

class Person3 {
  constructor(public firstName: string, public lastName: string) {}

  @UpperCase3
  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  set fullName([firstName, lastName]) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person3 = new Person3("Da", "Faq");
console.log("fullname ->", person3.fullName);
console.log("person ->", person3);

person3.fullName = "But why";
console.log("fullname ->", person3.fullName);
