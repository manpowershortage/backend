import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthcationGuard } from 'src/auth/guard/Authcation.guard'
import { CreateScoreBodyDto } from 'src/score/dto/CreateScoreBody.dto'
import { Score } from 'src/score/entities/score.entity'
import { ScoreService } from 'src/score/score.service'
import { User } from 'src/user/entities/user.entity'
import { CreateSubjectBodyDto } from './dto/CreateSubjectBody.dto'
import { UpdateSubjectBodyDto } from './dto/UpdateSubjectBody.dto'
import { Subject } from './entities/subject.entity'
import { SubjectService } from './subject.service'

@Controller('subject')
export class SubjectController {
  constructor (
    private readonly subjectService: SubjectService,
    private readonly scoreService: ScoreService
  ) {}

  @Get()
  @UseGuards(AuthcationGuard)
  async getSubjects (@Req() req: Request): Promise<Subject[]> {
    const { userId } = req.user as User
    return await this.subjectService.getSubjects(userId)
  }

  @Get(':subjectId')
  @UseGuards(AuthcationGuard)
  async getSubject (@Req() req: Request, @Param('subjectId') subjectId: string): Promise<Subject> {
    const { userId } = req.user as User
    return await this.subjectService.getSubject(userId, subjectId)
  }

  @Post()
  @UseGuards(AuthcationGuard)
  async createSubject (@Req() req: Request, @Body() body: CreateSubjectBodyDto): Promise<Subject> {
    const { userId } = req.user as User
    return await this.subjectService.createSubject(userId, body)
  }

  @Patch(':subjectId')
  @UseGuards(AuthcationGuard)
  async updateSubject (@Req() req: Request, @Param('subjectId') subjectId: string, @Body() body: UpdateSubjectBodyDto): Promise<Subject> {
    const { userId } = req.user as User
    return await this.subjectService.updateSubject(userId, subjectId, body)
  }

  @Delete(':subjectId')
  @UseGuards(AuthcationGuard)
  async deleteSubject (@Req() req: Request, @Param('subjectId') subjectId: string): Promise<void> {
    const { userId } = req.user as User
    await this.subjectService.deleteSubject(userId, subjectId)
  }

  // Score routes
  @Get(':subjectId/score')
  @UseGuards(AuthcationGuard)
  async getScores (@Req() req: Request, @Param('subjectId') subjectId: string): Promise<Score[]> {
    const { userId } = req.user as User
    return await this.scoreService.getScoresBySubject(userId, subjectId)
  }

  @Get(':subjectId/score/:scoreId')
  @UseGuards(AuthcationGuard)
  async getScore (@Req() req: Request, @Param('subjectId') subjectId: string, @Param('scoreId') scoreId: string): Promise<Score> {
    const { userId } = req.user as User
    return await this.scoreService.getScore(userId, subjectId, scoreId)
  }

  @Post(':subjectId/score')
  @UseGuards(AuthcationGuard)
  async createScore (@Req() req: Request, @Param('subjectId') subjectId: string, @Body() body: CreateScoreBodyDto): Promise<Score> {
    const { userId } = req.user as User
    return await this.scoreService.createScore(userId, subjectId, body)
  }

  @Patch(':subjectId/score/:scoreId')
  @UseGuards(AuthcationGuard)
  async updateScore (@Req() req: Request, @Param('subjectId') subjectId: string, @Param('scoreId') scoreId: string, @Body() body: CreateScoreBodyDto): Promise<Score> {
    const { userId } = req.user as User
    return await this.scoreService.updateScore(userId, subjectId, scoreId, body)
  }

  @Delete(':subjectId/score/:scoreId')
  @UseGuards(AuthcationGuard)
  async deleteScore (@Req() req: Request, @Param('subjectId') subjectId: string, @Param('scoreId') scoreId: string): Promise<void> {
    const { userId } = req.user as User
    await this.scoreService.deleteScore(userId, subjectId, scoreId)
  }
}
