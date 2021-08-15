import { Module } from "~lib/modules/decorators";
import { RssModule } from "./rss";

@Module({
  imports: [RssModule],
})
export class RootModule {}
