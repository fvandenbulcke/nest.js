import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';

interface ApplicationCommand<I, O> {
  execute(input: I): Promise<O>;
}

interface NoInputApplicationCommand<O> {
  execute(): Promise<O>;
}

export interface GetSuperheroUseCasePort extends ApplicationCommand<
  UUID,
  SuperHero
> {}

export interface ListSuperheroesUseCasePort extends NoInputApplicationCommand<
  SuperHero[]
> {}
