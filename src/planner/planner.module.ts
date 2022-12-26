import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Planner } from './entities/Planner.entity'
import { PlannerUser } from './entities/PlannerUser.entity'
import { PlannerService } from './planner.service'
import { PlannerController } from './planner.controller'
import { TodoModule } from 'src/todo/todo.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Planner, PlannerUser]),
    TodoModule
  ],
  providers: [PlannerService],
  controllers: [PlannerController],
  exports: [PlannerService]
})
export class PlannerModule {}
