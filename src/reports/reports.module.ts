import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Report])],// this is used for creating the reportsReporsitory
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
