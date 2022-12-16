import { IsEmail, IsNotEmpty } from 'class-validator'

export class SigninBody {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
    password: string
}
