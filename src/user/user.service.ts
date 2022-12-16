import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InsertUser } from './dto/InsertUser.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByEmail (email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email })
  }

  async findById (userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ userId })
  }

  async insert (user: InsertUser): Promise<User> {
    return await this.userRepository.save(user)
  }

  async update (user: User): Promise<User> {
    return await this.userRepository.save(user)
  }
}
