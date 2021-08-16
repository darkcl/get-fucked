import { Answer } from "~lib/injector";

export class AlertUpdateDto {
  @Answer({ question: "Update title?", order: 0 })
  name: string;

  @Answer({ question: "Update service?", order: 1 })
  service: string;

  @Answer({
    question: "Update repositories (comma separated)?",
    order: 2,
    handler: (answer: string) => answer.split(","),
  })
  repositories: string[];

  @Answer({
    question: "Update triggers (comma separated)?",
    order: 3,
    handler: (answer: string) => answer.split(","),
  })
  triggers: string[];
}
