import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from '../models/entities/quote.entity';

@Injectable()
export class QuoteRepository {
    constructor(
        @InjectModel(Quote.name) private readonly quoteModel: Model<Quote>,
    ) {}

    async save(quote: Quote): Promise<Quote> {
        const createdQuote = new this.quoteModel(quote);
        return createdQuote.save();
    }

    async findById(id: string): Promise<Quote | null> {
        return this.quoteModel.findOne({ id }).exec();
    }
}
