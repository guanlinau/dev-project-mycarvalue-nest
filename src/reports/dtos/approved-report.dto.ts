import { IsBoolean } from 'class-validator';

export class ApprovedReport {
  @IsBoolean()
  approved: boolean;
}
