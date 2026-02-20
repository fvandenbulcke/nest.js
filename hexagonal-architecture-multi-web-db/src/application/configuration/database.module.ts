import { DynamicModule, Module, Type } from '@nestjs/common';
import { MongoDbModule } from './mongoDb.module';
import { InMemorySuperheroRepository } from '@/infrastructure/ports/inMemorySuperheroRepository';
import { MongoDbSuperheroRepository } from '@/infrastructure/ports/mongoDb/mongoDbSuperheroRepository';

@Module({})
export class DatabaseModule {
  static forRoot(repositoryName: string): DynamicModule {
    const isMongoDbProfile = ['mongoDb'].includes(
      process.env.PROFILE?.trim() || '',
    );

    const imports = [] as Array<Type<any>>;
    if (isMongoDbProfile) {
      imports.push(MongoDbModule);
    }

    const instanceOfSuperheroRepositoryToUse = isMongoDbProfile
      ? MongoDbSuperheroRepository
      : InMemorySuperheroRepository;

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
