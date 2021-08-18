import "reflect-metadata";
const requiredMetadataKey = Symbol("required");

function Required(target, name, index) {
  const required: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, name) || [];
  required.push(index);
  Reflect.defineMetadata(requiredMetadataKey, required, target, name);
}

function Validate(target, name, descriptor) {
  const method = descriptor.value!;

  descriptor.value = function () {
    const required: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      name
    );
    if (required) {
      for (let parameterIndex of required) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}

class Person {
  constructor() {}

  @Validate
  live(@Required food?: string) {
    console.log("A person live by eating", food);
  }
}

const person = new Person();
person.live();
