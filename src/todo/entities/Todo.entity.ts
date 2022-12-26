import { Planner } from 'src/planner/entities/planner.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    todoId: string

  @PrimaryColumn({ name: 'planner_id', type: 'uuid' })
    plannerId: string

  @Column({ name: 'name', type: 'varchar' })
    name: string

  @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string

  @Column({ name: 'at', type: 'timestamp' })
    at: Date

  @ManyToOne(() => Planner, planner => planner.plannerId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'planner_id', referencedColumnName: 'plannerId' })
    planner: Planner
}
