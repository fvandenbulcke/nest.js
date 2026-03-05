import {
Get, Post, Put, Patch, Delete,
Body, Param, Query, Headers, HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiHeader } from '@nestjs/swagger';
import { ArrayOfHeroesDto, ErreurDto, HeroDto } from './super-heroes.api.spec.dto';


@ApiTags('heroes')
export abstract class SuperHeroesApiSpecControllerBase {

    @Get('/heroes')
    @ApiOperation({ summary: 'Get all the super heroes' })
    @ApiResponse({ status: 200, type: [ArrayOfHeroesDto] })
    @ApiResponse({ status: 500, type: ErreurDto })
    _getAllSuperHeroes(
    ): Promise<ArrayOfHeroesDto[]> {
        return this.getAllSuperHeroes();
    }

    abstract getAllSuperHeroes(
    ): Promise<ArrayOfHeroesDto[]>;

    @Get('/heroes/:heroId')
    @ApiOperation({ summary: 'Get the informations about a super hero' })
    @ApiParam({ name: 'heroId', type: String })
    @ApiResponse({ status: 200, type: HeroDto })
    @ApiResponse({ status: 404, type: ErreurDto })
    @ApiResponse({ status: 500, type: ErreurDto })
    _getSuperHeroInformations(
        @Param('heroId') heroId: string
    ): Promise<HeroDto> {
        return this.getSuperHeroInformations(heroId);
    }

    abstract getSuperHeroInformations(
        heroId: string
    ): Promise<HeroDto>;
}