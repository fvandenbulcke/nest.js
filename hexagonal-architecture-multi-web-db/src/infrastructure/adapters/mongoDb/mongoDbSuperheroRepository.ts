import { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import {
  Optional,
  SuperheroRepository,
} from '@domain/ports/out/superheroRepository';
import { Model } from 'mongoose';
import { SuperHeroDocument } from './super.hero.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDbSuperheroRepository implements SuperheroRepository {
  constructor(
    @InjectModel(SuperHeroDocument.name)
    private readonly superHeroModel: Model<SuperHeroDocument>,
  ) {}

  findAll(): Promise<SuperHero[]> {
    return this.superHeroModel
      .find()
      .exec()
      .then((docs) => docs.map((doc) => doc.toDomain()));
  }
  findById(id: UUID): Promise<Optional<SuperHero>> {
    return this.superHeroModel
      .findById(id)
      .exec()
      .then((doc) => doc && doc.toDomain());
  }
}
