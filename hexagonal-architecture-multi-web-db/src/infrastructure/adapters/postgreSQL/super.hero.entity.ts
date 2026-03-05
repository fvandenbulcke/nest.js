import { SuperHero } from '@domain/models/superHero';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, Generated } from 'typeorm';
import type { UUID } from 'node:crypto';
import { SuperHeroPowerEntity } from './super.hero.power.entity';

@Entity('super_heroes')
export class SuperHeroEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: UUID;

  @Column()
  name!: string;

  @ManyToMany(() => SuperHeroPowerEntity, (power) => power.heroes, {
    eager: true,
  })
  @JoinTable({
    name: 'super_hero_powers_relation',
    joinColumn: { name: 'super_hero_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'power_id', referencedColumnName: 'id' },
  })
  powers!: SuperHeroPowerEntity[];

  toDomain(): SuperHero {
    const powerNames = this.powers?.map((p) => p.name) || [];
    return new SuperHero(this.id, this.name, new Set(powerNames));
  }

  static fromDomain(hero: SuperHero): SuperHeroEntity {
    const entity = new SuperHeroEntity();
    entity.id = hero.getId();
    entity.name = hero.getName();
    // Les pouvoirs seront gérés séparément dans le repository
    return entity;
  }
}
