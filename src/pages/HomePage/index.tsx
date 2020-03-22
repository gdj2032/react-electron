import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';
import { message } from 'antd';
import { unique } from 'utils';

interface Props {
  dispatch: any,
  local: any,
}
class HomePage extends React.Component<Props> {

  state = {
    books: [],
  }
  componentDidMount() {
    console.log('this.props', this.props)
    reduxStore.dispatch = this.props.dispatch;
  }

  onInputFile = (e: any) => {
    const files = e.nativeEvent.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type !== 'text/plain') {
        message.error('文件类型错误');
        return;
      }
      console.log("HomePage -> onInputFile -> file", file)
      const reader = new FileReader();
      // 新建 FileReader 对象
      reader.onload = function () {
        // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
        const txt: any = this.result;
        console.log("HomePage -> reader.onload -> txt", txt)
        const createTime = new Date()
        const id = createTime.getTime()
        const size = file.size;
        const author = txt.split('\n').filter((e: any) => e.indexOf('作者') !== -1)[0].split("作者：")[1]
        const title = txt.match(/《(\S*)》/)[1]
        const bookData: IBookData = { id, size, createTime, name: title, author }
        console.log("HomePage -> reader.onload -> bookData", bookData)
        const chapter = txt.split('\n').filter((e: any) => e.indexOf('第') !== -1 && e.indexOf('章') !== -1)
        console.log("HomePage -> reader.onload -> chapter", unique(chapter))
        // let textData = [];
        let content = txt;
        chapter.map((item: any, idx: number) => {
          const arr = content.split(item)
          content = arr[1]
          const cont = arr[0]
          if (idx === 3) {
            console.log("HomePage -> reader.onload -> cont", cont, cont.length)
          }
        })
      };
      // 设置以什么方式读取文件，这里以文本方式
      reader.readAsText(file, 'gb2312');
    }
  }

  render() {
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
