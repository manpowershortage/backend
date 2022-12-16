import { BadRequestException, Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { User } from 'src/user/entities/user.entity'
import { AuthService } from './auth.service'
import { SigninBody } from './dto/SigninBody.dto'
import { SignupBody } from './dto/SignupBody.dto'
import { AuthcationGuard } from './guard/Authcation.guard'
import { RefreshGuard } from './guard/Refresh.guard'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  public async signup (@Body() body: SignupBody): Promise<User> {
    return await this.authService.signup(body)
  }

  @Post('signin')
  public async signin (@Body() body: SigninBody): Promise<{ accessToken, refreshToken, user: User }> {
    return await this.authService.signin(body)
  }

  @Post('signout')
  @UseGuards(AuthcationGuard)
  public async signout (@Req() req: Request): Promise<void> {
    const user = req.user as User
    if (user == null) throw new BadRequestException('USER_IS_REQUIRED')

    return await this.authService.signout(user)
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  public async refresh (@Headers('refreshToken') refreshToken: string): Promise<{ accessToken, refreshToken }> {
    if (typeof refreshToken !== 'string') throw new BadRequestException('REFRESH_TOKEN_IS_REQUIRED')

    return await this.authService.refresh(refreshToken)
  }
}
