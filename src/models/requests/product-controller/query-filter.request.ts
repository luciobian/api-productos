import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryFilterRequest {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number;
}
