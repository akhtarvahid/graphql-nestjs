import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: 'mongodb://localhost/blogging',
    useUnifiedTopology: true,
    port: 28017,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
      return {
        type: 'mongodb',
        url: 'mongodb://localhost/blogging',
        useUnifiedTopology: true,
        port: 28017,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: true,
      };
    },
  };