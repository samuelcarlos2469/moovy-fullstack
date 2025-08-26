// src/audio-reviews/audio-review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

export enum AudioReviewStatus {
  PENDING_SYNC = 'PENDING_SYNC',
  SYNCED = 'SYNCED',
}

@Entity()
export class AudioReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileUrl: string;

  @Column({
    type: 'enum',
    enum: AudioReviewStatus,
    default: AudioReviewStatus.PENDING_SYNC,
  })
  status: AudioReviewStatus;

  @OneToOne(() => Movie, movie => movie.audioReview)
  @JoinColumn()
  movie: Movie;
}