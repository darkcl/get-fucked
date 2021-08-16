export const ANSWERS_KEY = "answers";

type AnswerDecoratorOptions = {
  question: string;
  order: number;
};

export const Answer = ({ question, order }: AnswerDecoratorOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const answers = Reflect.getMetadata(ANSWERS_KEY, target.constructor) ?? {};

    answers[propertyKey] = { order, question };

    Reflect.defineMetadata(ANSWERS_KEY, answers, target.constructor);
  };
};
