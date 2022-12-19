import { User } from 'src/user/entities/user.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Planner } from './planner.entity'

export enum PlannerRole {
  MANAGER,
  MEMBER
}

@Entity()
export class PlannerUser {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @PrimaryColumn({ name: 'planner_id', type: 'uuid' })
    plannerId: string

  @PrimaryColumn({ name: 'role', type: 'enum', enum: PlannerRole })
    role: PlannerRole

  @ManyToOne(() => User, user => user.userId)
  @JoinColumn({ name: 'user_id' })
    user: User

  @ManyToOne(() => Planner, planner => planner.plannerId)
  @JoinColumn({ name: 'planner_id' })
    planner: Planner
}
