import { IsNotEmpty, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateGroupBodyDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
    name: string

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
    description: string

  @IsOptional()
  @MinLength(6)
    password?: string

  @IsOptional()
    isPrivate?: boolean

  @IsOptional()
    isConfirm?: boolean

  @IsOptional()
  @Max(100)
  @Min(2)
    maxUserCount?: number
}
