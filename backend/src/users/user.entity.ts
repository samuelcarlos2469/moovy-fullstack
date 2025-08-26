// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string; // Para a senha, usaremos um hash. Não armazene a senha em texto puro!

  @OneToMany(() => Movie, movie => movie.user)
  movies: Movie[];
}