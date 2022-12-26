import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTodoBodyDto {
  @IsNotEmpty()
    name: string

  @IsOptional()
    description: string

  @IsNotEmpty()
    at: Date
}
