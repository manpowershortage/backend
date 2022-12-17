import { IsNotEmpty, MinLength } from 'class-validator'

export class JoinGroupBodyDto {
  @IsNotEmpty()
  @MinLength(6)
    password: string
}
