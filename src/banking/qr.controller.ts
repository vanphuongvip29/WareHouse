import { Controller, Get, Query } from '@nestjs/common';
import { QrService } from './qr.service';
import { Public } from 'src/decorator/customize';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get('vietqr')
  @Public()
  getQrUrl(@Query('amount') amount: number, @Query('code') code: string) {
    const url = this.qrService.generateVietQrUrl(amount, code);
    return { qrImageUrl: url };
  }
}
