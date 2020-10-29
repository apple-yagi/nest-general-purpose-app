import { Controller, Get, Render } from '@nestjs/common';
import { HeadData } from 'types/render';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    const headData: HeadData = {
      title: "Purpose Top",
      stylesheets: ['<link rel="stylesheet" href="stylesheets/animation.css">'],
      activePage: 'home'
    }
    return headData
  }
}
