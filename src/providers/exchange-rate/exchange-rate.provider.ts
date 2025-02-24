import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeRateProvider {
    public async getRate(from: string, to: string): Promise<number> {
    // Para la prueba, devolvemos un valor fijo:
    return 0.0000023;
    }
}