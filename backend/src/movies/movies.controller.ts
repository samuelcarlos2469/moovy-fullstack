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
  list(@Request() req: any) {
    return this.moviesService.list(req.user.userId);
  }
}