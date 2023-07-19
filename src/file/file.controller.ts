import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as mime from 'mime';
import { filesize } from 'filesize';
import { resolve } from 'path';
import { FileService } from './file.service';
import { FileResponse } from './file';
import { FileInterceptor } from './file.interceptor';
import { slash } from '@/utils/slash';
import { Message } from './file.decorator';
import { existsSync } from 'fs';
import { FileGuard } from './file.guard';
import { FileOptions } from './dto/options.dto';

@Controller('file')
@UseInterceptors(FileInterceptor)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @Message('上传成功')
  @UseInterceptors(
    FilesInterceptor('file', 4, {
      storage: diskStorage({
        destination: 'upload',
        filename(req, file, cb) {
          cb(
            null,
            `${Date.now()}-${Buffer.from(file.originalname, 'latin1').toString(
              'utf-8',
            )}`,
          );
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
          new FileTypeValidator({
            fileType: /^image\/(png|gif)$/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): FileResponse[] {
    return files.map((file) => {
      return {
        name: file.filename,
        path: slash(file.path),
        size: filesize(file.size).toLocaleString(),
      };
    });
  }

  @Get(':name')
  // @UseGuards(FileGuard)
  async getFile(
    @Param('name') name: string,
    @Res() res: Response,
    @Query(ValidationPipe)
    options: FileOptions,
  ) {
    const filepath = resolve(__dirname, '../../upload', name);
    if (!existsSync(filepath)) {
      throw new NotFoundException('文件不存在');
    } else {
      const type = mime.getType(filepath);
      const data = await this.fileService.compress(filepath, type, options);
      res.set('Content-type', type);
      res.send(data);
    }
  }
}
