import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MariaDBModule } from './connection/mariadb.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { GroupModule } from './group/group.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MariaDBModule,
    UserModule,
    AuthModule,
    GroupModule,
    FriendModule
  ]
})
export class AppModule {}
