import { Injectable } from '@nestjs/common';

@Injectable()
export class QrService {
  generateVietQrUrl(amount: number, code: string): string {
    // Các thông tin ngân hàng được cố định
    const bankId = 'ACB'; // Vietcombank
    const accountNumber = '37184727';
    const accountName = 'TRAN VAN PHUONG';

    const encodedCode = encodeURIComponent(code);
    const encodedAccountName = encodeURIComponent(accountName);

    return `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodedCode}&accountName=${encodedAccountName}`;
  }
}
