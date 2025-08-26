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

  add(imdbId: string): Promise<Movie> {
    const newMovie = this.moviesRepository.create({ imdbId });
    return this.moviesRepository.save(newMovie);
  }

  async remove(imdbId: string): Promise<void> {
    await this.moviesRepository.delete({ imdbId });
  }

  list(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
}