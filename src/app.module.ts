import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DalModule } from './dal/dal.module';
import { QuoteFacade } from './facades/quote.facade';
import { QuoteService } from './bll/quote.service';
import { ExchangeRateProvider } from './providers/exchange-rate/exchange-rate.provider';
import { QuoteController } from './app.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/koywe-challenge'),
    DalModule,
    AuthModule
  ],
  controllers: [QuoteController],
  providers: [
    QuoteFacade,
    QuoteService,
    ExchangeRateProvider,
  ],
})
export class AppModule {}
