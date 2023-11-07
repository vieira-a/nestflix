import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import 'dotenv/config';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_URI,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PWD,
    });
  }

  getClient(): Redis {
    return this.client;
  }
}
