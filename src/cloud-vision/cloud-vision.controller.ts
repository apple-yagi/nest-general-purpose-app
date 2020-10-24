import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudVisionService } from './cloud-vision.service';
import { IUploadedFile } from 'types/file';
import { LabelAnnotateResult } from 'types/cloud-vision';

@Controller('cloud-vision')
export class CloudVisionController {
  constructor(private readonly cloudVisionService: CloudVisionService) {}

  @Get()
  index(): Promise<LabelAnnotateResult[]> {
    return this.cloudVisionService.findAll();
  }

  @Post('detection')
  @UseInterceptors(FileInterceptor('file'))
  detection(
    @UploadedFile() file: IUploadedFile,
    @Query('type') type: string,
  ): Promise<any> {
    if (file === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'File not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.cloudVisionService.detection(file.path, type);
    }
  }
}
