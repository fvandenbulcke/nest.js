import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { SuperHeroController } from './heroes.controller';
import { SuperHero } from '@domain/models/superHero';
import type {
  GetSuperheroUseCasePort,
  ListSuperheroesUseCasePort,
} from '@domain/ports/in/commands';
import { UUID } from 'node:crypto';

describe('SuperHeroController (e2e)', () => {
  let app: INestApplication<App>;
  let listSuperheroesUseCase: ListSuperheroesUseCasePort;
  let getSuperheroUseCase: GetSuperheroUseCasePort;

  const listSuperheroesUseCaseExecuteMock = jest.fn();
  const getSuperheroUseCaseExecuteMock = jest.fn();

  beforeAll(() => {
    // Création des mocks pour les use cases
    listSuperheroesUseCase = {
      execute: listSuperheroesUseCaseExecuteMock,
    } as ListSuperheroesUseCasePort;

    getSuperheroUseCase = {
      execute: getSuperheroUseCaseExecuteMock,
    } as GetSuperheroUseCasePort;
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    // Configuration du module de test
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SuperHeroController],
      providers: [
        {
          provide: 'ListSuperheroesUseCasePort',
          useValue: listSuperheroesUseCase,
        },
        {
          provide: 'GetSuperheroUseCasePort',
          useValue: getSuperheroUseCase,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /heroes', () => {
    it('should return an array of heroes', async () => {
      // Arrange - Création de héros de test
      const mockHeroes = [
        new SuperHero(
          '0f56a683-9eb5-4b46-ad44-4fb876064481' as UUID,
          'Superman',
          new Set(['Flight', 'Super Strength']),
        ),
        new SuperHero(
          '1a23b456-7cd8-9ef0-1234-567890abcdef' as UUID,
          'Batman',
          new Set(['Intelligence', 'Gadgets']),
        ),
      ];

      listSuperheroesUseCaseExecuteMock.mockResolvedValue(mockHeroes);

      // Act & Assert
      const response = await request(app.getHttpServer())
        .get('/heroes')
        .expect(200);

      expect(response.body).toHaveLength(2);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body[0]).toEqual({
        id: '0f56a683-9eb5-4b46-ad44-4fb876064481',
        name: 'Superman',
        powers: expect.arrayContaining(['Flight', 'Super Strength']),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body[1]).toEqual({
        id: '1a23b456-7cd8-9ef0-1234-567890abcdef',
        name: 'Batman',
        powers: expect.arrayContaining(['Intelligence', 'Gadgets']),
      });
      expect(listSuperheroesUseCaseExecuteMock).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no heroes exist', async () => {
      // Arrange
      listSuperheroesUseCaseExecuteMock.mockResolvedValue([]);

      // Act & Assert
      const response = await request(app.getHttpServer())
        .get('/heroes')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(listSuperheroesUseCaseExecuteMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /heroes/:heroId', () => {
    it('should return a specific hero', async () => {
      // Arrange
      const heroId = '0f56a683-9eb5-4b46-ad44-4fb876064481';
      const mockHero = new SuperHero(
        heroId as UUID,
        'Superman',
        new Set(['Flight', 'Super Strength']),
      );

      getSuperheroUseCaseExecuteMock.mockResolvedValue(mockHero);

      // Act & Assert
      const response = await request(app.getHttpServer())
        .get(`/heroes/${heroId}`)
        .expect(200);

      expect(response.body).toEqual({
        id: heroId,
        name: 'Superman',
        powers: expect.arrayContaining(['Flight', 'Super Strength']),
      });
      expect(getSuperheroUseCaseExecuteMock).toHaveBeenCalledWith(heroId);
    });
  });
});
