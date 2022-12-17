import { IsOptional, MaxLength } from 'class-validator'

export class UpdateScoreBodyDto {
  @IsOptional()
  @MaxLength(64)
    name?: string

  @IsOptional()
    score?: number

  @IsOptional()
    date?: Date
}
