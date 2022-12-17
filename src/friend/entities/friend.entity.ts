import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

export enum FriendStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
  BLOCKED
}

@Entity()
export class Friend {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @PrimaryColumn({ name: 'friend_id', type: 'uuid' })
    friendId: string

  @Column({ name: 'status', type: 'enum', enum: FriendStatus, default: FriendStatus.PENDING })
    status: FriendStatus

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

  @ManyToOne(() => User, user => user.userId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
    user: User

  @ManyToOne(() => User, user => user.userId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'friend_id' })
    friend: User
}
