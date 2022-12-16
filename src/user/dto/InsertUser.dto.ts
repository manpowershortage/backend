import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class InsertUser {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
    password: string

  @IsNotEmpty()
    username: string

  @IsNotEmpty()
    age: number

  @IsNotEmpty()
    salt: string

  @IsOptional()
    bio?: string

  @IsOptional()
    image?: string
}
