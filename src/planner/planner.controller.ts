import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthcationGuard } from 'src/auth/guard/Authcation.guard'
import { CreateTodoBodyDto } from 'src/todo/dto/CreateTodoBody.dto'
import { UpdateTodoBodyDto } from 'src/todo/dto/UpdateTodoBody.dto'
import { Todo } from 'src/todo/entities/todo.entity'
import { TodoService } from 'src/todo/todo.service'
import { User } from 'src/user/entities/user.entity'
import { CreatePlannerBodyDto } from './dto/CreatePlannerBody.dto'
import { UpdatePlannerBodyDto } from './dto/UpdatePlannerBody.dto'
import { UpdatePlannerUserBodyDto } from './dto/UpdatePlannerUserBody.dto'
import { Planner } from './entities/Planner.entity'
import { PlannerUser } from './entities/PlannerUser.entity'
import { PlannerService } from './planner.service'

@Controller('planner')
export class PlannerController {
  constructor (
    private readonly plannerService: PlannerService,
    private readonly todoService: TodoService
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

  @Post(':plannerId/join')
  @UseGuards(AuthcationGuard)
  async joinPlanner (@Req() req: Request, @Param('plannerId') plannerId: string): Promise<PlannerUser> {
    const { userId } = req.user as User
    return await this.plannerService.joinPlanner(plannerId, userId)
  }

  @Delete(':plannerId/leave')
  @UseGuards(AuthcationGuard)
  async leavePlanner (@Req() req: Request, @Param('plannerId') plannerId: string): Promise<void> {
    const { userId } = req.user as User
    return await this.plannerService.leavePlanner(plannerId, userId)
  }

  @Get(':plannerId/user')
  @UseGuards(AuthcationGuard)
  async getPlannerUsers (@Param('plannerId') plannerId: string): Promise<PlannerUser[]> {
    return await this.plannerService.getPlannerUsers(plannerId)
  }

  @Get(':plannerId/user/:userId')
  @UseGuards(AuthcationGuard)
  async getPlannerUser (@Param('plannerId') plannerId: string, @Param('userId') targetUserId: string): Promise<PlannerUser> {
    return await this.plannerService.getPlannerUser(plannerId, targetUserId)
  }

  @Patch(':plannerId/user/:userId')
  @UseGuards(AuthcationGuard)
  async updatePlannerUser (@Req() req: Request, @Param('plannerId') plannerId: string, @Param('userId') targetUserId: string, @Body() body: UpdatePlannerUserBodyDto): Promise<PlannerUser> {
    const { userId } = req.user as User
    return await this.plannerService.updatePlannerUser(plannerId, userId, targetUserId, body)
  }

  @Get(':plannerId/todo')
  @UseGuards(AuthcationGuard)
  async getPlannerTodos (@Req() req: Request, @Param('plannerId') plannerId: string): Promise<Todo[]> {
    return await this.todoService.getTodos(plannerId)
  }

  @Post(':plannerId/todo')
  @UseGuards(AuthcationGuard)
  async createPlannerTodo (@Req() req: Request, @Param('plannerId') plannerId: string, @Body() body: CreateTodoBodyDto): Promise<Todo> {
    const { userId } = req.user as User
    return await this.todoService.createTodo(userId, plannerId, body)
  }

  @Get(':plannerId/todo/:todoId')
  @UseGuards(AuthcationGuard)
  async getPlannerTodo (@Req() req: Request, @Param('plannerId') plannerId: string, @Param('todoId') todoId: string): Promise<Todo> {
    return await this.todoService.getTodo(plannerId, todoId)
  }

  @Patch(':plannerId/todo/:todoId')
  @UseGuards(AuthcationGuard)
  async updatePlannerTodo (@Req() req: Request, @Param('plannerId') plannerId: string, @Param('todoId') todoId: string, @Body() body: UpdateTodoBodyDto): Promise<Todo> {
    const { userId } = req.user as User
    return await this.todoService.updateTodo(userId, plannerId, todoId, body)
  }

  @Delete(':plannerId/todo/:todoId')
  @UseGuards(AuthcationGuard)
  async deletePlannerTodo (@Req() req: Request, @Param('plannerId') plannerId: string, @Param('todoId') todoId: string): Promise<void> {
    const { userId } = req.user as User
    return await this.todoService.deleteTodo(userId, plannerId, todoId)
  }
}
