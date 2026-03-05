import { DynamicModule, Module, Type } from '@nestjs/common';
import { MongoDbModule } from './mongoDb.module';
import { PostgreSQLModule } from './postgreSQL.module';
import { InMemorySuperheroRepository } from '@/infrastructure/adapters/inMemorySuperheroRepository';
import { MongoDbSuperheroRepository } from '@/infrastructure/adapters/mongoDb/mongoDbSuperheroRepository';
import { PostgreSQLSuperheroRepository } from '@/infrastructure/adapters/postgreSQL/postgreSQLSuperheroRepository';
import { SuperheroRepository } from '@domain/ports/out/superheroRepository';

@Module({})
export class DatabaseModule {
  static forRoot(repositoryName: string): DynamicModule {
    const isMongoDbProfile = ['mongoDb'].includes(
      process.env.PROFILE?.trim() || '',
    );
    const isPostgreSQLProfile = ['postgres'].includes(
      process.env.PROFILE?.trim() || '',
    );

    const imports = [] as Array<Type<any>>;
    let instanceOfSuperheroRepositoryToUse: Type<SuperheroRepository> =
      InMemorySuperheroRepository;
    if (isMongoDbProfile) {
      imports.push(MongoDbModule);
      instanceOfSuperheroRepositoryToUse = MongoDbSuperheroRepository;
    } else if (isPostgreSQLProfile) {
      imports.push(PostgreSQLModule);
      instanceOfSuperheroRepositoryToUse = PostgreSQLSuperheroRepository;
    }

    return {
      module: DatabaseModule,
      imports,
      providers: [
        {
          provide: repositoryName,
          useClass: instanceOfSuperheroRepositoryToUse,
        },
      ],
      exports: [repositoryName],
    };
  }
}
