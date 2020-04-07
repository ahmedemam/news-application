import { Module, HttpModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
    imports: [HttpModule, UserModule],
    controllers: [NewsController],
    providers: [NewsService]
})
export class NewsModule {}
