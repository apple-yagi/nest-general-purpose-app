import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudVisionService } from './cloud-vision.service';
import { IUploadedFile } from 'types/file';
import { HeadData } from 'types/render';
import visions from './render-data/visions';

@Controller('cloud-vision')
export class CloudVisionController {
  constructor(private readonly cloudVisionService: CloudVisionService) {}

  @Get()
  @Render('cloud-vision/index')
  root() {
    const headData: HeadData = {
      title: 'Cloud Vision',
      stylesheets: [
        '<link rel="stylesheet" href="stylesheets/animation.css">',
        '<link rel="stylesheet" href="stylesheets/cloud-vision.css">',
        '<script type="text/javascript" src="javascripts/vision-api.js"></script>',
      ],
      activePage: 'cloud-vision',
    };

    return { headData: headData, visions: visions };
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
