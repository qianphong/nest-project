import { IsOptional, IsIn, IsNumberString } from 'class-validator';

const MODE = ['cover', 'contain', 'fill', 'inside', 'outside'] as const;
export class FileOptions {
  /**
   * 宽
   */
  @IsNumberString()
  @IsOptional()
  w?: string;

  /**
   * 高
   */
  @IsNumberString()
  @IsOptional()
  h?: string;

  /**
   * 图片裁切模式
   */
  @IsIn(MODE)
  @IsOptional()
  m?: (typeof MODE)[number];

  /**
   * 质量
   */
  @IsNumberString()
  @IsOptional()
  q?: string;

  /**
   * 缩放级别
   */

  @IsNumberString()
  @IsOptional()
  level?: string;
}
