import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PostgresConfigService } from './config/postgre.service';
import { AccountModule } from './user/account/account.module';
import { SignInModule } from './user/signin/signin.module';
import { jwtConstants } from './user/utils';
import { MovieModule } from './movie/movie.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule,
    AccountModule,
    SignInModule,
    MovieModule,
  ],
})
export class AppModule {}
