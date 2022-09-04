import { Expose, Transform } from 'class-transformer';

export class OutputReportDto {
  @Expose()
  prince: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: string;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
