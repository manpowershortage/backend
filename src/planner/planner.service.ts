import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlannerBodyDto } from './dto/CreatePlannerBody.dto'
import { UpdatePlannerBodyDto } from './dto/UpdatePlannerBody.dto'
import { Planner } from './entities/Planner.entity'
import { PlannerUser } from './entities/PlannerUser.entity'

@Injectable()
export class PlannerService {
  constructor (
    @InjectRepository(Planner)
    private readonly plannerRepository: Repository<Planner>,
    @InjectRepository(PlannerUser)
    private readonly plannerUserRepository: Repository<PlannerUser>
  ) {}

  async getPlanners (userId: string): Promise<Planner[]> {
    const planners = await this.plannerRepository.find({
      where: { userId }
    })

    return planners
  }

  async getPlanner (userId: string, plannerId: string): Promise<Planner> {
    let planner = await this.plannerRepository.findOne({
      where: { userId, plannerId }
    })

    if (planner == null) {
      const plannerUsers = await this.plannerUserRepository.findOne({
        where: { plannerId, userId }
      })
      if (plannerUsers == null) throw new NotFoundException('Planner not found')

      planner = await this.plannerRepository.findOne({
        where: { plannerId }
      })
    }

    if (planner == null) throw new NotFoundException('Planner not found')
    return planner
  }

  async createPlanner (userId: string, body: CreatePlannerBodyDto): Promise<Planner> {
    const planner = await this.plannerRepository.save({
      ...body,
      userId
    })

    return planner
  }

  async updatePlanner (userId: string, plannerId: string, body: UpdatePlannerBodyDto): Promise<Planner> {
    const planner = await this.plannerRepository.findOne({
      where: { userId, plannerId }
    })
    if (planner == null) throw new NotFoundException('Planner not found')

    await this.plannerRepository.update(plannerId, body)

    return planner
  }

  async deletePlanner (userId: string, plannerId: string): Promise<void> {
    const planner = await this.plannerRepository.findOne({
      where: { userId, plannerId }
    })
    if (planner == null) throw new NotFoundException('Planner not found')

    await this.plannerRepository.delete(plannerId)
  }
}
