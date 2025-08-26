import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './movies/movie.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //  configuração disponive globalmente
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Movie], // add aqui as entidades
        synchronize: true, // pra iniciar sóm, em dev
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}