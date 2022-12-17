import { Module } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RefreshStrategy } from './strategies/refresh.strategy'
import { AuthcationStrategy } from './strategies/authcation.strategy'

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    PassportModule.register({})
  ],
  providers: [
    AuthService,
    AuthcationStrategy,
    RefreshStrategy
  ],
  exports: [
    AuthcationStrategy,
    RefreshStrategy,
    PassportModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
