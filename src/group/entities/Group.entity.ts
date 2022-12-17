import { User } from 'src/user/entities/user.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Group {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    groupId: string

  @Column({ name: 'owner_id', type: 'uuid' })
    ownerId: string

  @Column({ name: 'name', type: 'varchar', length: 64 })
    name: string

  @Column({ name: 'description', type: 'varchar', length: 256 })
    description: string

  @Column({ name: 'max_user_count', type: 'integer', default: 100 })
    maxUserCount: number

  @Column({ name: 'password', type: 'varchar', length: 128, nullable: true })
    password: string

  @Column({ name: 'salt', type: 'char', length: 8, nullable: true })
    salt: string

  @Column({ name: 'is_confirm', type: 'boolean', default: false })
    isConfirm: boolean

  @Column({ name: 'is_private', type: 'boolean', default: false })
    isPrivate: boolean

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'owner_id' })
    owner: User
}
