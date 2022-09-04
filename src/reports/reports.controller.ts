import {
  Controller,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/users.entity';
import { CurrentUserDecorator } from '../users/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OutputReportDto } from './dtos/output-report.dto';
import { ApprovedReport } from './dtos/approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { CreateEstimateDto } from './dtos/create-estimate.dto';
import { query } from 'express';
@Controller('/reports')
export class ReportsController {
  constructor(private reportsSer: ReportsService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @Serialize(OutputReportDto)
  createReport(
    @Body() body: CreateReportDto,
    @CurrentUserDecorator() user: User,
  ) {
    return this.reportsSer.create(body, user);
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  approvedReport(@Param('id') id: string, @Body() body: ApprovedReport) {
    return this.reportsSer.changeApproval(parseInt(id), body.approved);
  }

  @Get('/')
  getEstimate(@Query() query: CreateEstimateDto) {
    return this.reportsSer.createEstimate(query);
  }
}
