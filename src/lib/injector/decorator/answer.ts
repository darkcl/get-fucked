export const ANSWERS_KEY = "answers";

type AnswerHandler = (answer: string) => any;

type AnswerDecoratorOptions = {
  question: string;
  order: number;
  handler?: AnswerHandler;
};

export const Answer = ({
  question,
  order,
  handler = (answer) => answer,
}: AnswerDecoratorOptions) => {
  return (target: any, propertyKey: string) => {
    const answers = Reflect.getMetadata(ANSWERS_KEY, target.constructor) ?? {};

    answers[propertyKey] = { order, question, handler };

    Reflect.defineMetadata(ANSWERS_KEY, answers, target.constructor);
  };
};
