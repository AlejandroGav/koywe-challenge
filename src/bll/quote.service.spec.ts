import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from '../models/dtos/create-quote.dto';

describe('QuoteService', () => {
    let service: QuoteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuoteService],
        }).compile();

        service = module.get<QuoteService>(QuoteService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a quote with correct calculated convertedAmount', () => {
        const dto: CreateQuoteDto = { amount: 1000000, from: 'ARS', to: 'ETH' };
        const rate = 0.0000023;
        const quote = service.createQuote(dto, rate);
        expect(quote).toHaveProperty('id');
        expect(quote.convertedAmount).toEqual(dto.amount * rate);
    });

    it('should correctly detect an expired quote', () => {
        const dto: CreateQuoteDto = { amount: 1000000, from: 'ARS', to: 'ETH' };
        const rate = 0.0000023;
        const quote = service.createQuote(dto, rate);
        quote.expiresAt = new Date(Date.now() - 1000);
        expect(service.isExpired(quote)).toBeTruthy();
    });
});
