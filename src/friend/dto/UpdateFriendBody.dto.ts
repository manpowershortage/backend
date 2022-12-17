import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'
import { FriendStatus } from '../entities/friend.entity'

export class UpdateFriendBodyDto {
  @IsNotEmpty()
  @IsUUID()
    friendId: string

  @IsNotEmpty()
  @IsEnum(FriendStatus)
    status: FriendStatus.ACCEPTED | FriendStatus.REJECTED | FriendStatus.BLOCKED
}
