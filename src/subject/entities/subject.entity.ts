import { Score } from 'src/score/entities/score.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

export enum SubjectLevel {
  ELEMENTARY,
  MIDDLE,
  HIGH,
  ETC
}

@Entity()
export class Subject {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    subjectId: string

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @Column({ name: 'name', type: 'varchar', length: 64 })
    name: string

  @Column({ name: 'description', type: 'varchar', length: 256, nullable: true })
    description: string

  @Column({ name: 'level', type: 'enum', enum: SubjectLevel })
    level: SubjectLevel

  @ManyToOne(() => User, user => user.userId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
    user: User

  @OneToMany(() => Score, score => score.subject)
    scores: Score[]
}
