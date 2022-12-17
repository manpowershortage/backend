import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Group } from './Group.entity'

export enum GroupUserStatus {
  ACCEPTED,
  PENDING,
  BLOCKED
}

@Entity()
export class GroupUser {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @PrimaryColumn({ name: 'group_id', type: 'uuid' })
    groupId: string

  @Column({ type: 'enum', enum: GroupUserStatus })
    status: GroupUserStatus

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @ManyToOne(() => Group, (group) => group.groupId)
  @JoinColumn({ name: 'group_id' })
    group: Group

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
    user: User
}
