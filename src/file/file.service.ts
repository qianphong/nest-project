import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as sharp from 'sharp';
import { FileOptions } from './dto/options.dto';

@Injectable()
export class FileService {
  async compress(path: string, type: string, options: FileOptions) {
    const { q, w, h, m, level = 6 } = options;

    const image = sharp(path, {
      animated: true,
      limitInputPixels: false,
    });
    if (w && h) {
      image.resize({
        width: +w,
        height: +h,
        fit: m,
      });
    } else if (!(!w && !h)) {
      throw new BadRequestException('必须同时提供宽度和高度');
    }
    if (q) {
      image.png({
        quality: +q,
        compressionLevel: +level,
      });
    }
    // image.gif({
    //   colors,
    // });
    // .png({
    //   compressionLevel: +q,
    // })
    // .toBuffer();

    return await image.toBuffer();
  }
}
