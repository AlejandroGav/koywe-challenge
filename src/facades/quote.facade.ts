import { Injectable } from '@nestjs/common';
import { QuoteService } from '../bll/quote.service';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';
import { QuoteRepository } from '../dal/quote.repository';
import { CreateQuoteDto } from '../models/dtos/create-quote.dto';
import { Quote } from '../models/entities/quote.entity';

@Injectable()
export class QuoteFacade {
    constructor(
    private readonly quoteService: QuoteService,
    private readonly exchangeRateProvider: ExchangeRateProvider,
    private readonly quoteRepository: QuoteRepository,
    ) {}

    /**
    * Orquesta la creacion de la cotizacion.
    * - Llama al proveedor de tasas de cambio (ExchangeRateProvider)
    * - Aplica la logica de negocio en QuoteService (calculo, timestamps)
    * - Almacena la cotizacion en QuoteRepository
    */
    public async createQuote(dto: CreateQuoteDto): Promise<Quote> {
        const rate = await this.exchangeRateProvider.getRate(dto.from, dto.to);
        const quote = this.quoteService.createQuote(dto, rate);
        return await this.quoteRepository.save(quote);
    }

    /**
    * Orquesta la obtencion de la cotizacion por ID.
    * - Recupera la cotizacion desde el repositorio.
    * - Verifica si está expirada.
    */
    public async getQuote(id: string): Promise<Quote | null> {
        const quote = await this.quoteRepository.findById(id);
        if (!quote) return null;

        const isExpired = this.quoteService.isExpired(quote);
        if (isExpired) return null;

        return quote;
    }
}
