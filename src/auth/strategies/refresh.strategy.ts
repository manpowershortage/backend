import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor (
    private readonly userService: UserService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true
    })
  }

  async validate (payload: any): Promise<User> {
    const { id } = payload
    const user = await this.userService.findById(id)

    if (user == null) throw new UnauthorizedException()
    return user
  }
}
