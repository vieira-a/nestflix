import { Module } from '@nestjs/common';
import { RegisterModule } from './user/register/register.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from '../src/config/postgre.service';
import { SignInModule } from './user/signin/signin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    RegisterModule,
    SignInModule,
  ],
})
export class AppModule {}
