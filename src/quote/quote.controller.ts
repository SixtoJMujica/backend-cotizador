import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateQuoteDto) {
    const userId = req.user.sub;
    return this.quoteService.createQuote(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('last')
  findLastQuotes(@Req() req) {
    const userId = req.user.sub;
    return this.quoteService.getLastQuotes(userId);
  }
}
