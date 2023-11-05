import { Module } from '@nestjs/common';
import { AccountModule } from './user/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from '../src/config/postgre.service';
import { SignInModule } from './user/signin/signin.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user/utils/constants';

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
