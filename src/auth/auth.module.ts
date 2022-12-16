import { Module } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    PassportModule.register({})
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
