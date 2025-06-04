import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';

@Module({
  imports: [],
  controllers: [QrController],
  providers: [QrService],
  exports: [QrService],
})
export class QRModule {}
