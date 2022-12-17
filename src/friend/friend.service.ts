import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { CreateFriendBodyDto } from './dto/CreateFriendBody.dto'
import { UpdateFriendBodyDto } from './dto/UpdateFriendBody.dto'
import { Friend, FriendStatus } from './entities/friend.entity'

@Injectable()
export class FriendService {
  constructor (
    private readonly userService: UserService,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>
  ) {}

  public async getFriends (userId: string): Promise<Friend[]> {
    const friends = await this.friendRepository.find({
      where: [{ userId }, { friendId: userId }],
      relations: { user: true }
    })

    return friends
  }

  public async getFriend (userId: string, friendId: string): Promise<Friend> {
    const friend = await this.friendRepository.findOne({
      where: [{ userId, friendId }, { userId: friendId, friendId: userId }],
      relations: { user: true }
    })
    if (friend == null) throw new NotFoundException()

    return friend
  }

  public async createFriend (userId: string, body: CreateFriendBodyDto): Promise<Friend> {
    const { friendId } = body
    const friend = await this.userService.findById(friendId)
    if (friend == null) throw new NotFoundException()

    const existingFriend = await this.friendRepository.findOne({
      where: [
        { userId, friendId, status: FriendStatus.PENDING | FriendStatus.ACCEPTED | FriendStatus.BLOCKED },
        { userId: friendId, friendId: userId, status: FriendStatus.PENDING | FriendStatus.ACCEPTED | FriendStatus.BLOCKED }
      ]
    })
    if (existingFriend != null) throw new BadRequestException()

    const saveFriend = await this.friendRepository.save({
      userId,
      friendId,
      status: FriendStatus.PENDING
    })
    return saveFriend
  }

  public async updateFriend (userId: string, body: UpdateFriendBodyDto): Promise<Friend> {
    const { friendId, status } = body
    const friend = await this.getFriend(userId, friendId)
    if (friend == null) throw new NotFoundException()
    friend.status = status

    const saveFriend = await this.friendRepository.save(friend)
    return saveFriend
  }
}
