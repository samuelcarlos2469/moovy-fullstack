// src/movies/movies.controller.ts
import { Controller, Get, Post, Delete, Query, Param, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  search(@Query('term') term: string) {
    return this.moviesService.search(term);
  }
  @Get('details/:imdbId')
  findOne(@Param('imdbId') imdbId: string) {
    return this.moviesService.findOne(imdbId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':imdbId')
  add(@Param('imdbId') imdbId: string, @Request() req: any) {
    return this.moviesService.add(req.user.userId, imdbId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':imdbId')
  remove(@Param('imdbId') imdbId: string, @Request() req: any) {
    return this.moviesService.remove(req.user.userId, imdbId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  list(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.list(req.user.userId, page, limit);
  }
}