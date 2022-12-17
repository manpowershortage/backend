import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { Group } from './entities/Group.entity'
import { GroupUser } from './entities/GroupUser.entity'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupUser]),
    UserModule
  ],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
