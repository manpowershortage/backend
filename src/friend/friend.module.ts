import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { Friend } from './entities/friend.entity'
import { FriendService } from './friend.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend]),
    forwardRef(() => UserModule)
  ],
  providers: [FriendService],
  exports: [FriendService]
})
export class FriendModule {}
