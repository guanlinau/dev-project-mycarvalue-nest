import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from '../users/users.entity';
import { CreateEstimateDto } from './dtos/create-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);

    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate(estimateQuery: CreateEstimateDto) {
    console.log('first');
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimateQuery.make })
      .andWhere('model=:model', { model: estimateQuery.model })
      .andWhere('lng -:lng BETWEEN -5 AND 5', { lng: estimateQuery.lng })
      .andWhere('lat -:lat BETWEEN -5 AND 5', { lat: estimateQuery.lat })
      .andWhere('year -:year BETWEEN -3 AND 3', { year: estimateQuery.year })
      .orderBy('ABS(mileage -:mileage)', 'DESC')
      .setParameters({ mileage: estimateQuery.mileage })
      .limit(3)
      .getRawOne();
  }
}
