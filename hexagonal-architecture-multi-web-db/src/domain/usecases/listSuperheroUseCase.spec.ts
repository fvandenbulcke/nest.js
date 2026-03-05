import { UUID } from 'node:crypto';
import { SuperHero } from '../models/superHero';
import { SuperheroRepository } from '../ports/out/superheroRepository';
import { ListSuperheroesUseCase } from './listSuperheroesUseCase';

describe('ListSuperheroesUseCase', () => {
  it('should return founded superheroes', async () => {
    const superHeroId: UUID = '0f56a683-9eb5-4b46-ad44-4fb876064481';
    const mockSuperhero: SuperHero = new SuperHero(
      superHeroId,
      'Superman',
      new Set(['Flight', 'Super Strength']),
    );
    const superheroRepository: SuperheroRepository = {
      findAll: jest.fn().mockResolvedValue([mockSuperhero]),
      findById: jest.fn(),
    };

    const listSuperheroesUseCase = new ListSuperheroesUseCase(
      superheroRepository,
    );
    const result: SuperHero[] = await listSuperheroesUseCase.execute();
    expect(result).toEqual([mockSuperhero]);
  });
});
