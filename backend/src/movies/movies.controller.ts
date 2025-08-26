import { Controller, Get, Post, Delete, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  search(@Query('term') term: string) {
    return this.moviesService.search(term);
  }

  @Post(':imdbId')
  add(@Param('imdbId') imdbId: string) {
    return this.moviesService.add(imdbId);
  }

  @Delete(':imdbId')
  remove(@Param('imdbId') imdbId: string) {
    return this.moviesService.remove(imdbId);
  }

  @Get()
  list() {
    return this.moviesService.list();
  }
}