/* eslint-disable prettier/prettier */

import { GetSuperheroUseCasePort, ListSuperheroesUseCasePort } from '@domain/ports/in/commands';
import { SuperheroRepository } from '@domain/ports/out/superheroRepository';
import { GetSuperheroUseCase } from '@domain/usecases/getSuperheroUseCase';
import { ListSuperheroesUseCase } from '@domain/usecases/listSuperheroesUseCase';
import { InMemorySuperheroRepository } from 'src/infrastructure/ports/inMemorySuperheroRepository';

console.log(process.env.PROFILE?.trim() === 'memory');

const superheroRepository: SuperheroRepository = new InMemorySuperheroRepository();
export const listSuperheroesUseCase: ListSuperheroesUseCasePort = new ListSuperheroesUseCase(superheroRepository);
export const getSuperheroUseCase: GetSuperheroUseCasePort = new GetSuperheroUseCase(superheroRepository);
