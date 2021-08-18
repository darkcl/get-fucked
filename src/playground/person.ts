import "reflect-metadata";

function Freeze(target: Function) {
  Object.freeze(target);
  Object.freeze(target.prototype);
}

@Freeze
class Person {
  static version: string = "v1.0.0";

  constructor(public firstName: string, public lastName: string) {}

  getFullName(): string {
    return this.firstName + " " + this.firstName;
  }
}

Person.version = "v1.0.1";
// ❌ Error => TypeError: Cannot assign to read only property 'version' of function 'class Person'

Person.prototype.getFullName = null;
