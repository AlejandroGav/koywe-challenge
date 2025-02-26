import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from '../models/entities/quote.entity';
import { QuoteRepository } from './quote.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    ],
    providers: [QuoteRepository],
    exports: [QuoteRepository],
})
export class DalModule {}
