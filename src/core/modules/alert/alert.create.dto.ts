export class AlertCreateDto {
  name: string;
  service: string;
  repositories: string[];
  triggers: string[];
}
