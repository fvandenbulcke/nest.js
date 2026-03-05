import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import {
  Optional,
  SuperheroRepository,
} from '@domain/ports/out/superheroRepository';
import { Repository } from 'typeorm';
import { SuperHeroEntity } from './super.hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgreSQLSuperheroRepository implements SuperheroRepository {
  constructor(
    @InjectRepository(SuperHeroEntity)
    private readonly superHeroRepository: Repository<SuperHeroEntity>,
  ) {}

  async findAll(): Promise<SuperHero[]> {
    const entities = await this.superHeroRepository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findById(id: UUID): Promise<Optional<SuperHero>> {
    return this.superHeroRepository
      .findOne({ where: { id } })
      .then((result) => result?.toDomain());
  }
}
