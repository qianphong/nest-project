import { IsNumber, IsOptional, IsInt, Min, Max } from 'class-validator';

export class FileOptions {
  @IsNumber()
  @IsOptional()
  w: number;

  @IsNumber()
  @IsOptional()
  h: number;

  @IsNumber()
  @IsOptional()
  level: number;
}
