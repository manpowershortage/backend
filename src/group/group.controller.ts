import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthcationGuard } from 'src/auth/guard/Authcation.guard'
import { User } from 'src/user/entities/user.entity'
import { CreateGroupBodyDto } from './dto/CreateGroupBody.dto'
import { JoinGroupBodyDto } from './dto/JoinGroupBody.dto'
import { UpdateGroupBodyDto } from './dto/UpdateGroupBody.dto'
import { Group } from './entities/Group.entity'
import { GroupUser, GroupUserStatus } from './entities/GroupUser.entity'
import { GroupService } from './group.service'

@Controller('group')
export class GroupController {
  constructor (
    private readonly groupService: GroupService
  ) {}

  @Get()
  async listGroup (@Query('page') page: number, @Query('limit') limit: number): Promise<Group[]> {
    return await this.groupService.getGroups(page, limit)
  }

  @Post()
  @UseGuards(AuthcationGuard)
  async createGroup (@Req() req: Request, @Body() body: CreateGroupBodyDto): Promise<Group> {
    const { userId } = req.user as User
    return await this.groupService.createGroup(userId, body)
  }

  @Get(':groupId')
  async getGroup (@Query('groupId') groupId: string): Promise<Group> {
    return await this.groupService.getGroup(groupId)
  }

  @Patch(':groupId')
  @UseGuards(AuthcationGuard)
  async updateGroup (@Req() req: Request, @Query('groupId') groupId: string, @Body() body: UpdateGroupBodyDto): Promise<Group> {
    const { userId } = req.user as User
    return await this.groupService.updateGroup(userId, groupId, body)
  }

  @Delete(':groupId')
  @UseGuards(AuthcationGuard)
  async deleteGroup (@Req() req: Request, @Query('groupId') groupId: string): Promise<void> {
    const { userId } = req.user as User
    return await this.groupService.deleteGroup(userId, groupId)
  }

  @Post(':groupId/join')
  @UseGuards(AuthcationGuard)
  async joinGroup (@Req() req: Request, @Query('groupId') groupId: string, @Body() body: JoinGroupBodyDto): Promise<void> {
    const { userId } = req.user as User
    return await this.groupService.joinGroup(userId, groupId, body)
  }

  @Post(':groupId/leave')
  @UseGuards(AuthcationGuard)
  async leaveGroup (@Req() req: Request, @Query('groupId') groupId: string): Promise<void> {
    const { userId } = req.user as User
    return await this.groupService.leaveGroup(userId, groupId)
  }

  @Get(':groupId/user')
  async listGroupUser (@Query('groupId') groupId: string, @Query('page') page: number, @Query('limit') limit: number, @Query('status') status: GroupUserStatus): Promise<GroupUser[]> {
    return await this.groupService.getGroupUsers(groupId, page, limit, status)
  }

  @Post(':groupId/user/:targetId')
  @UseGuards(AuthcationGuard)
  async changeGroupUserStatus (@Req() req: Request, @Query('groupId') groupId: string, @Query('targetId') targetId: string, @Body('status') status: GroupUserStatus): Promise<void> {
    const { userId } = req.user as User
    return await this.groupService.updateUser(userId, groupId, targetId, status)
  }
}
