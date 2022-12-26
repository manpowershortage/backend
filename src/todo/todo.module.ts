import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlannerModule } from 'src/planner/planner.module'
import { Todo } from './entities/todo.entity'
import { TodoUser } from './entities/todouser.entity'
import { TodoService } from './todo.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, TodoUser]),
    forwardRef(() => PlannerModule)
  ],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule {}
