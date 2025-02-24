import { Injectable } from '@nestjs/common';
import { Quote } from '.././models/entities/quote.entity';
import { CreateQuoteDto } from '.././models/dtos/create-quote.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuoteService {
    public createQuote(dto: CreateQuoteDto, rate: number): Quote {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 5 * 60000); // 5 minutos

        return {
            _id: undefined,
            id: uuid(),
            from: dto.from,
            to: dto.to,
            amount: dto.amount,
            rate,
            convertedAmount: dto.amount * rate,
            timestamp: now,
            expiresAt,
        } as Quote;
    }

    public isExpired(quote: Quote): boolean {
        return new Date() > quote.expiresAt;
    }
}
