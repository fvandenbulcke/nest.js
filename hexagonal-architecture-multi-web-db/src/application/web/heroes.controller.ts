import { Controller, Get, Inject, Param } from '@nestjs/common';
import type { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import type {
  GetSuperheroUseCasePort,
  ListSuperheroesUseCasePort,
} from '@domain/ports/in/commands';

@Controller('/heroes')
export class SuperHeroController {
  constructor(
    @Inject('ListSuperheroesUseCasePort')
    private readonly listSuperheroesUseCasePort: ListSuperheroesUseCasePort,
    @Inject('GetSuperheroUseCasePort')
    private readonly getSuperheroUseCasePort: GetSuperheroUseCasePort,
  ) {}

  @Get()
  async getAllSuperHeroes(): Promise<SuperHero[]> {
    return this.listSuperheroesUseCasePort.execute();
  }

  @Get(':id')
  async getSuperHeroById(
    @Param() params: { id: UUID },
  ): Promise<SuperHero | undefined> {
    return this.getSuperheroUseCasePort.execute(params.id);
  }
}
