import { IsEnum, IsOptional, MaxLength } from 'class-validator'
import { SubjectLevel } from '../entities/subject.entity'

export class UpdateSubjectBodyDto {
  @IsOptional()
  @MaxLength(64)
    name?: string

  @IsOptional()
  @MaxLength(256)
    description?: string

  @IsOptional()
  @IsEnum(SubjectLevel)
    level?: SubjectLevel
}
