import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { QuoteFacade } from './facades/quote.facade';
import { CreateQuoteDto } from './models/dtos/create-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @Post()
  async createQuote(@Body() dto: CreateQuoteDto) {
    const quote = await this.quoteFacade.createQuote(dto);
    return quote;
  }

  @Get(':id')
  async getQuote(@Param('id') id: string) {
    const quote = await this.quoteFacade.getQuote(id);
    if (!quote) {
      throw new HttpException('Quote not found or expired', HttpStatus.NOT_FOUND);
    }
    return quote;
  }
}
