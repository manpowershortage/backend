import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.useWebSocketAdapter(new IoAdapter())
  app.setGlobalPrefix('api') // Prefix for cloudfront
  app.useGlobalPipes(new ValidationPipe({ // Global Validation Pipeline
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(3000)
}
void bootstrap()
