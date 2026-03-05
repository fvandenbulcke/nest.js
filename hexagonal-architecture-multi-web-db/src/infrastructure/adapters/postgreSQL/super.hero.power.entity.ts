import { Entity, Column, PrimaryColumn, ManyToMany, Generated } from 'typeorm';
import type { UUID } from 'node:crypto';
import { SuperHeroEntity } from './super.hero.entity';

@Entity('super_hero_power')
export class SuperHeroPowerEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: UUID;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => SuperHeroEntity, (hero) => hero.powers)
  heroes!: SuperHeroEntity[];
}
