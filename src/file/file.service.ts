import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { FileOptions } from './dto/options.dto';

@Injectable()
export class FileService {
  async compress(path: string, options: FileOptions) {
    const data = await sharp(path)
      .png({
        compressionLevel: +options.level,
      })
      .toBuffer();
    return data;
  }
}
