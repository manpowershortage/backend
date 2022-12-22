import { IsEnum, IsNotEmpty } from 'class-validator'
import { PlannerRole } from '../entities/PlannerUser.entity'

export class UpdatePlannerUserBodyDto {
  @IsNotEmpty()
  @IsEnum(PlannerRole)
    role: PlannerRole
}
