import { IsOptional, MaxLength } from 'class-validator'

export class UpdatePlannerBodyDto {
  @IsOptional()
  @MaxLength(255)
    title: string

  @IsOptional()
    description: string

  @IsOptional()
    image: string

  @IsOptional()
    isPublic: boolean
}
