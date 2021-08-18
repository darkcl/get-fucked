import { Answer } from "~lib/injector";

export class AlertCreateDto {
  @Answer({ question: "What is the title of the alert?" })
  name: string;

  @Answer({ question: "What is the short name of the alert?" })
  shortName: string;

  @Answer({ question: "What is the name of the service?" })
  service: string;

  @Answer({
    question: "What are the repositories should I listen to (comma separated)?",
    handler: (answer: string) => answer.split(","),
  })
  repositories: string[];

  @Answer({
    question: "What are the keywords should I listen to (comma separated)?",
    handler: (answer: string) => answer.split(","),
  })
  triggers: string[];
}
