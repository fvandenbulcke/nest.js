import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, IsNumber, IsBoolean, IsArray, IsOptional, 
  IsEmail, IsEnum, IsUUID, IsDateString,
  Min, Max, MinLength, MaxLength, Matches,
  ValidateNested, IsInt, IsDate, ArrayMaxSize, ArrayMinSize,
  IsObject
} from 'class-validator';
import { Type } from 'class-transformer';

export class ArrayOfHeroesDto {
}

export class HeroDto {
  /**
   * Identifier of the hero
   */
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'Identifier of the hero' })
  id: string;

  /**
   * Name of the hero
   */
  @IsString()
  @ApiProperty({ description: 'Name of the hero', example: "batman" })
  name: string;

  /**
   * Powers of the hero
   */
  @IsArray()
  @ApiProperty({ description: 'Powers of the hero', isArray: true, type: () => String })
  powers: string[];

}

export class ErreurDto {
  @IsString()
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  message: string;

}

