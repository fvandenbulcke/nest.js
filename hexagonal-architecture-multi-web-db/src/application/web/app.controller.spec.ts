import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../app.service';
import { SuperHeroController } from './heroes.controller';

describe('SuperHeroController', () => {
  let appController: SuperHeroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SuperHeroController],
      providers: [AppService],
    }).compile();

    appController = app.get<SuperHeroController>(SuperHeroController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllSuperHeroes()).toBe('Hello World!');
    });
  });
});
