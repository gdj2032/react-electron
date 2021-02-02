import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { APP_NAME, BACKGROUND_COLOR, FONT_SIZE } from 'constants/index';
import pathConfig from 'routes/pathConfig';
import { updateLocal } from 'actions/setting';
import { message, Switch, Drawer } from 'antd';
import { getLineHeight } from 'utils';

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
  showMenu: boolean;
  contentData: any;
  contentDataPage: number;
  showDrawer: boolean;
  showChildDrawer: boolean;
}

class BookPage extends React.Component<Props> {

  refs: any;

  state: IState = {
    id: this.props.match.params.id,
    data: null,
    currentPage: 0,
    content: '',
    showMenu: this.props.local.showMenu,
    contentData: [], //每一行显示的内容
    contentDataPage: 0,
    showDrawer: false,
    showChildDrawer: false,
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { texts } = this.props.local;
    const d: ITextData[] = texts.filter((e: ITextData) => e.id === Number(this.state.id))
    if (d.length === 0) {
      message.error('内容获取失败')
      this.onGoBack();
      return;
    };
    const data = d[0]
    const { currentPage } = data;
    const cont: any = data.data && data.data.find((e: IData) => e.page === currentPage)
    this.setState({ data, currentPage, content: cont.content })
    document.title = data.name
    // this.getContentData(cont.content)
  }

  getContentData = (cont: string, isPrev?: boolean) => {
    const { offsetWidth, offsetHeight } = this.refs;
    const { fontSize } = this.props.local;// 字体大小 fontSize
    const lineHeight = getLineHeight(fontSize);// 行高
    const t = cont.split('\n')
    let cData: any[] = [];
    let text: string = '';
    let cHeight = 0;
    const w = offsetWidth - 40; // 左右内边距40
    const maxFont = Math.ceil(w / fontSize) //一行最大字数
    t.map((e: string) => {
      // if (!e.trim()) return;
      // e = e.trim()
      const h = cData.length > 0 ? offsetHeight - 68 : offsetHeight - 100 // 标题32 上下内边距36 下一页高度32
      const len = e.length;
      console.log("BookPage -> getContentData -> e", e)
      if (len > maxFont) {
        const lineNum = Math.ceil(len / maxFont)
        for (let i = 0; i < lineNum; i++) {
          const t = e.substr(i * maxFont, maxFont)
          if (cHeight >= h) {
            cData.push(text)
            text = `${i === 0 ? '  ' : ''}${t}\n`
            cHeight = lineHeight
          } else {
            text += `${i === 0 ? '  ' : ''}${t}\n`;
            cHeight += lineHeight;
          }
        }
      } else {
        if (cHeight >= h) {
          cData.push(text)
          text = `  ${e}\n`;
          cHeight = lineHeight
        } else {
          text += `  ${e}\n`;
          cHeight += lineHeight;
        }
      }
    })
    if (cData.length === 0) {
      cData.push(text)
    }
    this.setState({ contentData: cData, contentDataPage: isPrev ? cData.length - 1 : 0 })
  }

  onGoBack = () => {
    this.props.history.replace(pathConfig.home)
    document.title = APP_NAME
  }

  onNext = () => {
    const { contentDataPage, contentData } = this.state;
    if (contentDataPage < contentData.length - 1) {
      this.setState({ contentDataPage: contentDataPage + 1 })
      return;
    }
    const { data, currentPage } = this.state;
    const pageNumber = currentPage + 1;
    const cont: any = data.data && data.data.find((e: IData) => e.page === pageNumber)
    console.log("BookPage -> onNext -> cont", cont)
    // this.getContentData(cont.content)
    this.setState({ currentPage: pageNumber, content: cont.content })
    const { texts } = this.props.local;
    texts.map((e: ITextData) => {
      if (e.id === Number(this.state.id)) {
        e.currentPage = pageNumber;
      }
    })
    this.props.dispatch(updateLocal({ texts }))
  }

  onPrev = () => {
    const { contentDataPage } = this.state;
    if (contentDataPage === 0) {
      const { data, currentPage } = this.state;
      const pageNumber = currentPage - 1;
      const cont: any = data.data && data.data.find((e: IData) => e.page === pageNumber)
      console.log("BookPage -> onNext -> cont", cont)
      // this.getContentData(cont.content, true)
      this.setState({ currentPage: pageNumber, content: cont.content })
      const { texts } = this.props.local;
      texts.map((e: ITextData) => {
        if (e.id === Number(this.state.id)) {
          e.currentPage = pageNumber;
        }
      })
      this.props.dispatch(updateLocal({ texts }))
    } else {
      this.setState({ contentDataPage: contentDataPage - 1 })
    }
  }

  onChangeBGColor = (e: any) => {
    this.props.dispatch(updateLocal({ backgroundColor: e, fontColor: BACKGROUND_COLOR.getFontColor(e) }))
  }

