import { Module } from "~lib/modules/decorators";
import { AlertModule } from "./alert";

@Module({
  imports: [AlertModule],
})
export class RootModule {}
