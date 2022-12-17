import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateFriendBodyDto {
  @IsNotEmpty()
  @IsUUID()
    friendId: string
}
