import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperHeroEntity } from '@/infrastructure/adapters/postgreSQL/super.hero.entity';
import { SuperHeroPowerEntity } from '@/infrastructure/adapters/postgreSQL/super.hero.power.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number.parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [SuperHeroEntity, SuperHeroPowerEntity],
      synchronize: false,
      migrationsRun: true,
      migrations: [
        __dirname + '/../../infrastructure/adapters/postgreSQL/migrations/*.js',
      ],
      logging: process.env.POSTGRES_LOG_REQUESTS === 'true',
    }),
    TypeOrmModule.forFeature([SuperHeroEntity, SuperHeroPowerEntity]),
  ],
  exports: [TypeOrmModule],
})
export class PostgreSQLModule {}
