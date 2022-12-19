import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MariaDBModule } from './connection/mariadb.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { GroupModule } from './group/group.module'
import { FriendModule } from './friend/friend.module'
import { ChatModule } from './chat/chat.module'
import { ScoreModule } from './score/score.module'
import { SubjectModule } from './subject/subject.module'
import { ArticleModule } from './article/article.module'
import { PlannerModule } from './planner/planner.module'
import { TodoModule } from './todo/todo.module'

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
    FriendModule,
    ChatModule,
    ScoreModule,
    SubjectModule,
    ArticleModule,
    PlannerModule,
    TodoModule
  ]
})
export class AppModule {}
