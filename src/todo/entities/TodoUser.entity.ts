import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Todo } from './todo.entity'

export enum TodoStatus {
  NO,
  DONE,
  MIDDLE,
  PASSING
}

@Entity()
export class TodoUser {
  @PrimaryColumn({ name: 'todo_id', type: 'uuid' })
    todoId: string

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @Column({ name: 'status', type: 'enum', enum: TodoStatus })
    status: TodoStatus

  @Column({ name: 'at', type: 'timestamp' })
    at: Date

  @ManyToOne(() => Todo, todo => todo.todoId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'todo_id', referencedColumnName: 'todoId' })
    todo: Todo

  @ManyToOne(() => User, user => user.userId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    user: User
}
