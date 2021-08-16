import { Answer } from "~lib/injector";

export class AlertCreateDto {
  @Answer({ question: "What is the title of the alert?", order: 0 })
  name: string;

  @Answer({ question: "What is the name of the service?", order: 1 })
  service: string;

  @Answer({
    question: "What is the repositories should I listen to (comma separated)?",
    order: 2,
    handler: (answer: string) => answer.split(","),
  })
  repositories: string[];

  @Answer({
    question: "What is the keywords should I listen to (comma separated)?",
    order: 3,
    handler: (answer: string) => answer.split(","),
  })
  triggers: string[];
}
