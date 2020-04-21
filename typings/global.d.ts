declare module 'redux-persist/es/integration/react';

interface IBookData {
  id: string | number; //唯一标识
  name: string; //名称
  author: string; //作者
  createTime: Date; //添加时间
  modifyTime?: Date; //最后一次看书时间
  size: number; //txt大小 字节
  txt?: string; //小说文本
}

interface ITextData {
  id: string | number; //唯一标识
  data: IData[]; // 分页数据
  pages: number; //总页数
  size: number; //txt大小 字节
  currentPage: number; //最后一次看书的章节
  currentNumber?: number; //最后一次看书的章节页码
  menu: IMenu[] //目录
  name: string;
}

interface IData {
  type: 'synopsis' | 'title' | 'text';
  content: string;
  page?: number; //如果是title 则是需要跳转页面
}

interface IMenu {
  page: number; //跳转的页面
  title: string; //章节标题
}