import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';
import { message, Dropdown, Menu } from 'antd';
import { unique } from 'utils';
import { PAGE_SIZE, COLOR } from 'constants/index';
import { updateLocal } from 'actions/setting';
import Svg from 'component/Svg';
import DeleteSvg from 'static/delete.svg'
import pathConfig from 'routes/pathConfig';

interface Props {
  dispatch: any;
  local: any;
  history: any;
}
class HomePage extends React.Component<Props> {

  fileRefs: any

  state = {
    booksData: this.props.local && this.props.local.books,
    textsData: this.props.local && this.props.local.texts,
    isManage: false,
  }
  componentDidMount() {
    reduxStore.dispatch = this.props.dispatch;
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      booksData: this.props.local && this.props.local.books,
      textsData: this.props.local && this.props.local.texts,
    })
  }

  onInputFile = (e: any) => {
    const { dispatch } = this.props;
    // console.log("HomePage -> onInputFile -> dispatch", dispatch)
    const { textsData: texts, booksData: books } = this.state;
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
        const author = self.getAuthor(txt)
        const name = self.getName(txt, file)
        const isExit = books && books.find((e: any) => e.author === author && e.name === name);
        console.log("HomePage -> reader.onload -> isExit", isExit)
        if (isExit) {
          message.error('小说已存在');
          self.fileRefs.value = null
          return;
        }
        const bookData: IBookData = { id, size, createTime, name, author }
        let chapter = self.getChapter(txt);
        // 正文内容信息
        const data: IData[] = []
        const menu: IMenu[] = []
        if (!chapter) {
          const len = txt.length;
          const times = Math.ceil(len / PAGE_SIZE)
          for (let i = 0; i < times; i++) {
            if (i === 0) {
              menu.push({ page: data.length + 1, title: `${i + 1}` })
            }
            const a = txt.substr(i * PAGE_SIZE, PAGE_SIZE)
            const d: IData = {
              type: 'text',
              content: a,
              page: data.length + 1,
            }
            data.push(d)
            menu.push({ page: data.length + 1, title: `${i + 1}` })
          }
        } else {
          let content = txt;
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
        }
        const textData: ITextData = { id, size, pages: data.length, data, menu, currentPage: 1, name };
        const booksData = (books) || [];
        const textsData = (texts) || [];
        booksData.unshift(bookData)
        // console.log("HomePage -> reader.onload -> booksData", booksData)
        textsData.push(textData)
        // console.log("HomePage -> reader.onload -> textsData", textsData)
        dispatch(updateLocal({ books: booksData }))
        dispatch(updateLocal({ texts: textsData }))
        self.fileRefs.value = null
      };
      // 设置以什么方式读取文件，这里以文本方式
      reader.readAsText(file, 'gb2312');
    }
  }

  getChapter = (txt: any) => {
    let chapter = txt.split('\n').filter((e: any) => e.includes('第') && e.includes('章'))
    if (chapter.length > 100) {
      return chapter;
    }
    chapter = txt.split('\n').filter((e: any) => e.includes('章 '))
    if (chapter.length > 100) {
      return chapter;
    }
    return false;
  }

  getName = (txt: any, file: any) => {
    const exit = txt.split('\n').filter((e: any) => e.includes('书名'));
    if (exit.length > 0) {
      const n = exit[0].split("书名：");
      if (n.length > 1) {
        return n[1]
      }
    }
    const n = txt.match(/《(\S*)》/)
    if (n) {
      return n[1]
    }
    return file.name.split('.')[0].trim()
  }

  getAuthor = (txt: any) => {
    const t = txt.split('\n').filter((e: any) => e.includes('作者'));
    if (t.length > 0) {
      return t[0].split("作者：")[1]
    }
    return '未知';
  }

  menus = [
    {
      text: '最近阅读',
      id: 1,
      type: 'sort'
    },
    {
      text: '添加日期',
      id: 2,
      type: 'sort'
    },
  ]

  menu = (
    <Menu>
      {
        this.menus.map((e: any) => {
          return (
            <Menu.Item key={e.id}>
              <a onClick={() => this.onSortClick(e)}>{e.text}</a>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  sortWay = () => {
    return (
      <Dropdown overlay={this.menu}>
        <a className="ant-dropdown-link">
          排序方式
        </a>
      </Dropdown>
    )
  }

  onSortClick = (e: any) => {
    const { id } = e;
    const { booksData } = this.state;
    if (id === 2) {
      const data = booksData.sort((a: any, b: any) => a.createTime > b.createTime)
      console.log("HomePage -> onSortClick -> data", data)
      this.setState({ booksData: data })
    }
    if (id === 1) {
      const data = booksData.sort((a: any, b: any) => a.modifyTime > b.modifyTime)
      console.log("HomePage -> onSortClick -> data", data)
      this.setState({ booksData: data })
    }
  }

  onManageClick = () => {
    this.setState({ isManage: !this.state.isManage })
  }

  bookList = (item: IBookData, idx: number) => {
    return (
      <div className={`book-item ${idx !== 0 && idx % 5 === 0 ? 'book-item-last' : ''}`} key={item.id} onClick={() => this.onBookClick(item)}>
        <div className="i-top-bg" style={{ backgroundColor: COLOR[Number(item.id) % COLOR.length] }}>
          <div className="i-top-name">{item.name}</div>
          <div className="i-top-author">{item.author}</div>
        </div>
        {
          this.state.isManage &&
          <div className="i-delete" onClick={() => this.onDelete(item)}>
            <Svg src={DeleteSvg} width="20" height="20" />
          </div>
        }
      </div>
    )
  }

  onBookClick = (item: IBookData) => {
    this.props.history.push(`${pathConfig.book}/${item.id}`)
  }

  onDelete = (item: IBookData) => {
    const { id } = item;
    const { dispatch, local } = this.props;
    const { texts, books } = local;
    const booksData = books.data.filter((e: IBookData) => e.id !== id)
    const textsData = texts.data.filter((e: IBookData) => e.id !== id)
    dispatch(updateLocal({ books: booksData }))
    dispatch(updateLocal({ texts: textsData }))
  }

  render() {
    const { booksData, isManage } = this.state;
    return (
      <div className="g-home">
        <div className="p-header">
          <div className="header-title">txt小说阅读器</div>
          <div className="header-button">
            <span className="sort">{this.sortWay()}</span>
            <span className="manage" onClick={this.onManageClick}>
              <a>{isManage ? '取消' : '管理'}</a>
            </span>
            <span className="file">
              添加<input type="file" name="" id="" onChange={this.onInputFile} ref={(c: any) => this.fileRefs = c} />
            </span>
          </div>
        </div>
        <div className="p-book-list">
          {
            booksData && booksData.map((item: IBookData, idx: number) => this.bookList(item, idx))
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
