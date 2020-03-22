import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { reduxStore } from 'utils/visible';
import { message } from 'antd';

interface Props {
  dispatch: any,
  local: any,
}
class HomePage extends React.Component<Props> {
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
        const txt = this.result;
        console.log("HomePage -> reader.onload -> txt", txt)
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
        <div></div>
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
