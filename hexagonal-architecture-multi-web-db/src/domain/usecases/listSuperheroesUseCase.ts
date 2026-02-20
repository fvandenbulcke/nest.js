import { SuperHero } from '@domain/models/superHero';
import { ListSuperheroesUseCasePort } from '@domain/ports/in/commands';
import { SuperheroRepository } from '@domain/ports/out/superheroRepository';

export class ListSuperheroesUseCase implements ListSuperheroesUseCasePort {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  execute(): Promise<SuperHero[]> {
    return this.superheroRepository.findAll();
  }
}
