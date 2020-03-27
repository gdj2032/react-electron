import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { APP_NAME } from 'constants/index';
import pathConfig from 'routes/pathConfig';

interface Props {
  dispatch: any,
  local: any,
  match: any,
  history: any,
}

interface IState {
  id: any;
  data: any;
  currentPage: number;
  content: string;
  currentNumber: number;
  showTopBar: boolean;
}

class BookPage extends React.Component<Props> {

  state: IState = {
    id: this.props.match.params.id,
    data: null,
    currentPage: 0,
    content: '',
    currentNumber: 1,
    showTopBar: false,
  }

  componentDidMount() {
    console.log('this.props', this.props)
    const { texts } = this.props.local;
    const data: ITextData = texts.filter((e: ITextData) => e.id === Number(this.state.id))[0]
    const { currentPage, currentNumber } = data;
    const cont: any = data.data && data.data.find((e: IData) => e.page === currentPage)
    this.setState({ data, currentPage, content: cont.content, currentNumber })
    document.title = data.name
  }

  onGoBack = () => {
    this.props.history.replace(pathConfig.home)
    document.title = APP_NAME
  }

  onNext = () => {
    const { data, currentPage } = this.state;
    const pageNumber = currentPage + 1;
    const cont: any = data.data && data.data.find((e: IData) => e.page === pageNumber)
    console.log("BookPage -> onNext -> cont", cont)
    this.setState({ currentPage: pageNumber, content: cont.content })
  }

  onTopBarMove = (e: any) => {
    console.log("BookPage -> onTopBarMove -> e", e)
    this.setState({ showTopBar: true })
  }

  onTopBarLeave = (e: any) => {
    console.log("BookPage -> onTopBarLeave -> e", e)
    this.setState({ showTopBar: false })
  }

  render() {
    const { data, content, currentPage, showTopBar } = this.state;
    console.log("BookPage -> render -> data", data)
    return (
      <div className="g-book">
        <a className="back" onClick={this.onGoBack}>返回</a>
        <div className="top-bar" onMouseOver={this.onTopBarMove} onMouseLeave={this.onTopBarLeave}>
          {
            <div className={`top-bar-item ${showTopBar ? 'top-bar-item-active' : ''}`}>123</div>
          }
        </div>
        <div className="content">
          <h1>{data && data.menu.find((e: IMenu) => e.page === currentPage).title}</h1>
          {
            content.split('\n').map((e: any, idx: number) => {
              if (!e) return;
              return (
                <div key={idx}>{e}</div>
              )
            })
          }
        </div>
        <div className="current_page"><a onClick={this.onNext}>下一页</a></div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    local: state.local,
  };
}
export default connect(mapStateToProps)(BookPage as any);
