export const PAGE_SIZE = 1000;

export const APP_NAME = 'Txt小说阅读器'

export const CONTENT_TYPE = {
  text: 'text',
  synopsis: 'synopsis',
  toString: (key: any) => {
    switch (key) {
      case CONTENT_TYPE.text:
        return '正文'
      case CONTENT_TYPE.synopsis:
        return '简介'
      default:
        return '未知'
    }
  }
}

export const COLOR = [
  '#FF7032',
  '#FFC141',
  '#8CD24C',
  '#4CD2B0',
  '#59BCF3',
  '#607AFB',
  '#CC60FB',
  '#FB6088',
  '#E1888C',
  '#A1609C',
  '#6F60A1',
  '#6075A1',
  '#609FA1',
  '#60A162',
  '#97A160',
  '#C0A67A',
]
