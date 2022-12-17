import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateScoreBodyDto {
  @IsNotEmpty()
  @MaxLength(64)
    name: string

  @IsNotEmpty()
    score: number

  @IsNotEmpty()
    date: Date
}
