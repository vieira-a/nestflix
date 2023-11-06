import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import 'dotenv/config';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_URI,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PWD,
    }),
  ],
})
export class RedisModule {}
