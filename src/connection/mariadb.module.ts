import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'stady'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'stady'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class MariaDBModule {}
