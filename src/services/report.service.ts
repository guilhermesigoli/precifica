import { Injectable } from '@nestjs/common';
import { GenerateReportInputDto } from 'src/dtos/generate-report-input.dto';

@Injectable()
export class ReportService {
  // constructor() {}

  async generateReport(params: GenerateReportInputDto) {
    console.log(params);
    return {
      inputsTotal: '0',
      total: '0',
      profit: '0',
      profitPercentage: '0',
    };
  }
}
