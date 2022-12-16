import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthcationStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (
    private readonly userService: UserService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
    })
  }

  async validate (payload: any): Promise<User> {
    const { id } = payload
    const user = await this.userService.findById(id)

    if (user == null) throw new UnauthorizedException()
    return user
  }
}
