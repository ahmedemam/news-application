import { Module, HttpModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [HttpModule, UserModule],
})
export class NewsModule {}
