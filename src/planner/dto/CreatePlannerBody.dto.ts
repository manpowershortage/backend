import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreatePlannerBodyDto {
  @IsNotEmpty()
  @MaxLength(255)
    title: string

  @IsNotEmpty()
    description: string

  @IsOptional()
    image: string

  @IsOptional()
    isPublic: boolean
}
