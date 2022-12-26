import { IsOptional } from 'class-validator'

export class UpdateTodoBodyDto {
  @IsOptional()
    name: string

  @IsOptional()
    description: string

  @IsOptional()
    at: Date
}
