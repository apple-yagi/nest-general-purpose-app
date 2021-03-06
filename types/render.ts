export interface HeadData {
  title: string,
  stylesheets: Array<string>,
  activePage: string,
}

export interface ContentData {
  title: string,
  img: {
    src: string,
    alt: string
  },
  href: string,
  description: string
}

export interface VisionTableData {
  href: string,
  type: string,
  description: string
}