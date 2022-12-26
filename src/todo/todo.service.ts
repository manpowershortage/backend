import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PlannerService } from 'src/planner/planner.service'
import { Repository } from 'typeorm'
import { CreateTodoBodyDto } from './dto/CreateTodoBody.dto'
import { UpdateTodoBodyDto } from './dto/UpdateTodoBody.dto'
import { Todo } from './entities/todo.entity'
import { TodoUser } from './entities/todouser.entity'

@Injectable()
export class TodoService {
  constructor (
    private readonly plannerService: PlannerService,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoUser)
    private readonly todoUserRepository: Repository<TodoUser>
  ) {}

  async getTodo (plannerId: string, todoId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        plannerId,
        todoId
      }
    })
    if (todo == null) throw new NotFoundException('Todo not found')

    return todo
  }

  async getTodos (plannerId: string): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: {
        plannerId
      }
    })
  }

  async createTodo (userId: string, plannerId: string, todo: CreateTodoBodyDto): Promise<Todo> {
    const planner = await this.plannerService.getPlanner(userId, plannerId)
    if (planner == null) throw new NotFoundException('Planner not found')
    if (planner.userId !== userId) throw new NotFoundException('Planner not found')

    const newTodo = await this.todoRepository.save({
      ...todo,
      plannerId
    })
    return newTodo
  }

  async updateTodo (userId: string, plannerId: string, todoId: string, todo: UpdateTodoBodyDto): Promise<Todo> {
    const planner = await this.plannerService.getPlanner(userId, plannerId)
    if (planner == null) throw new NotFoundException('Planner not found')
    if (planner.userId !== userId) throw new NotFoundException('Planner not found')

    const oldTodo = await this.getTodo(plannerId, todoId)
    if (oldTodo == null) throw new NotFoundException('Todo not found')

    const newTodo = await this.todoRepository.save({
      ...oldTodo,
      ...todo
    })
    return newTodo
  }

  async deleteTodo (userId: string, plannerId: string, todoId: string): Promise<void> {
    const planner = await this.plannerService.getPlanner(userId, plannerId)
    if (planner == null) throw new NotFoundException('Planner not found')
    if (planner.userId !== userId) throw new NotFoundException('Planner not found')

    const todo = await this.getTodo(plannerId, todoId)
    if (todo == null) throw new NotFoundException('Todo not found')

    await this.todoRepository.delete({
      plannerId,
      todoId
    })
  }
}
