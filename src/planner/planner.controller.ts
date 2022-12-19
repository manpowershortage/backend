import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthcationGuard } from 'src/auth/guard/Authcation.guard'
import { User } from 'src/user/entities/user.entity'
import { CreatePlannerBodyDto } from './dto/CreatePlannerBody.dto'
import { UpdatePlannerBodyDto } from './dto/UpdatePlannerBody.dto'
import { Planner } from './entities/Planner.entity'
import { PlannerService } from './planner.service'

@Controller('planner')
export class PlannerController {
  constructor (
    private readonly plannerService: PlannerService
  ) {}

  @Get()
  @UseGuards(AuthcationGuard)
  async getPlanners (@Req() req: Request): Promise<Planner[]> {
    const { userId } = req.user as User
    return await this.plannerService.getPlanners(userId)
  }

  @Get(':plannerId')
  @UseGuards(AuthcationGuard)
  async getPlanner (@Req() req: Request, @Param('plannerId') plannerId: string): Promise<Planner> {
    const { userId } = req.user as User
    return await this.plannerService.getPlanner(userId, plannerId)
  }

  @Post()
  @UseGuards(AuthcationGuard)
  async createPlanner (@Req() req: Request, @Body() body: CreatePlannerBodyDto): Promise<Planner> {
    const { userId } = req.user as User
    return await this.plannerService.createPlanner(userId, body)
  }

  @Patch(':plannerId')
  @UseGuards(AuthcationGuard)
  async updatePlanner (@Req() req: Request, @Param('plannerId') plannerId: string, @Body() body: UpdatePlannerBodyDto): Promise<Planner> {
    const { userId } = req.user as User
    return await this.plannerService.updatePlanner(userId, plannerId, body)
  }

  @Delete(':plannerId')
  @UseGuards(AuthcationGuard)
  async deletePlanner (@Req() req: Request, @Param('plannerId') plannerId: string): Promise<void> {
    const { userId } = req.user as User
    return await this.plannerService.deletePlanner(userId, plannerId)
  }
}
