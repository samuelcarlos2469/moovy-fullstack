// usar isso aqui pra aprender como usar o TypeORM
import { User } from '../users/user.entity';
import { AudioReview } from '../audio-reviews/audio-review.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imdbId: string; // Ex: tt0111161 (id IMDB de Um Sonho de Liberdade)
  // adicionar um relacionamento com a @entidade User
  // vários filmes podem ser de um único usuário
  @ManyToOne(() => User, user => user.movies)
  user: User;
  // e com a @entidade AudioReview
    // 1/1
  @OneToOne(() => AudioReview, audioReview => audioReview.movie)
  audioReview: AudioReview;
}

