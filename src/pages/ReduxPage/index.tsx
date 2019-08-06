import * as React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { updateAccount, updateSettings } from 'actions/setting';
// import { reduxStore } from 'utils/visible';

interface Props {
  account: any,
  updateSetting: any,
  dispatch: any,
}
interface State {
  name: any,
  arr: any,
  setting: any,
  name_val: any,
  setting_val: any,
}

class ReduxPage extends React.Component<Props, State> {
  static defaultProps = {
    visible: false,
  }

  state = {
    name: '',
    arr: [],
    setting: null,
    name_val: '',
    setting_val: '',
  }

  componentDidMount() {
    const { account, updateSetting } = this.props;
    this.setState({
      name: account.name,
      arr: account.arr,
      setting: updateSetting.updateSetting
    })
  }

  componentWillReceiveProps(nextProps: any) {
    console.log('nextProps', nextProps);
    this.setState({name: nextProps.account.name})
    this.setState({setting: nextProps.updateSetting.updateSetting})
  }

  onChangeName(v: any) {
    console.log(v.target.value)
    this.setState({ name_val: v.target.value });
  }
  onClickName() {
    const { name_val } = this.state;
    this.props.dispatch(updateAccount({ name: name_val }));
    this.setState({ name_val: '' });
  }

  onChangeSetting(v: any) {
    console.log(v.target.value)
    this.setState({ setting_val: v.target.value });
  }
  onClickSetting() {
    this.props.dispatch(updateSettings({updateSetting: this.state.setting_val}));
    this.setState({ setting_val: '' });
  }
  render() {
    const { name, arr, setting } = this.state;
    return (
      <div className="PartPage1">
        <div>PartPage1</div>
        <div>name-onClick:{name}</div>
        <div>setting：{setting}</div>
        <div>
        {
          arr.map((ele: any) => <span key={ele}>{ele}</span>)
        }
        </div>
        <div>
          <input type="text" value={this.state.name_val} onChange={(val) => this.onChangeName(val)}/>
          <button onClick={() => this.onClickName()}>onClickName</button>
        </div>
        <div>
          <input type="text" value={this.state.setting_val} onChange={(val) => this.onChangeSetting(val)}/>
          <button onClick={() => this.onClickSetting()}>onClickSetting</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    account: state.local.account,
    updateSetting: state.local.updateSetting,
  };
}
export default connect(mapStateToProps)(ReduxPage as any);
