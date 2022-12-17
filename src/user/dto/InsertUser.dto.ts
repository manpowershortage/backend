import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'

export class InsertUser {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
    email: string

  @IsNotEmpty()
  @MinLength(6)
    password: string

  @IsNotEmpty()
  @MaxLength(32)
    username: string

  @IsNotEmpty()
    age: number

  @IsNotEmpty()
    salt: string

  @IsOptional()
  @MaxLength(255)
    bio?: string

  @IsOptional()
    image?: string
}
