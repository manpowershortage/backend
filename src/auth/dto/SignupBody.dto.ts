import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class SignupBody {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
    password: string

  @IsNotEmpty()
    username: string

  @IsNotEmpty()
    age: number

  @IsOptional()
    bio?: string

  @IsOptional()
    image?: string
}
