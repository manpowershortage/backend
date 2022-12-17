import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'

export class SignupBody {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
  @MinLength(6)
    password: string

  @IsNotEmpty()
  @MaxLength(32)
    username: string

  @IsNotEmpty()
    age: number

  @IsOptional()
  @MaxLength(255)
    bio?: string

  @IsOptional()
    image?: string
}