  onChangeFontSize = (bool: boolean) => {
    const { fontSize } = this.props.local;
    let f = fontSize;
    if (bool) {
      if (fontSize >= FONT_SIZE.max) return;
      f += 2;
    } else {
      if (fontSize <= FONT_SIZE.min) return;
      f -= 2;
    }
    this.props.dispatch(updateLocal({ fontSize: f }))
    // setTimeout(() => {
    //   this.getContentData(this.state.content)
    // }, 100)
  }

  onChangeSwitch = (automaticNext: any) => {
    this.props.dispatch(updateLocal({ automaticNext }))
  }

  onChangeSpeed = (bool: boolean) => {
    const { automaticSpeed } = this.props.local;
    if (!bool && automaticSpeed === 1) return
    let s = automaticSpeed
    if (bool) {
      s -= 1;
    } else {
      s += 1
    }
    this.props.dispatch(updateLocal({ automaticSpeed: s }))
  }

  onCloseDrawer = () => {
    this.setState({ showDrawer: false })
  }

  onShowDrawer = () => {
    this.setState({ showDrawer: true })
  }

  onChangePage = (e: IMenu) => {
    console.log("BookPage -> onChangePage -> e", e)
    const { page } = e;
    const { data } = this.state;
    const cont: any = data.data && data.data.find((e: IData) => e.page === page)
    // this.getContentData(cont.content)
    this.setState({ currentPage: page, content: cont.content })
    const { texts } = this.props.local;
    texts.map((e: ITextData) => {
      if (e.id === Number(this.state.id)) {
        e.currentPage = page;
      }
    })
    this.props.dispatch(updateLocal({ texts }))
  }

  renderDrawers = () => {
    const { showDrawer, data, currentPage } = this.state;
    const { fontSize, backgroundColor, automaticNext, automaticSpeed } = this.props.local;
    const title = data && data.menu.find((e: IMenu) => e.page === currentPage)?.title;
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={this.onCloseDrawer}
        visible={showDrawer}
      >
        <div className="drawer-affix">
          <div className="drawer-back" onClick={this.onGoBack}>返回</div>
          <div className="drawer-item">
            <p>字体大小:</p>
            <p className={`drawer-font-size ${fontSize === FONT_SIZE.min ? 'drawer-font-size-inactive' : ''}`} onClick={() => this.onChangeFontSize(false)}>A -</p>
            <p className={`drawer-font-size ${fontSize === FONT_SIZE.max ? 'drawer-font-size-inactive' : ''}`} onClick={() => this.onChangeFontSize(true)}>A +</p>
          </div>
          <div className="">
            <div>背景颜色:</div>
            <div className="drawer-item-bg">
              {
                BACKGROUND_COLOR.list.map((e: any) => {
                  return (
                    <p className={`drawer-bg-color ${e === backgroundColor ? 'drawer-bg-color-active' : ''}`} key={e} style={{ backgroundColor: e }} onClick={() => this.onChangeBGColor(e)}></p>
                  )
                })
              }
            </div>
          </div>
          <div className="drawer-page-turn">
            <div className="drawer-switch">
              <span>自动翻页:</span>
              <Switch size="small" checked={automaticNext} onChange={this.onChangeSwitch} />
            </div>
            <div className="drawer-page-speed">
              {
                automaticNext &&
                <div className="drawer-switch-speed">
                  <p>翻页速度:</p>
                  <p className={`drawer-font-size ${automaticSpeed === 1 ? 'drawer-font-size-inactive' : ''}`} onClick={() => this.onChangeSpeed(false)}>-</p>
                  <p className={`drawer-font-size `} onClick={() => this.onChangeSpeed(true)}>+</p>
                </div>
              }
            </div>
          </div>
          <h1 className="menu-title">目录</h1>
        </div>
        <div className="drawer-menu">
          {
            data && data.menu.map((e: IMenu) => <div key={e.title} className={`menu-title ${title === e.title ? 'active-menu' : ''}`} onClick={() => this.onChangePage(e)}>{e.title}</div>)
          }
        </div>
      </Drawer>
    )
  }

  render() {
    const { data, currentPage, content, contentDataPage } = this.state;
    const { fontColor, fontSize, backgroundColor } = this.props.local;
    const title = data && data.menu.find((e: IMenu) => e.page === currentPage).title;
    return (
      <div className="g-book" style={{ backgroundColor }} ref={(c: any) => this.refs = c} >
        {this.renderDrawers()}
        {
          contentDataPage === 0 || <div className="min-title">{title}</div>
        }
        <div className="content-title">{title}</div>
        <div className="content" style={{ color: fontColor, fontSize: `${fontSize}px`, lineHeight: `${getLineHeight(fontSize)}px` }}>
          {content}
        </div>
        <div className="fixed-div">
          <div className="fixed-div-left" onClick={this.onPrev}></div>
          <div className="fixed-div-center" onClick={this.onShowDrawer}></div>
          <div className="fixed-div-right" onClick={this.onNext}></div>
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
export default connect(mapStateToProps)(BookPage as any);
