import {
  Controller,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudVisionService } from './cloud-vision.service';
import { AnnotateResult } from 'types/cloud-vision';

@Controller('cloud-vision')
export class CloudVisionController {
  constructor(private readonly cloudVisionService: CloudVisionService) { }

  @Get('detection')
  @UseInterceptors(FileInterceptor('file'))
  faceDetection(
    @UploadedFile() file,
    @Query('type') type,
  ) {
    // return this.cloudVisionService.detection(file, type);
    return { file: file, type: type }
  }
}
