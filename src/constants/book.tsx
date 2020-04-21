export const FONT_SIZE = {
  min: 10,
  max: 24,
  list: [10, 12, 14, 16, 18, 20, 22, 24],
}

export const ACTIVE_COLOR = '#FB6088';

export const FONT_COLOR = {
  white: 'rgba(255, 255, 255, 1)',
  gray: 'rgba(245, 245, 245, 1)',
  gray2: 'rgba(0, 0, 0, .6)',
  black: 'rgba(0, 0, 0, 1)',
}

export const BACKGROUND_COLOR = {
  white: 'rgba(255, 255, 255, 1)',
  yellow: 'rgba(248, 242, 227, 1)',
  green: 'rgba(224, 248, 186, 1)',
  purple: 'rgba(113, 26, 226, .2)',
  gray: 'rgba(74, 75, 77, 1)',
  black: 'rgba(0, 0, 0, 1)',
  list: [
    'rgba(255, 255, 255, 1)',
    'rgba(248, 242, 227, 1)',
    'rgba(224, 248, 186, 1)',
    'rgba(113, 26, 226, .2)',
    'rgba(74, 75, 77, 1)',
    'rgba(0, 0, 0, 1)',
  ],
  getFontColor: (key: any) => {
    switch (key) {
      case BACKGROUND_COLOR.black:
        return FONT_COLOR.white
      case BACKGROUND_COLOR.purple:
        return FONT_COLOR.gray2
      case BACKGROUND_COLOR.gray:
        return FONT_COLOR.gray
      default:
        return FONT_COLOR.black
    }
  }
}
