import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';

export type Optional<T> = T | undefined;

export interface SuperheroRepository {
  findAll(): Promise<SuperHero[]>;
  findById(id: UUID): Promise<Optional<SuperHero>>;
}
