import * as React from 'react';
import { Input } from 'antd';
import './index.scss';
import RNPluginDetails from 'component/RNPluginDetails';
import RNPluginData from 'dataUtils/RNPluginData';

const { Search } = Input;

class RNPluginsPage extends React.Component<any> {
  static defaultProps = {
    visible: false,
  }

  state = {
    data: []
  }

  componentDidMount() {
    this.setState({ data: RNPluginData });
  }

  onChange = (v: any) => {
    const value = v.target.value;
    if(!value) {
      this.setState({ data: RNPluginData});
      return;
    }
    const newData = RNPluginData.filter(ele => JSON.stringify(ele).indexOf(value) > 0);
    this.setState({ data: newData});
  }

  render() {
    const { data } = this.state;
    return (
      <div className="RNPlugin">
        <h1>RN 插件</h1>
        <div className="rn_search">
          <Search
            placeholder="请输入内容"
            style={{ width: 400 }}
            onChange={this.onChange}
          />
        </div>
        <RNPluginDetails data={data} />
      </div>
    );
  }
}

export default RNPluginsPage;
