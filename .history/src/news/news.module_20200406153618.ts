import { Module, HttpModule } from '@nestjs/common';
import * as NewsAPI from 'newsapi';

@Module({
    imports: [HttpModule],
})
export class NewsModule {}
