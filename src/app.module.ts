import { Module } from '@nestjs/common';
import { PasswordModule } from './passwords/passwords.module';

@Module({
  imports: [PasswordModule],
})
export class AppModule {}
