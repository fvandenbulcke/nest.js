import { UUID } from 'node:crypto';

export class SuperHero {
  private readonly id: UUID;
  private readonly name: string;
  private readonly powers: Set<string>;

  constructor(id: UUID, name: string, powers: Set<string>) {
    this.id = id;
    this.name = name;
    this.powers = powers;
  }
}
