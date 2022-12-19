import { User } from 'src/user/entities/user.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Planner {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    plannerId: string

  @Column({ name: 'user_id', type: 'uuid' })
    userId: string

  @Column({ name: 'title', type: 'varchar', length: 255 })
    title: string

  @Column({ name: 'description', type: 'text' })
    description: string

  @Column({ name: 'image', type: 'text' })
    image: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ name: 'is_public', type: 'boolean', default: false })
    isPublic: boolean

  @ManyToOne(() => User, user => user.userId)
  @JoinColumn({ name: 'user_id' })
    user: User
}
