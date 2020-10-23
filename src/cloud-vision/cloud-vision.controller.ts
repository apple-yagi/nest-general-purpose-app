import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudVisionService } from './cloud-vision.service';
import { AnnotateResult } from 'types/cloud-vision';
import { IUploadedFile } from 'types/file';

@Controller('cloud-vision')
export class CloudVisionController {
  constructor(private readonly cloudVisionService: CloudVisionService) { }

  @Post('detection')
  @UseInterceptors(FileInterceptor('file'))
  faceDetection(
    @UploadedFile() file: IUploadedFile,
    @Query('type') type: string,
  ): Promise<AnnotateResult[]> {
    if (file === undefined) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "File not exist"
      }, HttpStatus.BAD_REQUEST)
    } else {
      return this.cloudVisionService.detection(file, type);
    }
  }
}
