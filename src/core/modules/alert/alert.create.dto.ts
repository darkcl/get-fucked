import { Answer } from "~lib/injector";

export class AlertCreateDto {
  @Answer({ question: "What is the title of the alert?", order: 0 })
  name: string;

  @Answer({ question: "What is the short name of the alert?", order: 1 })
  shortName: string;

  @Answer({ question: "What is the name of the service?", order: 2 })
  service: string;

  @Answer({
    question: "What are the repositories should I listen to (comma separated)?",
    order: 3,
    handler: (answer: string) => answer.split(","),
  })
  repositories: string[];

  @Answer({
    question: "What are the keywords should I listen to (comma separated)?",
    order: 4,
    handler: (answer: string) => answer.split(","),
  })
  triggers: string[];
}
