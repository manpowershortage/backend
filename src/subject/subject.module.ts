import { Module } from '@nestjs/common'
import { SubjectService } from './subject.service'
import { SubjectController } from './subject.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subject } from './entities/subject.entity'
import { ScoreModule } from 'src/score/score.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    ScoreModule
  ],
  providers: [SubjectService],
  controllers: [SubjectController]
})
export class SubjectModule {}
