import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperHeroDocument } from '@/infrastructure/ports/mongoDb/super.hero.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(SuperHeroDocument.name)
    private readonly itemModel: Model<SuperHeroDocument>,
  ) {}

  async findAll(): Promise<SuperHeroDocument[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.itemModel.findById(id).exec();
  }

  async create(item: SuperHeroDocument): Promise<SuperHeroDocument> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async update(id: string, item: SuperHeroDocument): Promise<any> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
