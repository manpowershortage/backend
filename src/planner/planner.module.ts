import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Planner } from './entities/Planner.entity'
import { PlannerUser } from './entities/PlannerUser.entity'
import { PlannerService } from './planner.service'
import { PlannerController } from './planner.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Planner, PlannerUser])
  ],
  providers: [PlannerService],
  controllers: [PlannerController]
})
export class PlannerModule {}
