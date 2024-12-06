import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get('TelegrafBot');
  const BOT_URL = `${Config.BASE_URL}/api/telegram`;

  await bot.telegram.setWebhook(BOT_URL);
  // Vercel требует обработку через "/api/*"
  app.use(bot.webhookCallback('/api/telegram'));
  // Подключение сессий
  app.enableCors();
  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
  await app.listen(3000);
}
bootstrap();
