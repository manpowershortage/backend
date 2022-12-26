import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as shajs from 'sha.js'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { CreateGroupBodyDto } from './dto/CreateGroupBody.dto'
import { JoinGroupBodyDto } from './dto/JoinGroupBody.dto'
import { UpdateGroupBodyDto } from './dto/UpdateGroupBody.dto'
import { Group } from './entities/Group.entity'
import { GroupUser, GroupUserStatus } from './entities/GroupUser.entity'

@Injectable()
export class GroupService {
  constructor (
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
    private readonly userService: UserService
  ) {}

  async getGroup (groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { groupId },
      select: ['groupId', 'name', 'description', 'maxUserCount', 'createdAt']
    })
    if (group == null) throw new ForbiddenException('Group not found')
    return group
  }

  async getGroups (page: number | 0, limit: number): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      where: { isPrivate: false },
      skip: (page - 1) * limit,
      take: limit,
      select: ['groupId', 'name', 'description', 'maxUserCount', 'createdAt']
    })
    return groups
  }

  async getGroupUsers (groupId: string, page: number, limit: number, status: GroupUserStatus): Promise<GroupUser[]> {
    const groupUsers = await this.groupUserRepository.find({
      where: { groupId, status },
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      select: { user: { username: true, image: true }, status: true, createdAt: true }
    })

    return groupUsers
  }

  async createGroup (userId: string, body: CreateGroupBodyDto): Promise<Group> {
    const userGroup = await this.groupRepository.find({ where: { ownerId: userId } })
    if (userGroup.length > 4) throw new ForbiddenException('You can only create up to 5 groups')

    const { name, description, password, isConfirm, isPrivate, maxUserCount } = body
    let salt: string | null = null
    if (password != null) salt = shajs('sha512').update(Math.random().toString()).digest('hex').slice(0, 8) as string
    const hashedPassword = password != null && salt != null ? shajs('sha512', password + salt).digest('hex') : null

    const group = await this.groupRepository.save({
      name,
      description,
      password: hashedPassword ?? undefined,
      salt: salt ?? undefined,
      isConfirm,
      isPrivate,
      maxUserCount,
      ownerId: userId
    })
    return group
  }

  async updateGroup (userId: string, groupId: string, body: UpdateGroupBodyDto): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { groupId } })
    if (group == null) throw new ForbiddenException('Group not found')
    if (group.ownerId !== userId) throw new ForbiddenException('You are not the owner of the group')

    const { password } = body
    let salt: string | null = null
    if (password != null) salt = shajs('sha512').update(Math.random().toString()).digest('hex').slice(0, 8) as string
    const hashedPassword = password != null && salt != null ? shajs('sha512', password + salt).digest('hex') : null

    await this.groupRepository.update({ groupId }, {
      ...body,
      password: hashedPassword ?? undefined,
      salt: salt ?? undefined
    })

    const updatedGroup = await this.groupRepository.findOne({ where: { groupId } })
    if (updatedGroup == null) throw new ForbiddenException('Group not found')

    return updatedGroup
  }

  async deleteGroup (userId: string, groupId: string): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { groupId } })
    if (group == null) throw new ForbiddenException('Group not found')
    if (group.ownerId !== userId) throw new ForbiddenException('You are not the owner of the group')

    await this.groupRepository.delete({ groupId })
  }

  async joinGroup (userId: string, groupId: string, body: JoinGroupBodyDto): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { groupId } })
    if (group == null) throw new ForbiddenException('Group not found')

    const user = await this.groupUserRepository.findOne({ where: { userId, groupId } })
    if (user !== null && user.status !== GroupUserStatus.BLOCKED) throw new ForbiddenException('You are already in the group')
    if (user !== null && user.status === GroupUserStatus.BLOCKED) throw new ForbiddenException('You are blocked from the group')

    if (group.isPrivate) {
      const { password } = body
      if (password == null) throw new ForbiddenException('Password is required')
      if (group.password == null || group.salt == null) throw new ForbiddenException('Group password is not set')
      if (group.password !== shajs('sha512', password + group.salt).digest('hex')) throw new ForbiddenException('Password is incorrect')
    }

    if (group.isConfirm) {
      await this.groupUserRepository.save({
        userId,
        groupId,
        status: GroupUserStatus.PENDING
      })
      return
    }

    await this.groupUserRepository.save({
      userId,
      groupId,
      status: GroupUserStatus.ACCEPTED
    })
  }

  async leaveGroup (userId: string, groupId: string): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { groupId } })
    if (group == null) throw new ForbiddenException('Group not found')

    const user = await this.groupUserRepository.findOne({ where: { userId, groupId } })
    if (user == null) throw new ForbiddenException('You are not in the group')

    await this.groupUserRepository.delete({ userId, groupId })
  }

  async updateUser (userId: string, groupId: string, targetUserId: string, status: GroupUserStatus): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { groupId } })
    if (group == null) throw new ForbiddenException('Group not found')
    if (group.ownerId !== userId) throw new ForbiddenException('You are not the owner of the group')

    const user = await this.groupUserRepository.findOne({ where: { userId: targetUserId, groupId } })
    if (user == null) throw new ForbiddenException('User is not in the group')

    await this.groupUserRepository.update({ userId: targetUserId, groupId }, {
      status
    })
  }
}
