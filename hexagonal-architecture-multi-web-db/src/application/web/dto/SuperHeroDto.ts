import { SuperHero } from '@domain/models/superHero';
import { HeroDto } from '../generated/super-heroes.api.spec/super-heroes.api.spec.dto';

export class SuperHeroDto extends HeroDto {
  static fromDomain(superHero: SuperHero): HeroDto {
    const dto = new SuperHeroDto();
    dto.id = superHero.getId();
    dto.name = superHero.getName();
    dto.powers = Array.from(superHero.getPowers());
    return dto;
  }
}
