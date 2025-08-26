// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async search(term: string) {
    const apiKey = this.configService.get<string>('OMDB_API_KEY');
    const response = await firstValueFrom(
        this.httpService.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${term}`)
    );
    return response.data;
  }

  // pra biblioteca propria por user
  add(userId: string, imdbId: string): Promise<Movie> {
    const newMovie = this.moviesRepository.create({ imdbId, user: { id: userId } });
    return this.moviesRepository.save(newMovie);
  }

  async remove(userId: string, imdbId: string): Promise<void> {
    await this.moviesRepository.delete({ imdbId, user: { id: userId } });
  }

  list(userId: string): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { user: { id: userId } } });
  }
}