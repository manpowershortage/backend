import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { SubjectLevel } from '../entities/subject.entity'

export class CreateSubjectBodyDto {
  @IsNotEmpty()
  @MaxLength(64)
    name: string

  @IsOptional()
  @MaxLength(256)
    description?: string

  @IsNotEmpty()
  @IsEnum(SubjectLevel)
    level: SubjectLevel
}
