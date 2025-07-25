import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteResponseDto } from './dto/quote-response.dto';

@Injectable()
export class QuoteService {
  private readonly quotesHistory = new Map<string, QuoteResponseDto[]>();

  createQuote(userId: string, dto: CreateQuoteDto): QuoteResponseDto {
    const { marca, modelo, anio, tipoUso, edadConductor } = dto;

    const precioBase = 500;

    
    let factorEdad = 1;
    if (edadConductor < 25) factorEdad = 1.2;
    else if (edadConductor >= 60) factorEdad = 1.1;

    
    let factorUso = 1;
    if (tipoUso === 'trabajo') factorUso = 1.15;
    else if (tipoUso === 'carga') factorUso = 1.25;

    const primaTotal = precioBase * factorEdad * factorUso;

    const result: QuoteResponseDto = {
      precioBase,
      ajustes: {
        edad: {
          factor: factorEdad,
          porcentaje: `${((factorEdad - 1) * 100).toFixed(0)}%`,
        },
        uso: {
          factor: factorUso,
          porcentaje: `${((factorUso - 1) * 100).toFixed(0)}%`,
        },
      },
      primaTotal,
    };

    const prev = this.quotesHistory.get(userId) || [];
    this.quotesHistory.set(userId, [result, ...prev].slice(0, 3));

    return result;
  }

  getLastQuotes(userId: string): QuoteResponseDto[] {
    return this.quotesHistory.get(userId) || [];
  }
}
