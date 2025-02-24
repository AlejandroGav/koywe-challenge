import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DalModule } from './dal/dal.module';
import { QuoteFacade } from './facades/quote.facade';
import { QuoteService } from './bll/quote.service';
import { ExchangeRateProvider } from './providers/exchange-rate/exchange-rate.provider';
import { QuoteRepository } from './dal/quote.repository';
import { QuoteController } from './app.controller';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    DalModule,
  ],
  controllers: [QuoteController],
  providers: [
    QuoteFacade,
    QuoteService,
    ExchangeRateProvider,
    QuoteRepository,
  ],
})
export class AppModule {}
