import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import { GetSuperheroUseCasePort } from '@domain/ports/in/commands';
import { SuperheroRepository } from '@domain/ports/out/superheroRepository';
import { SuperheroNotFoundError } from '@/domain/errors/domainErrors';

export class GetSuperheroUseCase implements GetSuperheroUseCasePort {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  async execute(id: UUID): Promise<SuperHero> {
    const superhero = await this.superheroRepository.findById(id);

    if (!superhero) {
      throw new SuperheroNotFoundError(id);
    }

    return superhero;
  }
}
