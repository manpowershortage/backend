import { Subject } from 'src/subject/entities/subject.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Score {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    scoreId: string

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string

  @PrimaryColumn({ name: 'subject_id', type: 'uuid' })
    subjectId: string

  @Column({ name: 'name', type: 'varchar' })
    name: string

  @Column({ name: 'score', type: 'int' })
    score: number

  @Column({ name: 'date', type: 'date' })
    date: Date

  @ManyToOne(() => User, user => user.userId)
  @JoinColumn({ name: 'user_id' })
    user: User

  @ManyToOne(() => Subject, subject => subject.scores, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'subjectId' })
    subject: Subject
}
