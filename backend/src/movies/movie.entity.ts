// usar isso aqui pra aprender como usar o TypeORM

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imdbId: string; // Ex: tt0111161 (id no IMDB de Um Sonho de Liberdade)
  // adicionar um relacionamento com a @entidade User
  // e com a @entidade AudioReview
}

