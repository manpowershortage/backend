import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScoreBodyDto } from './dto/CreateScoreBody.dto'
import { UpdateScoreBodyDto } from './dto/UpdateScoreBody.dto'
import { Score } from './entities/score.entity'

@Injectable()
export class ScoreService {
  constructor (
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>
  ) {}

  async getScores (userId: string): Promise<Score[]> {
    return await this.scoreRepository.find({
      where: { userId },
      relations: { subject: true }
    })
  }

  async getScoresBySubject (userId: string, subjectId: string): Promise<Score[]> {
    return await this.scoreRepository.find({
      where: { userId, subjectId },
      relations: { subject: true }
    })
  }

  async getScore (userId: string, subjectId: string, scoreId: string): Promise<Score> {
    const score = await this.scoreRepository.findOne({
      where: { userId, subjectId, scoreId },
      relations: { subject: true }
    })
    if (score == null) throw new NotFoundException('Score not found')

    return score
  }

  async createScore (userId: string, subjectId: string, body: CreateScoreBodyDto): Promise<Score> {
    return await this.scoreRepository.save({ userId, subjectId, ...body })
  }

  async updateScore (userId: string, subjectId: string, scoreId: string, body: UpdateScoreBodyDto): Promise<Score> {
    await this.scoreRepository.update({ scoreId, userId, subjectId }, {
      ...body
    })

    const updatedScore = await this.getScore(userId, subjectId, scoreId)
    return updatedScore
  }

  async deleteScore (userId: string, subjectId: string, scoreId: string): Promise<void> {
    await this.scoreRepository.delete({ userId, subjectId, scoreId })
  }
}
