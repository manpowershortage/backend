import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api') // Prefix for cloudfront
  app.useGlobalPipes(new ValidationPipe({ // Global Validation Pipeline
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(3000)
}
void bootstrap()
