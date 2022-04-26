import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Photo } from './photo/entity/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    PhotoModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'photocrud',
      entities: [Photo],
      synchronize: true,
      logging: true,
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: { origin: true, Credential: true },
      playground: true,
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
