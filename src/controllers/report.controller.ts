import { Controller, Get, Query } from '@nestjs/common';
import { GenerateReportInputDto } from 'src/dtos/generate-report-input.dto';
import { IReportResponse } from 'src/interfaces/report-response.interface';
import { ReportService } from 'src/services/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  generateReport(
    @Query() params: GenerateReportInputDto,
  ): Promise<IReportResponse> {
    return this.reportService.generateReport(params);
  }
}
