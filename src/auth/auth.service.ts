import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as shajs from 'sha.js'
import { User } from 'src/user/entities/user.entity'

import { UserService } from 'src/user/user.service'
import { SigninBody } from './dto/SigninBody.dto'
import { SignupBody } from './dto/SignupBody.dto'

@Injectable()
export class AuthService {
  constructor (
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async validateUser (email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)
    if (user == null) throw new BadRequestException('USER_EMAIL_OR_PASSWORD_IS_INCORRECT')

    const hashedPassword = shajs('sha512').update(password + user.salt).digest('hex')
    if (hashedPassword !== user.password) throw new NotFoundException('USER_EMAIL_OR_PASSWORD_IS_INCORRECT')

    return user
  }

  public async signup (body: SignupBody): Promise<User> {
    const user = await this.userService.findByEmail(body.email)
    if (user != null) throw new BadRequestException('USER_EMAIL_ALREADY_EXISTS')

    const salt = shajs('sha512').update(Math.random().toString()).digest('hex').slice(0, 8) as string
    const hashedPassword = shajs('sha512').update(body.password + salt).digest('hex')

    return await this.userService.insert({ ...body, salt, password: hashedPassword })
  }

  public async signin (body: SigninBody): Promise<{ accessToken, refreshToken, user: User }> {
    const { email, password } = body
    const user = await this.validateUser(email, password)

    const accessToken = await this.getAccessToken(user)
    const refreshToken = await this.getRefreshToken(user)
    await this.userService.update({ ...user, refreshToken })

    return { accessToken, refreshToken, user }
  }

  public async signout (user: User): Promise<void> {
    await this.userService.update({ ...user, refreshToken: '' })
  }

  private async getAccessToken (user: User): Promise<string> {
    return await this.jwtService.signAsync({
      id: user.userId,
      email: user.email,
      username: user.username
    }, {
      expiresIn: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
    })
  }

  private async getRefreshToken (user: User): Promise<string> {
    return await this.jwtService.signAsync({
      id: user.userId
    }, {
      expiresIn: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
    })
  }

  public async refresh (refreshToken: string): Promise<{ accessToken, refreshToken }> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
    })
    if (payload == null) throw new UnauthorizedException('REFRESH_TOKEN_IS_INVALID')

    const user = await this.userService.findById(payload.id)
    if (user == null) throw new UnauthorizedException('REFRESH_TOKEN_IS_INVALID')

    const accessToken = await this.getAccessToken(user)
    const newRefreshToken = await this.getRefreshToken(user)
    await this.userService.update({ ...user, refreshToken })

    return { accessToken, refreshToken: newRefreshToken }
  }
}
