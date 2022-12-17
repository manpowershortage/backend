import { Column, Entity, Generated, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  @Generated('uuid')
    userId: string

  @Column({ name: 'email', type: 'varchar', length: 255 })
    email: string

  @Column({ name: 'username', type: 'varchar', length: 32 })
    username: string

  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
    image?: string

  @Column({ name: 'bio', type: 'varchar', length: 255, nullable: true })
    bio?: string

  @Column({ name: 'age', type: 'int' })
    age: number

  @Column({ name: 'refresh_token', type: 'varchar', length: 255, nullable: true })
    refreshToken?: string

  @Column({ name: 'password', type: 'varchar', length: 128 })
    password: string

  @Column({ name: 'salt', type: 'char', length: 8 })
    salt: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date
}
