import { Controller, Get, Render } from '@nestjs/common';
import { ContentData, HeadData } from 'types/render';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    const headData: HeadData = {
      title: 'Purpose API',
      stylesheets: ['<link rel="stylesheet" href="stylesheets/animation.css">'],
      activePage: 'home',
    };

    const openapi: ContentData = {
      title: "Swagger",
      img: {
        src: "https://cdn.svgporn.com/logos/swagger.svg",
        alt: "swagger logo"
      },
      href: "/api",
      description: "SwaggerはRESTful APIを構築するためのオープンソースのフレームワークです。REST APIの設計、構築、文書化、および使用に役立つ機能を提供します。"
    }

    const cloudVision: ContentData = {
      title: "Vision API",
      img: {
        src: "/images/cloud-vision-api-512-color.svg",
        alt: "cloud vision api"
      },
      href: "/cloud-vision",
      description: "Google Cloud の Vision API は REST API や RPC API を介して強力な事前トレーニング済み機械学習モデルを提供します。画像にラベルを割り当てることで、事前定義済みの数百万のカテゴリに画像を高速に分類できます。"
    }

    const graphql: ContentData = {
      title: "GraphQL",
      img: {
        src: "https://cdn.svgporn.com/logos/graphql.svg",
        alt: "GraphQL logo"
      },
      href: "/graphql",
      description: "GraphQL は、アプリケーション・プログラミング・インタフェース (API) 向けのクエリ言語とサーバーサイドランタイムの両方を指します。クライアントがリクエストしたデータだけを提供することを優先します。"
    }

    const contentList: Array<ContentData> = [openapi, cloudVision, graphql]

    return { headData: headData, contentList: contentList };
  }
}
