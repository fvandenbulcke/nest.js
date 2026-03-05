import { UUID } from 'node:crypto';
import { SuperHero } from '../models/superHero';
import { SuperheroRepository } from '../ports/out/superheroRepository';
import { GetSuperheroUseCase } from './getSuperheroUseCase';

describe('GetSuperheroUseCase', () => {
  describe('Super hero is found', () => {
    it('should return a superhero when found', async () => {
      const superHeroId: UUID = '0f56a683-9eb5-4b46-ad44-4fb876064481';
      const mockSuperhero: SuperHero = new SuperHero(
        superHeroId,
        'Superman',
        new Set(['Flight', 'Super Strength']),
      );
      const superheroRepository: SuperheroRepository = {
        findAll: jest.fn(),
        findById: jest.fn().mockResolvedValue(mockSuperhero),
      };

      const getSuperheroUseCase = new GetSuperheroUseCase(superheroRepository);
      const result: SuperHero = await getSuperheroUseCase.execute(superHeroId);

      expect(result).toEqual(mockSuperhero);
    });
  });

  describe('Super hero is not found', () => {
    it.each([null, undefined])(
      'should throw an error when return superhero is %s',
      (superhero) => {
        const superHeroId: UUID = '0f56a683-9eb5-4b46-ad44-4fb876064481';
        const superheroRepository: SuperheroRepository = {
          findAll: jest.fn(),
          findById: jest.fn().mockResolvedValue(superhero),
        };

        const getSuperheroUseCase = new GetSuperheroUseCase(
          superheroRepository,
        );
        return expect(async () => {
          await getSuperheroUseCase.execute(superHeroId);
        }).rejects.toThrow(
          new Error(
            'Superhero with id 0f56a683-9eb5-4b46-ad44-4fb876064481 not found',
          ),
        );
      },
    );
  });
});
