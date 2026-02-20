import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import {
  Optional,
  SuperheroRepository,
} from '@domain/ports/out/superheroRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemorySuperheroRepository implements SuperheroRepository {
  private readonly superheroes: Map<UUID, SuperHero> = new Map();

  constructor() {
    this.superheroes.set(
      '00000000-0000-0000-0000-000000000001',
      new SuperHero(
        '00000000-0000-0000-0000-000000000001',
        'Captain Kotlin',
        new Set(['Super typing', 'Null-safety punch']),
      ),
    );
    this.superheroes.set(
      '00000000-0000-0000-0000-000000000002',
      new SuperHero(
        '00000000-0000-0000-0000-000000000002',
        'The JVM Whisperer',
        new Set(['Bytecode control', 'GC whisper']),
      ),
    );
  }

  findAll(): Promise<SuperHero[]> {
    return Promise.resolve(Array.from(this.superheroes.values()));
  }
  findById(id: UUID): Promise<Optional<SuperHero>> {
    return Promise.resolve(this.superheroes.get(id));
  }
}
