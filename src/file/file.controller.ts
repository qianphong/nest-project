import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Optional,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filesize } from 'filesize';
import { FileResponse } from './file';
import { FileInterceptor } from './file.interceptor';
import { slash } from '@/utils/slash';
import { Message } from './file.decorator';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { FileGuard } from './file.guard';
import { readFile } from 'fs/promises';
import { Response } from 'express';
import * as mime from 'mime';
import sharp from 'sharp';
import { FileOptions } from './dto/options.dto';

@Controller('file')
@UseInterceptors(FileInterceptor)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 4, {
      storage: diskStorage({
        destination: 'upload',
        filename(req, file, cb) {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Message('上传成功')
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
          new FileTypeValidator({
            fileType: 'image/png',
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): FileResponse[] {
    return files.map((file) => {
      return {
        name: file.originalname,
        path: slash(file.path),
        size: filesize(file.size).toLocaleString(),
      };
    });
  }

  @Get(':name')
  async getFile(
    @Param('name') name: string,
    @Res() res: Response,
    @Query()
    options: FileOptions,
  ) {
    const filepath = resolve(__dirname, '../../upload', name);

    if (!existsSync(filepath)) {
      throw new NotFoundException('文件不存在');
    } else {
      const data = await this.fileService.compress(filepath, options);
      res.set('Content-type', mime.getType(filepath));
      res.send(data);
    }
  }
}
