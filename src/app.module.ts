import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PostgresConfigService } from '../src/config/postgre.service';
import { AccountModule } from './user/account/account.module';
import { SignInModule } from './user/signin/signin.module';
import { jwtConstants } from './user/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    AccountModule,
    SignInModule,
  ],
})
export class AppModule {}
