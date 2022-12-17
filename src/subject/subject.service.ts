import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSubjectBodyDto } from './dto/CreateSubjectBody.dto'
import { UpdateSubjectBodyDto } from './dto/UpdateSubjectBody.dto'
import { Subject } from './entities/subject.entity'

@Injectable()
export class SubjectService {
  constructor (
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>
  ) {}

  async getSubjects (userId: string): Promise<Subject[]> {
    return await this.subjectRepository.find({
      where: { userId }
    })
  }

  async getSubject (userId: string, subjectId: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { userId, subjectId }
    })
    if (subject == null) throw new NotFoundException('Subject not found')

    return subject
  }

  async createSubject (userId: string, body: CreateSubjectBodyDto): Promise<Subject> {
    return await this.subjectRepository.save({ userId, ...body })
  }

  async updateSubject (userId: string, subjectId: string, body: UpdateSubjectBodyDto): Promise<Subject> {
    await this.subjectRepository.update({ subjectId, userId }, {
      ...body
    })

    const updatedSubject = await this.getSubject(userId, subjectId)
    return updatedSubject
  }

  async deleteSubject (userId: string, subjectId: string): Promise<void> {
    await this.subjectRepository.delete({ userId, subjectId })
  }
}
