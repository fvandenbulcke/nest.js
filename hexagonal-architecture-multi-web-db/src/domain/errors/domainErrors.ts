import { UUID } from 'node:crypto';

export class SuperheroNotFoundError extends Error {
  constructor(id: UUID) {
    super(`Superhero with id ${id} not found`);
  }
}
