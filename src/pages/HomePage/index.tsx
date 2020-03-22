import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';
import { message } from 'antd';
import { unique } from 'utils';
import { PAGE_SIZE } from 'constants/index';
import { updateBooks, updateTexts } from 'actions/setting';

interface Props {
  dispatch: any,
  local: any,
}
class HomePage extends React.Component<Props> {

  state = {
    booksData: this.props.local.books && this.props.local.books.data,
  }
  componentDidMount() {
    console.log('this.props', this.props)
    reduxStore.dispatch = this.props.dispatch;
  }

  onInputFile = (e: any) => {
    const { dispatch, local } = this.props;
    // console.log("HomePage -> onInputFile -> dispatch", dispatch)
    const { texts, books } = local;
    const files = e.nativeEvent.target.files;
    const self = this;
    if (files.length > 0) {
      const file = files[0];
      if (file.type !== 'text/plain') {
        message.error('文件类型错误');
        return;
      }
      const reader = new FileReader();
      // 新建 FileReader 对象
      reader.onload = function () {
        // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
        const txt: any = this.result;
        // const txt: any = ``
        const createTime = new Date()
        const id = createTime.getTime()
        const size = file.size;
        const author = txt.split('\n').filter((e: any) => e.indexOf('作者') !== -1)[0].split("作者：")[1]
        const name = txt.match(/《(\S*)》/)[1]
        const isExit = books && books.data && books.data.find((e: any) => e.author === author && e.name === name);
        if (isExit) {
          message.error('小说已存在');
          return;
        }
        const bookData: IBookData = { id, size, createTime, name, author }
        let chapter = self.getChapter(txt);
        let content = txt;
        // 正文内容信息
        const data: IData[] = []
        const menu: IMenu[] = []
        chapter = unique(chapter)
        chapter.map((item: any, idx: number) => {
          const arr = content.split(item)
          content = arr[arr.length - 1];
          const str = arr[0]
          if (!str || str === '\n') return;
          if (idx === 0) {
            const d: IData = {
              type: 'synopsis',
              content: str,
              page: 1,
            }
            data.push(d)
            menu.push({ page: 1, title: '简介' })
          } else {
            const len = str.length;
            const times = Math.ceil(len / PAGE_SIZE)
            for (let i = 0; i < times; i++) {
              if (i === 0) {
                menu.push({ page: data.length + 1, title: chapter[idx - 1].trim() })
              }
              const a = str.substr(i * PAGE_SIZE, PAGE_SIZE)
              const d: IData = {
                type: 'text',
                content: a,
                page: data.length + 1,
              }
              data.push(d)
            }
          }
          if (idx === chapter.length - 1) {
            const len = content.length;
            const times = Math.ceil(len / PAGE_SIZE)
            for (let i = 0; i < times; i++) {
              if (i === 0) {
                menu.push({ page: data.length + 1, title: chapter[idx].trim() })
              }
              const a = str.substr(i * PAGE_SIZE, PAGE_SIZE)
              const d: IData = {
                type: 'text',
                content: a,
                page: data.length + 1,
              }
              data.push(d)
            }
          }
        })
        const textData: ITextData = { id, size, pages: data.length, data, menu, currentPage: 1, name };
        const booksData = (books && books.data) || [];
        const textsData = (texts && texts.data) || [];
        booksData.unshift(bookData)
        // console.log("HomePage -> reader.onload -> booksData", booksData)
        textsData.push(textData)
        // console.log("HomePage -> reader.onload -> textsData", textsData)
        dispatch(updateBooks({ data: booksData }))
        dispatch(updateTexts({ data: textsData }))
      };
      // 设置以什么方式读取文件，这里以文本方式
      reader.readAsText(file, 'gb2312');
    }
  }

  getChapter = (txt: any) => {
    let chapter = txt.split('\n').filter((e: any) => e.indexOf('第') !== -1 && e.indexOf('章') !== -1)
    if (chapter.length > 100) {
      return chapter;
    }
    chapter = txt.split('\n').filter((e: any) => e.indexOf('章 ') !== -1)
    return chapter;
  }

  bookList = (item: IBookData, idx: number) => {
    return (
      <div className={`book-item ${ idx !== 0 && idx % 5 === 0 ? 'book-item-last' : '' }`} key={item.id}>
        <div>{item.name}</div>
      </div>
    )
  }

  render() {
    const { booksData } = this.state;
    return (
      <div className="g-home">
        <div className="p-header">
          <div className="header-title">txt小说阅读器</div>
          <div className="header-button">
            <span className="sort">排序方式</span>
            <span className="manage">管理</span>
            <span className="file">
              添加<input type="file" name="" id="" onChange={this.onInputFile} />
            </span>
          </div>
        </div>
        <div className="p-book-list">
          {
            booksData.map((item: any, idx: number) => this.bookList(item, idx))
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    local: state.local,
  };
}
export default connect(mapStateToProps)(HomePage as any);
