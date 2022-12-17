import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthcationGuard extends AuthGuard('authcation') {}
